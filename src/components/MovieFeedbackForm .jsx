import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { movies } from "/src/constants/movies.jsx";
function MovieFeedBackForm() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [movieList, setMovieList] = useState(movies);
  const [selectMovie, setSelectMovie] = useState("");
  const [feedbackPost, setFeedbackPost] = useState({
    name: "",
    email: "",
    movie_title: "",
    feedback: "",
  });
  const [msgError, setMsgError] = useState({
    name: "",
    email: "",
    movie_title: "",
  });

  function handleAddPost(key, inputData) {
    let newFeedbackPost = { ...feedbackPost };
    newFeedbackPost[key] = inputData;
    setFeedbackPost(newFeedbackPost);
  }
  function handleReset() {
    setFeedbackPost({
      name: "",
      email: "",
      movie_title: "",
      feedback: "",
    });
    setSelectMovie("");
  }
  function handleSelectRadio(title) {
    setSelectMovie(title);
    handleAddPost("movie_title", title);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);
  }
  return (
    <section>
      <div className="bg-white p-10 rounded-2xl">
        <h1>🎬 CineComment</h1>
        {!isSubmit ? (
          <form
            action="#"
            className="flex flex-col justify-start items-start mt-6 space-y-4"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name">ชื่อ</label>
            <input
              type="text"
              id="name"
              className="w-full h-10"
              placeholder="กรุณากรอกชื่อของคุณ"
              value={feedbackPost.name}
              onChange={(e) => handleAddPost("name", e.target.value)}
            />
            <label htmlFor="email">อีเมล</label>
            <input
              type="email"
              id="email"
              className="w-full h-10"
              placeholder="example@email.com"
              value={feedbackPost.email}
              onChange={(e) => handleAddPost("email", e.target.value)}
            />
            <label htmlFor="#">เลือกหนังที่คุณชอบ</label>
            <div className="flex flex-col gap-5 w-full">
              {movieList.map((movie, index) => (
                <button
                  key={`${index}-${movie.title}`}
                  type="button"
                  className="flex flex-row justify-start items-center gap-3 w-full"
                  onClick={() => handleSelectRadio(movie.title)}
                >
                  <input
                    type="radio"
                    name="selectMovie"
                    value={movie.title}
                    checked={selectMovie === movie.title}
                    onChange={() => handleSelectRadio(movie.title)}
                  />
                  <div className="flex flex-col justify-start items-start ">
                    <h2>{`${movie.title} (${movie.year})`}</h2>
                    <p>Director: {movie.director}</p>
                  </div>
                </button>
              ))}
            </div>
            <label htmlFor="feedbackArea">ความคิดเห็นเกี่ยวกับหนัง</label>
            <textarea
              className="w-full h-max-28 h-28 border border-gray-200 p-3"
              placeholder="พิมพ์ความคิดเห็นของคุณที่นี้..."
              onChange={(e) => handleAddPost("feedback", e.target.value)}
              value={feedbackPost.feedback}
            ></textarea>
            <br />
            <div className="flex flex-row justify-between w-full">
              <button type="button" onClick={handleReset}>
                reset
              </button>
              <button type="Submit">ส่งแบบสำรวจ</button>
            </div>
          </form>
        ) : (
          <>
            <div className="p-6">
              <div className="flex flex-col justify-start items-start w-full p-10 rounded-lg bg-green-50 border border-green-200">
                <h3 className="text-lg font-medium text-green-800 flex items-center gap-2 mb-4">
                  ส่งแบบสำรวจสำเร็จ!
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm font-medium text-gray-500">ชื่อ:</p>
                  <p>{feedbackPost.name}</p>
                  <p className="text-sm font-medium text-gray-500">อีเมล:</p>
                  <p>{feedbackPost.email}</p>
                  <p className="text-sm font-medium text-gray-500">
                    หนังที่เลือก:
                  </p>
                  <p>{feedbackPost.movie_title}</p>
                </div>
                <hr className="text-shadow-cyan-300 h-1.5" />
                <div className="flex flex-col justify-center items-start w-full">
                  <p className="text-sm font-medium text-gray-500">
                    ความคิดเห็น:
                  </p>
                  <p className="text-sm bg-gray-50 p-3 rounded-md w-full py-3 text-left">
                    {feedbackPost.feedback}
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="flex flex-row gap-2 justify-center w-full"
                >
                  <RefreshCw />
                  ทำแบบสำรวจใหม่
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default MovieFeedBackForm;
