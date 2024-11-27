import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import ImageComponent from './ImageComponent';

const Header = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 h-14 lg:h-20">
      <header className="flex h-14 items-center justify-between bg-slate-950 p-8 text-white">
        <div className="flex items-center gap-4 lg:gap-6">
          <Link to="/">
            <ImageComponent
              className="w-16 sm:w-28"
              src="/movie.png"
              alt="Netflix Logo"
            />
          </Link>
          <a className="lg:text-xl" href="">
            Phim
          </a>
          <a className="lg:text-xl" href="">
            Truyền hình
          </a>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="cursor-pointer"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
