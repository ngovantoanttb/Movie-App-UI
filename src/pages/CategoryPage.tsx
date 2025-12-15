import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { fetchMoviesByCategory, fetchCategories } from '../libs/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Movie {
  _id: string;
  name: string;
  origin_name: string;
  slug: string;
  year: number;
  thumb_url: string;
  poster_url: string;
  quality?: string;
  lang?: string;
  category?: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (slug) {
      loadMoviesByCategory(slug, currentPage);
    }
  }, [slug, currentPage]);

  const fetchAllCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
      
      if (slug && data) {
        const currentCategory = data.find((cat: { slug: string; }) => cat.slug === slug);
        if (currentCategory) {
          setCategory(currentCategory);
        }
      }
    } catch (err) {
      console.error("Không thể tải danh sách thể loại:", err);
    }
  };

  const loadMoviesByCategory = async (categorySlug: string, page: number) => {
    try {
      setLoading(true);
      const data = await fetchMoviesByCategory({
        category: categorySlug,
        page: page,
        sort_field: 'modified.time',
        sort_type: 'desc',
        limit: 30
      });
      
      setMovies(data.items || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (err) {
      setError('Không thể tải danh sách phim');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && movies.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
        {category ? `Phim Thể Loại: ${category.name}` : 'Phim Theo Thể Loại'}
      </h1>
      
      {/* Danh sách thể loại */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`/the-loai/${cat.slug}`}
            className={`px-3 py-1 rounded-full text-sm ${
              cat.slug === slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {cat.name}
          </a>
        ))}
      </div>
      
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
      
      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {movies.length === 0 && !loading ? (
        <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            Không tìm thấy phim nào thuộc thể loại này
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              slug={movie.slug}
              name={movie.name}
              origin_name={movie.origin_name}
              thumb_url={movie.thumb_url}
              year={movie.year}
              quality={movie.quality}
              lang={movie.lang}
              category={movie.category}
            />
          ))}
        </div>
      )}

      {/* Phân trang */}
      {movies.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md flex items-center ${
              currentPage === 1 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            Trước
          </button>
          
          <span className="text-lg dark:text-white">
            Trang {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md flex items-center ${
              currentPage === totalPages 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Tiếp
            <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage; 