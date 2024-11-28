import ImageComponent from "@components/ImageComponent";

const ActorInfo = ({ name, character, profilePath, episodeCount }) => {
  return (
    <div className="rounded border border-slate-300 bg-black shadow-sm">
      <ImageComponent
        className="w-full rounded"
        width={276}
        height={350}
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : '/Image/ActorNoImage.svg'
        }
        alt={name}
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p className="text-slate-400">{character}</p>
        <p>
          {episodeCount > 1 ? `${episodeCount} Episodes` : `${episodeCount} Episode`}
        </p>
      </div>
    </div>
  );
};

export default ActorInfo;
