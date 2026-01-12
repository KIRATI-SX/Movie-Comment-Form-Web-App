import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { movies } from "/src/constants/movies.jsx";
import { validatEmail } from "../utils/validation";
import MovieLists from "./MovieLists";
function MovieFeedBackForm() {
  // ---------- Declare Variable ----------//
  const [darkMode, setDarkMode] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [autoValid, setAutoValid] = useState(false);
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

  // ---------- Declare Function ----------//
  function handleAddPost(key, inputData) {
    let newFeedbackPost = { ...feedbackPost };
    newFeedbackPost[key] = inputData;
    setFeedbackPost(newFeedbackPost);
    if (autoValid) validateForm(newFeedbackPost);
  }

  function handleReset() {
    setFeedbackPost({
      name: "",
      email: "",
      movie_title: "",
      feedback: "",
    });
    setSelectMovie("");
    setMsgError({
      name: "",
      email: "",
      movie_title: "",
    });
    setAutoValid(false);
  }

  function handleSelectRadio(title) {
    setSelectMovie(title);
    handleAddPost("movie_title", title);
  }

  function validateForm(formData) {
    const data = formData || feedbackPost;
    let error = false;
    let newMsgError = {
      name: "",
      email: "",
      movie_title: "",
    };

    if (data.name === "") {
      newMsgError.name = "โปรดใส่ชื่อของคุณ";
      error = true;
    }

    if (data.email === "") {
      newMsgError.email = "โปรดใส่อีเมลของคุณ";
      error = true;
    } else {
      if (!validatEmail(data.email)) {
        newMsgError.email = "โปรดใส่อีเมลของคุณให้ถูกต้อง";
        error = true;
      }
    }

    if (data.movie_title === "") {
      newMsgError.movie_title = "กรุณาเลือกหนังที่คุณชอบ";
      error = true;
    }

    setMsgError(newMsgError);
    return error;
  }
  function handleSubmit(e) {
    e.preventDefault();
    setAutoValid(true);
    let error = validateForm(feedbackPost);
    if (!error) {
      setIsSubmit(true);
    }
  }

  // ---------- Return HTML ----------//
  return (

      <section className={`min-h-screen  flex items-center justify-center px-4 py-10 ${darkMode ? "bg-gradient-to-br from-[#05070d] via-[#0b1220] to-[#020409]" : "bg-gray-50"}`}>
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div
            className={`bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden `}
          >
            {/* Header */}
            <div className="px-8 py-7 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                    🎬 CineComment
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    แบบสำรวจความเห็นเกี่ยวกับหนัง
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className="
                    text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700
                    text-gray-700 dark:text-gray-300hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {darkMode ? "🌙 Dark":"☀ Light" }
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-8">
              {!isSubmit ? (
                <form
                  action="#"
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit}
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xl font-medium text-gray-800"
                    >
                      ชื่อ
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`mt-2 w-full h-11 rounded-xl border px-4 text-gray-900 placeholder:text-gray-400 outline-none transition
                        ${
                          msgError.name
                            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100"
                        }`}
                      placeholder="กรุณากรอกชื่อของคุณ"
                      value={feedbackPost.name}
                      onChange={(e) => handleAddPost("name", e.target.value)}
                    />
                    {msgError.name && (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        {msgError.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-xl font-medium text-gray-800"
                    >
                      อีเมล
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`mt-2 w-full h-11 rounded-xl border px-4 text-gray-900 placeholder:text-gray-400 outline-none transition
                        ${
                          msgError.email
                            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100"
                        }`}
                      placeholder="example@email.com"
                      value={feedbackPost.email}
                      onChange={(e) => handleAddPost("email", e.target.value)}
                    />
                    {msgError.email && (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        {msgError.email}
                      </p>
                    )}
                  </div>

                  {/* Movies */}
                  <div>
                    <label className="text-sm font-medium text-gray-800">
                      เลือกหนังที่คุณชอบ
                    </label>
                    <div
                      className={`mt-2 flex flex-col gap-3 w-full rounded-2xl border p-4 bg-white transition
                        ${
                          msgError.movie_title
                            ? "border-red-300 ring-2 ring-red-50"
                            : "border-gray-200"
                        }`}
                    >
                      <MovieLists
                        movieList={movieList}
                        selectMovie={selectMovie}
                        onSelect={handleSelectRadio}
                      />
                    </div>

                    {msgError.movie_title && (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        {msgError.movie_title}
                      </p>
                    )}
                  </div>

                  {/* Feedback */}
                  <div>
                    <label
                      htmlFor="feedbackArea"
                      className="text-sm font-medium text-gray-800"
                    >
                      ความคิดเห็นเกี่ยวกับหนัง
                    </label>
                    <textarea
                      id="feedbackArea"
                      className="mt-2 w-full min-h-[120px] rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none  focus:border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                      placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
                      onChange={(e) =>
                        handleAddPost("feedback", e.target.value)
                      }
                      value={feedbackPost.feedback}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="h-11 px-5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                    >
                      ล้างข้อมูล
                    </button>
                    <button
                      type="submit"
                      className="h-11 px-6 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                    >
                      ส่งแบบสำรวจ
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-1">
                  <div className="rounded-3xl border border-gray-200 bg-white p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          ✅ ส่งแบบสำรวจสำเร็จ!
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          ขอบคุณสำหรับความคิดเห็นของคุณ
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                      <p className="font-medium text-gray-500">ชื่อ</p>
                      <p className="text-gray-900">{feedbackPost.name}</p>

                      <p className="font-medium text-gray-500">อีเมล</p>
                      <p className="text-gray-900">{feedbackPost.email}</p>

                      <p className="font-medium text-gray-500">หนังที่เลือก</p>
                      <p className="text-gray-900">
                        {feedbackPost.movie_title}
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-medium text-gray-500">
                        ความคิดเห็น
                      </p>
                      <div className="mt-2 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 whitespace-pre-wrap">
                        {feedbackPost.feedback || "-"}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="h-11 w-full rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        ทำแบบสำรวจใหม่
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer small */}
          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 CineComment • Feedback Movie
          </p>
        </div>
      </section>
    
  );
}
export default MovieFeedBackForm;
