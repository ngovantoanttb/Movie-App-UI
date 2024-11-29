import CircularProgressBar from '@components/CircularProgressBar';
import ImageComponent from '@components/ImageComponent';
import { useState } from 'react';

const SeasonList = ({ seasons = [] }) => {
    const [isShowMore, setIsShowMore] = useState(false);

    const currentSeasons = isShowMore ? seasons.slice(0, seasons.lenght) : seasons.slice(0, 4);
  return (
    <div className="mt-8 text-[1.3vw]">
      <p className="mb-4 text-[1.4vw] font-bold">Seasons</p>
      <div className="space-y-4">
        {currentSeasons.map((season) => (
          <div
            key={season.id}
            className="flex gap-4 rounded-lg border border-slate-200 p-3 shadow-md"
          >
            <ImageComponent
              className="w-1/4rounded-lg"
              width={130}
              height={195}
              src={season.poster_path && `https://media.themoviedb.org/t/p/w300${season.poster_path}`}
            />

            <div className="space-y-1">
              <p className="text-[1.4vw] font-bold">{season.name}</p>
              <div className="flex items-center gap-2">
                <p className="font-bold">Rating</p>
                <CircularProgressBar
                  percent={Math.round(season.vote_average * 10)}
                  size={2.5}
                  strokeWidth={0.2}
                  strokeColor={
                    season.episode_count >= 7
                      ? 'green'
                      : season.episode_count >= 5
                        ? 'orange'
                        : 'red'
                  }
                />
              </div>
              <p>
                <span className="font-bold">Release Date: </span>
                {season.air_date}
              </p>
              <p>
                {season.episode_count > 1
                  ? `${season.episode_count} Episodes`
                  : `${season.episode_count} Episode`}
              </p>
              <p className="line-clamp-3">{season.overview}</p>
            </div>
          </div>
        ))}
      </div>
      <p
        className="mt-1 cursor-pointer"
        onClick={() => setIsShowMore(!isShowMore)}
      >
        {isShowMore ? 'Show Less' : 'Show More'}
      </p>
    </div>
  );
};

export default SeasonList;
