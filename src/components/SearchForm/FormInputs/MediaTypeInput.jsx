const MediaTypeInput = ({ onChange, name, value }) => {
  return (
    <div className="accent-black">
      <input
        className="mr-1"
        type="radio"
        name={name}
        value="movie"
        onChange={onChange}
        checked={value === 'movie'}
        id="sf-type-movie"
      />
      <label htmlFor="">Movie</label>
      <br />
      <input
        className="mr-1"
        type="radio"
        name={name}
        value="tv"
        onChange={onChange}
        checked={value === 'tv'}
        id="sf-type-tv"
      />
      <label htmlFor="">TV Show</label>
    </div>
  );
};

export default MediaTypeInput;
