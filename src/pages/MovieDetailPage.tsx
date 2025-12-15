import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faArrowLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import { fetchMovieDetail } from '../libs/utils';

interface MovieDetail {
  _id: string;
  name: string;
  origin_name: string;
  slug: string;
  year: number;
  content: string;
  type: string;
  status: string;
  thumb_url: string;
  poster_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  actor: string[];
  director: string[];
  category: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  country: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  episodes: Array<{
    server_name: string;
    server_data: Array<{
      name: string;
      slug: string;
      filename: string;
      link_embed: string;
      link_m3u8: string;
    }>;
  }>;
}

const MovieDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedServer, setSelectedServer] = useState<number>(0);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchMovieData();
      checkFavoriteStatus();
    }
  }, [slug]);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      const data = await fetchMovieDetail(slug as string);
      setMovie(data);
      
      // Chọn tập đầu tiên mặc định
      if (data?.episodes && data.episodes.length > 0 && 
          data.episodes[0].server_data && data.episodes[0].server_data.length > 0) {
        setSelectedEpisode(data.episodes[0].server_data[0].link_embed);
      }
      
    } catch (err) {
      setError('Không thể tải thông tin phim');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((fav: { slug: string }) => fav.slug === slug));
  };

  const toggleFavorite = () => {
    if (!movie) return;
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter((fav: { slug: string }) => fav.slug !== slug);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      const newFavorite = {
        _id: movie._id,
        slug: movie.slug,
        name: movie.name,
        thumb_url: movie.thumb_url,
        year: movie.year,
        quality: movie.quality,
        lang: movie.lang
      };
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  const handleSelectServer = (index: number) => {
    setSelectedServer(index);
    if (movie?.episodes && movie.episodes[index]?.server_data?.length > 0) {
      setSelectedEpisode(movie.episodes[index].server_data[0].link_embed);
    }
  };

  const handleSelectEpisode = (link: string) => {
    setSelectedEpisode(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">{error || 'Không tìm thấy phim'}</div>
        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white pb-10">
      {/* Banner và thông tin phim */}
      <div className="relative h-[500px]">
        <img
          src={movie.poster_url || movie.thumb_url}
          alt={movie.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <img
                src={movie.thumb_url}
                alt={movie.name}
                className="w-48 h-72 object-cover rounded-lg shadow-lg border-4 border-white"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 text-white">{movie.name}</h1>
                {movie.origin_name && movie.origin_name !== movie.name && (
                  <h2 className="text-xl text-gray-300 mb-4">{movie.origin_name}</h2>
                )}
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">{movie.year}</span>
                  {movie.quality && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">{movie.quality}</span>
                  )}
                  {movie.lang && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">{movie.lang}</span>
                  )}
                  {movie.time && (
                    <span className="text-white text-sm">{movie.time}</span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.category?.map((cat) => (
                    <Link 
                      key={cat.id} 
                      to={`/the-loai/${cat.slug}`}
                      className="text-sm bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
                
                <div className="flex gap-3 flex-wrap">
                  {selectedEpisode && (
                    <a
                      href="#watch"
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faPlay} />
                      Xem Phim
                    </a>
                  )}
                  
                  <button
                    onClick={toggleFavorite}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      isFavorite ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-700 hover:bg-gray-600'
                    } text-white`}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    {isFavorite ? 'Đã lưu' : 'Lưu phim'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Nội dung phim */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Nội dung phim</h2>
          <div className="prose dark:prose-invert max-w-none" 
               dangerouslySetInnerHTML={{ __html: movie.content }}></div>
          
          {/* Thông tin chi tiết */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {movie.director && movie.director.length > 0 && (
              <div>
                <span className="font-semibold">Đạo diễn:</span> {movie.director.join(', ')}
              </div>
            )}
            
            {movie.actor && movie.actor.length > 0 && (
              <div>
                <span className="font-semibold">Diễn viên:</span> {movie.actor.join(', ')}
              </div>
            )}
            
            {movie.country && movie.country.length > 0 && (
              <div>
                <span className="font-semibold">Quốc gia:</span>{' '}
                {movie.country.map((c, i) => (
                  <React.Fragment key={c.id}>
                    <Link to={`/quoc-gia/${c.slug}`} className="hover:underline">{c.name}</Link>
                    {i < movie.country.length - 1 ? ', ' : ''}
                  </React.Fragment>
                ))}
              </div>
            )}
            
            {movie.status && (
              <div>
                <span className="font-semibold">Trạng thái:</span> {movie.status}
              </div>
            )}
            
            {movie.episode_current && (
              <div>
                <span className="font-semibold">Tập mới nhất:</span> {movie.episode_current}
                {movie.episode_total && ` / ${movie.episode_total}`}
              </div>
            )}
          </div>
        </div>

        {/* Xem phim */}
        {movie.episodes && movie.episodes.length > 0 && (
          <div id="watch" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Xem phim</h2>
            
            {/* Nguồn phim */}
            {movie.episodes.length > 1 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Chọn nguồn phim</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.episodes.map((server, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectServer(index)}
                      className={`px-4 py-2 rounded-lg ${
                        selectedServer === index 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                      }`}
                    >
                      {server.server_name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Danh sách tập */}
            {movie.episodes[selectedServer]?.server_data && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  Danh sách tập 
                  {movie.episodes[selectedServer].server_name && 
                    ` - ${movie.episodes[selectedServer].server_name}`}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {movie.episodes[selectedServer].server_data.map((episode, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectEpisode(episode.link_embed)}
                      className={`px-3 py-2 text-center rounded ${
                        selectedEpisode === episode.link_embed
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {episode.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Khung xem phim */}
            {selectedEpisode && (
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src={selectedEpisode}
                  allowFullScreen
                  className="w-full h-[500px] border-0"
                  title={`${movie.name} - ${
                    movie.episodes[selectedServer]?.server_data.find(
                      e => e.link_embed === selectedEpisode
                    )?.name || ''
                  }`}
                ></iframe>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage; 