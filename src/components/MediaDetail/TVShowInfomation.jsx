import ImageComponent from '@components/ImageComponent';

const TVShowInfomation = ({ tvInfo = {} }) => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Infomation</p>
      <div className="mt-4">
        <p className="font-bold">Original Name</p>
        <p>{tvInfo.original_name}</p>
      </div>

      <div className="mt-4">
        <p className="font-bold">Original Country</p>
        {(tvInfo.origin_country || []).map((countryCode) => (
          <ImageComponent
            key={countryCode}
            className="mr-1 mt-1"
            src={`https://flagcdn.com/20x15/${countryCode.toLowerCase()}.png`}
          />
        ))}
      </div>
      <div className="mt-4">
        <p className="font-bold">Status</p>
        <p>{tvInfo.status}</p>
      </div>
      <div className="mt-4">
        <p className="font-bold">Network</p>
        {(tvInfo.networks || []).map((network) => (
          <img
            className="invert"
            key={network.id}
            src={`https://media.themoviedb.org/t/p/h30${network.logo_path}}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TVShowInfomation;
