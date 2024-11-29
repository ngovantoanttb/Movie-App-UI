import { useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import Banner from '../components/MediaDetail/Banner';
import ActorList from '../components/MediaDetail/ActorList';
import RelateMediaList from '../components/MediaDetail/RelateMediaList';
import useFetch from '@hooks/useFetch';
import TVShowInfomation from '@components/MediaDetail/TVShowInfomation';
import SeasonList from '@components/MediaDetail/SeasonList';

const TVShowDetail = () => {
  const { id } = useParams();

  const { data: tvInfo, isLoading } = useFetch({
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits,videos`,
  });

  const { data: recommandationsResponse, isLoading: isRecommandationLoading } =
    useFetch({
      url: `/tv/${id}/recommendations`,
    });

  const relatedTVShow = recommandationsResponse.results || [];
  const certification = (tvInfo.content_ratings?.results || []).find(
    (result) => result.iso_3166_1 === 'US',
  )?.rating;

  const crews = (tvInfo.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ['Director', 'Writer'].some((job) => jobs.find((j) => j === job));
    })
    .slice(0, 10)
    .map((crew) => ({
      name: crew.name,
      job: crew.jobs[0].job,
      id: crew.id,
    }));
  if (isLoading) {
    return <Loading />;
  }
console.log({tvInfo})
  return (
    <div>
      <Banner
        title={tvInfo.name}
        backdropPath={tvInfo.backdrop_path}
        posterPath={tvInfo.poster_path}
        certification={certification}
        crews={crews}
        genres={tvInfo.genres}
        releaseDate={tvInfo.first_air_date}
        point={tvInfo.vote_average}
        overview={tvInfo.overview}
        trailerVideoKey={
          (tvInfo.videos?.results || []).find(
            (video) => video.type === 'Trailer',
          )?.key
        }
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="container">
          <div className="flex-[2]">
            <ActorList
              actors={(tvInfo.aggregate_credits?.cast || []).map((cast) => ({
                ...cast,
                character: cast.roles[0]?.character,
                episodeCount: cast.roles[0]?.episode_count,
              }))}
            />
            <SeasonList seasons={(tvInfo.seasons || []).reverse()} />
            <RelateMediaList
              title="More like this"
              mediaList={relatedTVShow}
              isLoading={isRecommandationLoading}
            />
          </div>
          <div className="flex-1">
            <TVShowInfomation tvInfo={tvInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetail;
