import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, 
  faMoon, 
  faSearch, 
  faHome, 
  faList, 
  faGlobe, 
  faHeart, 
  faBars, 
  faTimes 
} from '@fortawesome/free-solid-svg-icons';
import { MOVIE_TYPES } from '../libs/contants';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Đóng menu khi chuyển trang
  useEffect(() => {
    setIsOpen(false);
    setIsCategoryOpen(false);
    setIsCountryOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">PhimHay</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                location.pathname === '/' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Trang chủ
            </Link>

            {/* Danh sách phim */}
            <div className="relative group">
              <button 
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center ${
                  location.pathname.includes('/danh-sach') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`}
              >
                <FontAwesomeIcon icon={faList} className="mr-2" />
                Danh sách
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 hidden group-hover:block">
                <div className="py-1">
                  <Link to={`/danh-sach/${MOVIE_TYPES.SERIES}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Phim Bộ
                  </Link>
                  <Link to={`/danh-sach/${MOVIE_TYPES.MOVIES}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Phim Lẻ
                  </Link>
                  <Link to={`/danh-sach/${MOVIE_TYPES.ANIMATION}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Hoạt Hình
                  </Link>
                  <Link to={`/danh-sach/${MOVIE_TYPES.VIETSUB}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Phim Vietsub
                  </Link>
                  <Link to={`/danh-sach/${MOVIE_TYPES.DUBBED}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Phim Thuyết Minh
                  </Link>
                </div>
              </div>
            </div>

            {/* Thể loại */}
            <Link 
              to="/the-loai/hanh-dong" 
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                location.pathname.includes('/the-loai') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
            >
              <FontAwesomeIcon icon={faList} className="mr-2" />
              Thể loại
            </Link>

            {/* Quốc gia */}
            <Link 
              to="/quoc-gia/trung-quoc" 
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                location.pathname.includes('/quoc-gia') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
            >
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              Quốc gia
            </Link>

            {/* Yêu thích */}
            <Link 
              to="/yeu-thich" 
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                location.pathname === '/yeu-thich' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Yêu thích
            </Link>

            {/* Tìm kiếm */}
            <Link 
              to="/tim-kiem" 
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                location.pathname === '/tim-kiem' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Tìm kiếm
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 mr-2"
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
          </div>

          {/* Dark Mode Toggle (Desktop) */}
          <button 
            onClick={toggleDarkMode} 
            className="hidden md:flex p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Trang chủ
            </Link>

            {/* Danh sách phim */}
            <div>
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname.includes('/danh-sach') 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faList} className="mr-2" />
                  Danh sách
                </span>
                <svg className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isCategoryOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  <Link 
                    to={`/danh-sach/${MOVIE_TYPES.SERIES}`} 
                    className="block px-3 py-2 rounded-md text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Phim Bộ
                  </Link>
                  <Link 
                    to={`/danh-sach/${MOVIE_TYPES.MOVIES}`} 
                    className="block px-3 py-2 rounded-md text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Phim Lẻ
                  </Link>
                  <Link 
                    to={`/danh-sach/${MOVIE_TYPES.ANIMATION}`} 
                    className="block px-3 py-2 rounded-md text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Hoạt Hình
                  </Link>
                  <Link 
                    to={`/danh-sach/${MOVIE_TYPES.VIETSUB}`} 
                    className="block px-3 py-2 rounded-md text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Phim Vietsub
                  </Link>
                  <Link 
                    to={`/danh-sach/${MOVIE_TYPES.DUBBED}`} 
                    className="block px-3 py-2 rounded-md text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Phim Thuyết Minh
                  </Link>
                </div>
              )}
            </div>

            {/* Thể loại */}
            <Link 
              to="/the-loai/hanh-dong" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.includes('/the-loai') 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={faList} className="mr-2" />
              Thể loại
            </Link>

            {/* Quốc gia */}
            <Link 
              to="/quoc-gia/trung-quoc" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.includes('/quoc-gia') 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              Quốc gia
            </Link>

            {/* Yêu thích */}
            <Link 
              to="/yeu-thich" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/yeu-thich' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Yêu thích
            </Link>

            {/* Tìm kiếm */}
            <Link 
              to="/tim-kiem" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/tim-kiem' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Tìm kiếm
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 