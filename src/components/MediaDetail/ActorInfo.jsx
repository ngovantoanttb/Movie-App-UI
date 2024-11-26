const ActorInfo = ({ name, character, profilePath }) => {
  return (
    <div className="rounded border border-slate-300 bg-black shadow-sm">
      <img
        className="rounded w-full"
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
        {/* <p>18</p> */}
      </div>
    </div>
  );
};

export default ActorInfo;
