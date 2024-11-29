import ImageComponent from '@components/ImageComponent';
import RelatedMediaList from '@components/MediaDetail/RelateMediaList';
import { GENDER_MAPPING } from '@libs/contants';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';



const PeoplePage = () => {
  const peopleInfo = useLoaderData();
  console.log({ peopleInfo });

  const [isShowMore, setIsShowMore] = useState(false);
  const combinedCredits = peopleInfo.combined_credits?.cast || [];

  const currentMediaList = isShowMore
    ? combinedCredits.slice(0, combinedCredits.length)
    : combinedCredits.slice(0, 12);
  return (
    <div className="mt-16 bg-black">
      <div className="container text-slate-200">
        <div className="flex-1">
          <ImageComponent
            className="mb-6"
            src={peopleInfo.profile_path && `https://image.tmdb.org/t/p/w600_and_h900_bestv2${peopleInfo.profile_path}`}
            width={600}
            height={900}
          />
          <div>
            <p className="mb-6 text-lg font-bold">Personal Info</p>
            <div className="space-y-4">
              <div>
                <p className="font-bold">Known For</p>
                <p>{peopleInfo.known_for_department}</p>
              </div>
              <div>
                <p className="font-bold">Gender</p>
                <p>{GENDER_MAPPING[peopleInfo.gender]}</p>
              </div>
              <div>
                <p className="font-bold">Place of Birth</p>
                {peopleInfo.place_of_birth}
              </div>
              <div>
                <p className="font-bold">Birthday</p>
                <p>{peopleInfo.birthday}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[2]">
          <p className="mb-6 text-2xl font-bold">{peopleInfo.name}</p>
          <div className="mb-6">
            <p className="mb-4 text-lg font-bold">Biography</p>
            <p className="whitespace-pre-line">{peopleInfo.biography}</p>
          </div>

          <RelatedMediaList title="Know For" mediaList={currentMediaList} />
          <p
            className="mt-1 cursor-pointer"
            onClick={() => setIsShowMore(!isShowMore)}
          >
            {isShowMore ? 'Show Less' : 'Show More'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
