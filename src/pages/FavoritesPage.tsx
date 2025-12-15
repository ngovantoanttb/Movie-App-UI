import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

interface FavoriteMovie {
  _id: string;
  slug: string;
  name: string;
  thumb_url: string;
  year: number;
  quality?: string;
  lang?: string;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    } catch (error) {
      console.error('Lỗi khi tải phim yêu thích:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (slug: string) => {
    const newFavorites = favorites.filter((movie) => movie.slug !== slug);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const clearAllFavorites = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả phim yêu thích?')) {
      localStorage.setItem('favorites', JSON.stringify([]));
      setFavorites([]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Phim Đã Lưu</h1>
        {favorites.length > 0 && (
          <button
            onClick={clearAllFavorites}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Xóa tất cả
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <FontAwesomeIcon icon={faHeart} className="text-gray-400 text-6xl mb-4" />
          <h2 className="text-2xl font-semibold text-gray-500 dark:text-gray-400 mb-4">
            Bạn chưa lưu phim nào
          </h2>
          <Link to="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Khám phá phim ngay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <div key={movie._id} className="relative group">
              <MovieCard
                slug={movie.slug}
                name={movie.name}
                thumb_url={movie.thumb_url}
                year={movie.year}
                quality={movie.quality}
                lang={movie.lang}
              />
              <button
                onClick={() => removeFromFavorites(movie.slug)}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Xóa khỏi danh sách yêu thích"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 