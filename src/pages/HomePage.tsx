import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { fetchNewMovies } from '../libs/utils';
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

interface ApiResponse {
  status: boolean;
  items: Movie[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadMovies(currentPage);
  }, [currentPage]);

  const loadMovies = async (page: number) => {
    try {
      setLoading(true);
      const data = await fetchNewMovies(page);
      
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

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadMovies(1);
      return;
    }
    
    // Xử lý tìm kiếm (sẽ được thêm sau)
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
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Phim Mới Cập Nhật</h1>
      <SearchBar onSearch={handleSearch} />
      
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
      
      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
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

      {/* Phân trang */}
      {movies.length > 0 && (
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

export default HomePage; 