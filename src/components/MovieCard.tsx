import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface MovieCardProps {
  slug: string;
  name: string;
  origin_name?: string;
  thumb_url: string;
  year: number;
  quality?: string;
  lang?: string;
  category?: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  slug, 
  name, 
  origin_name, 
  thumb_url, 
  year, 
  quality,
  lang,
  category 
}) => {
  return (
    <Link to={`/phim/${slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
        <img
          src={thumb_url}
          alt={name}
          className="w-full h-[350px] object-cover"
          loading="lazy"
        />
        {quality && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
            {quality}
          </span>
        )}
        {lang && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
            {lang}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-lg font-semibold truncate">{name}</h3>
          {origin_name && origin_name !== name && (
            <p className="text-gray-300 text-sm truncate">{origin_name}</p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white text-sm">{year}</span>
            {category && category.length > 0 && (
              <>
                <span className="text-white">•</span>
                <span className="text-white text-sm truncate">{category.join(', ')}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard; 