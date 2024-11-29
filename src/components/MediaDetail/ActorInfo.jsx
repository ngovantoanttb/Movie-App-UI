import ImageComponent from '@components/ImageComponent';
import { Link } from 'react-router-dom';

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <Link
      to={`/people/${id}`}
      className="rounded border border-slate-300 bg-black shadow-sm"
    >
      <ImageComponent
        className="w-full rounded"
        width={276}
        height={350}
        src={
          profilePath &&
          `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
        }
        alt={name}
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p className="text-slate-400">{character}</p>
        <p>
          {episodeCount > 1
            ? `${episodeCount} Episodes`
            : `${episodeCount} Episode`}
        </p>
      </div>
    </Link>
  );
};

export default ActorInfo;
