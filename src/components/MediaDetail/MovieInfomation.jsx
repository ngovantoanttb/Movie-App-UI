import { currencyFormatter } from '@libs/utils';
import ImageComponent from '@components/ImageComponent';

const MovieInfomation = ({ movieInfo = {} }) => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Infomation</p>
      <div className="mt-4">
        <p className="font-bold">Original Name</p>
        <p>{movieInfo.original_title}</p>
      </div>

      <div className="mt-4">
        <p className="font-bold">Original Country</p>
        {(movieInfo.origin_country || []).map((countryCode) => (
          <ImageComponent
            key={countryCode}
            className="mr-1 mt-1"
            src={`https://flagcdn.com/20x15/${countryCode.toLowerCase()}.png`}
          />
        ))}
      </div>
      <div className="mt-4">
        <p className="font-bold">Status</p>
        <p>{movieInfo.status}</p>
      </div>
      <div className="mt-4">
        <p className="font-bold">Budget</p>
        <p>{currencyFormatter(movieInfo.budget)}</p>
      </div>
      <div className="mt-4">
        <p className="font-bold">Revenue</p>
        <p>{currencyFormatter(movieInfo.revenue)}</p>
      </div>
    </div>
  );
};

export default MovieInfomation;
