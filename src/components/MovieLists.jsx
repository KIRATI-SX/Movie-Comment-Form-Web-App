function MovieLists({ movieList, selectMovie, onSelect }) {
  return (
    <>
      {movieList.map((movie, index) => (
        <button
          key={`${index}-${movie.title}`}
          type="button"
          className="flex flex-row justify-start items-center gap-3 w-full"
          onClick={() => onSelect(movie.title)}
        >
          <input
            type="radio"
            name="selectMovie"
            value={movie.title}
            checked={selectMovie === movie.title}
            onChange={() => onSelect(movie.title)}
          />
          <div className="flex flex-col justify-start items-start ">
            <h2>{`${movie.title} (${movie.year})`}</h2>
            <p>Director: {movie.director}</p>
          </div>
        </button>
      ))}
    </>
  );
}

export default MovieLists;
