import { API_BASE_URL } from './contants';

// Format tiền tệ
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

/**
 * Gọi API lấy danh sách phim mới cập nhật
 * @param {number} page - Trang cần lấy dữ liệu
 * @param {string} version - Phiên bản API (mặc định là '')
 */
export const fetchNewMovies = async (page = 1, version = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/danh-sach/phim-moi-cap-nhat${version ? `-${version}` : ''}?page=${page}`);
    if (!response.ok) {
      throw new Error('Lỗi khi tải danh sách phim');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error);
    throw error;
  }
};

/**
 * Gọi API lấy thông tin chi tiết phim
 * @param {string} slug - Slug của phim
 */
export const fetchMovieDetail = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/phim/${slug}`);
    if (!response.ok) {
      throw new Error('Lỗi khi tải thông tin phim');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy thông tin phim:", error);
    throw error;
  }
};

/**
 * Gọi API tìm kiếm phim
 * @param {Object} params - Các tham số tìm kiếm
 */
export const searchMovies = async (params = {}) => {
  try {
    const { 
      keyword = '',
      page = 1,
      sort_field = 'modified.time',
      sort_type = 'desc',
      sort_lang = '',
      category = '',
      country = '',
      year = '',
      limit = 24
    } = params;

    let url = `${API_BASE_URL}/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`;
    
    if (sort_field) url += `&sort_field=${sort_field}`;
    if (sort_type) url += `&sort_type=${sort_type}`;
    if (sort_lang) url += `&sort_lang=${sort_lang}`;
    if (category) url += `&category=${category}`;
    if (country) url += `&country=${country}`;
    if (year) url += `&year=${year}`;
    if (limit) url += `&limit=${limit}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Lỗi khi tìm kiếm phim');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi tìm kiếm phim:", error);
    throw error;
  }
};

/**
 * Gọi API lấy danh sách phim theo loại
 * @param {Object} params - Các tham số lọc
 */
export const fetchMoviesByType = async (params = {}) => {
  try {
    const { 
      type_list = 'phim-bo',
      page = 1,
      sort_field = 'modified.time',
      sort_type = 'desc',
      sort_lang = '',
      category = '',
      country = '',
      year = '',
      limit = 24
    } = params;

    let url = `${API_BASE_URL}/v1/api/danh-sach/${type_list}?page=${page}`;
    
    if (sort_field) url += `&sort_field=${sort_field}`;
    if (sort_type) url += `&sort_type=${sort_type}`;
    if (sort_lang) url += `&sort_lang=${sort_lang}`;
    if (category) url += `&category=${category}`;
    if (country) url += `&country=${country}`;
    if (year) url += `&year=${year}`;
    if (limit) url += `&limit=${limit}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Lỗi khi tải danh sách phim');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error);
    throw error;
  }
};

/**
 * Gọi API lấy danh sách phim theo thể loại
 * @param {Object} params - Các tham số lọc
 */
export const fetchMoviesByCategory = async (params = {}) => {
  try {
    const { 
      category = 'hanh-dong',
      page = 1,
      sort_field = 'modified.time',
      sort_type = 'desc',
      sort_lang = '',
      country = '',
      year = '',
      limit = 24
    } = params;

    let url = `${API_BASE_URL}/v1/api/the-loai/${category}?page=${page}`;
    
    if (sort_field) url += `&sort_field=${sort_field}`;
    if (sort_type) url += `&sort_type=${sort_type}`;
    if (sort_lang) url += `&sort_lang=${sort_lang}`;
    if (country) url += `&country=${country}`;
    if (year) url += `&year=${year}`;
    if (limit) url += `&limit=${limit}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Lỗi khi tải phim theo thể loại');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy phim theo thể loại:", error);
    throw error;
  }
};

/**
 * Gọi API lấy danh sách thể loại phim
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/the-loai`);
    if (!response.ok) {
      throw new Error('Lỗi khi tải danh sách thể loại');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thể loại:", error);
    throw error;
  }
};

/**
 * Gọi API lấy danh sách quốc gia
 */
export const fetchCountries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/quoc-gia`);
    if (!response.ok) {
      throw new Error('Lỗi khi tải danh sách quốc gia');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quốc gia:", error);
    throw error;
  }
};