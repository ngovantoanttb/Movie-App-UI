import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Movie = (props) => {
    const { data: {
        title,
        backdrop_path,
        release_date,
        overview
    }} = props;
  return (
    <div>
      <img
        className="aspect-video brightness-50 w-full"
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt="Poster"
      />
      <div className="absolute bottom-[10%] left-8 w-1/2 text-white sm:w-1/3">
        <p className="mb-2 font-bold sm:text-[2vw] uppercase">{title}</p>

        <div>
          <p className="mb-1 inline-block border border-gray-400 p-1 text-gray-400">PG13</p>
          <p className="text-[1.2vw]">{release_date}</p>
        </div>

        <div>
          <div className="mt-4 hidden text-[1.2vw] sm:block">
            <p className="mb-2 font-bold">Overview</p>
            <p>
              {overview}
            </p>
          </div>

          <div className="mt-4">
            <button className="mr-2 rounded bg-white px-4 py-2 text-10 text-black lg:text-lg">
              <FontAwesomeIcon icon={faPlay} className='pr-2' />
              Trailer
            </button>
            <button className="rounded bg-slate-300/35 px-4 py-2 text-10 lg:text-lg">View Detail</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
