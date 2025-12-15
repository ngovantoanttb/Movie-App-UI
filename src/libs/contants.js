export const TRENDING_TABS = [
  {
    id: 'all',
    name: 'All',
    url: '/trending/all/day',
  },
  {
    id: 'movie',
    name: 'Movie',
    url: '/trending/movie/day',
  },
  {
    id: 'tv',
    name: 'TV Show',
    url: '/trending/tv/day',
  },
];

export const TOP_RATED_TABS = [
  {
    id: 'movie',
    name: 'Movie',
    url: '/movie/top_rated',
  },
  {
    id: 'tv',
    name: 'TV Show',
    url: '/tv/top_rated',
  },
];    

export const GENDER_MAPPING = {
  0: 'Not set / not specified',
  1: 'Female',
  2: 'Male',
  3: 'Non-binary',
};

// API phim
export const API_BASE_URL = 'https://phimapi.com';

// Danh sách phim
export const MOVIE_LISTS = {
  NEW_MOVIES: '/danh-sach/phim-moi-cap-nhat',
  NEW_MOVIES_V2: '/danh-sach/phim-moi-cap-nhat-v2',
  NEW_MOVIES_V3: '/danh-sach/phim-moi-cap-nhat-v3',
};

// Các loại phim
export const MOVIE_TYPES = {
  SERIES: 'phim-bo',
  MOVIES: 'phim-le',
  TV_SHOWS: 'tv-shows',
  ANIMATION: 'hoat-hinh',
  VIETSUB: 'phim-vietsub',
  DUBBED: 'phim-thuyet-minh',
  VOICED_OVER: 'phim-long-tieng',
};

// Tùy chọn sắp xếp
export const SORT_OPTIONS = {
  FIELDS: {
    MODIFIED_TIME: 'modified.time',
    ID: '_id',
    YEAR: 'year',
  },
  TYPES: {
    ASC: 'asc',
    DESC: 'desc',
  },
  LANGUAGES: {
    VIETSUB: 'vietsub',
    DUBBED: 'thuyet-minh',
    VOICED_OVER: 'long-tieng',
  },
};