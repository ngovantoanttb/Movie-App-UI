import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { groupBy } from 'lodash';
import CircularProgressBar from '../CircularProgressBar';

const Banner = ({ mediaInfo }) => {
  const certification = (
    (mediaInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === 'US',
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  const crews = (mediaInfo.credits?.crew || [])
    .filter((crew) => ['Director', 'Screenplay', 'Writer'].includes(crew.job))
    .map((crew) => ({
      name: crew.name,
      job: crew.job,
      id: crew.id,
    }));

  const groupedCrews = groupBy(crews, 'job');
  return (
    <div className="relative mt-16 overflow-hidden text-white shadow-sm shadow-slate-800">
      <img
        className="absolute inset-0 brightness-[0.2]"
        src={`https://image.tmdb.org/t/p/original${mediaInfo.backdrop_path}`}
        alt={mediaInfo.original_title}
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 lg:gap-8">
        <div className="flex-1">
          <img
            width={600}
            height={900}
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${mediaInfo.poster_path}`}
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold uppercase">
            {mediaInfo.title}
          </p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification}
            </span>
            <p>{mediaInfo.release_date}</p>
            <p>
              {(mediaInfo.genres || []).map((genre) => genre.name).join(', ')}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round((mediaInfo.vote_average || 0) * 10)}
                size={3.5}
                strokeWidth={0.3}
                strokeColor={
                  mediaInfo.vote_average >= 7
                    ? 'green'
                    : mediaInfo.vote_average >= 5
                      ? 'orange'
                      : 'red'
                }
              />
              Rating
            </div>
            <button className="rounded bg-white px-4 py-2 text-black">
              <FontAwesomeIcon className="mr-1" icon={faPlay} />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{mediaInfo.overview}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupedCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupedCrews[job].map((crew) => crew.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
