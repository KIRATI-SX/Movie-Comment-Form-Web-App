function MovieLists({ movieList, selectMovie, onSelect }) {
  return (
    <>
      {movieList.map((movie, index) => {
        const active = selectMovie === movie.title;

        return (
          <button
            key={`${index}-${movie.title}`}
            type="button"
            onClick={() => onSelect(movie.title)}
            className={`group w-full rounded-2xl border px-4 py-3 text-left transition
            ${
              active
                ? "border-gray-900 bg-gray-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="selectMovie"
                value={movie.title}
                checked={active}
                onChange={() => onSelect(movie.title)}
                className="mt-1"
              />

              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-sm font-semibold text-gray-900">
                    {movie.title}
                  </h2>
                  <span className="text-xs text-gray-500">{movie.year}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Director: <span className="text-gray-700">{movie.director}</span>
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
}

export default MovieLists;

