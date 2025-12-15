import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { searchMovies } from '../libs/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';

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

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    if (keyword) {
      performSearch(keyword, currentPage);
    }
  }, [keyword, currentPage]);

  const performSearch = async (keyword: string, page: number) => {
    if (!keyword.trim()) return;

    try {
      setLoading(true);
      setIsSearching(true);
      
      const data = await searchMovies({
        keyword: keyword,
        page: page,
        sort_field: 'modified.time',
        sort_type: 'desc',
        limit: 24
      });
      
      setMovies(data.items || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
      setError(null);
    } catch (err) {
      setError('Không thể tìm kiếm phim');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setCurrentPage(1);
    setSearchParams({ keyword: query });
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Tìm Kiếm Phim</h1>
      <SearchBar 
        onSearch={handleSearch} 
        loading={isSearching}
        placeholder="Nhập tên phim, diễn viên hoặc đạo diễn..."
      />
      
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
      
      {loading && movies.length === 0 ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {keyword && (
            <div className="mt-6 mb-4">
              <h2 className="text-xl font-semibold dark:text-white flex items-center">
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Kết quả tìm kiếm cho: <span className="ml-2 text-blue-600 dark:text-blue-400">"{keyword}"</span>
                {movies.length > 0 && (
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({movies.length} phim)
                  </span>
                )}
              </h2>
            </div>
          )}

          {movies.length === 0 && keyword && !loading ? (
            <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg mt-6">
              <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                Không tìm thấy phim nào cho "{keyword}"
              </div>
              <div className="text-sm text-gray-400 dark:text-gray-500">
                Vui lòng thử lại với từ khóa khác
              </div>
            </div>
          ) : (
            <>
              {loading && (
                <div className="flex justify-center my-4">
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
            </>
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
        </>
      )}
    </div>
  );
};

export default SearchPage; 