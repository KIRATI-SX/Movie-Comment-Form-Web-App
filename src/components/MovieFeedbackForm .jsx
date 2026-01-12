import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { movies } from "/src/constants/movies.jsx";
import { validateEmail } from "../utils/validation";
import MovieLists from "./MovieLists";

const INITIAL_FEEDBACK = {
  name: "",
  email: "",
  movie_title: "",
  feedback: "",
};

const INITIAL_ERRORS = {
  name: "",
  email: "",
  movie_title: "",
};

function MovieFeedbackForm() {
  // ---------- State ---------- //
  const [darkMode, setDarkMode] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [autoValidate, setAutoValidate] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [feedbackForm, setFeedbackForm] = useState(INITIAL_FEEDBACK);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  // ---------- Handlers ---------- //
  function updateFeedbackField(field, value) {
    const updated = { ...feedbackForm, [field]: value };
    setFeedbackForm(updated);

    if (autoValidate) {
      validateForm(updated);
    }
  }

  function resetFormState() {
    setFeedbackForm(INITIAL_FEEDBACK);
    setSelectedMovie("");
    setErrors(INITIAL_ERRORS);
    setAutoValidate(false);
    setIsSubmitted(false);
  }

  function handleSelectMovie(title) {
    setSelectedMovie(title);
    updateFeedbackField("movie_title", title);
  }

  function validateForm(dataFromArg) {
    const data = dataFromArg || feedbackForm;
    let hasError = false;

    const nextErrors = { ...INITIAL_ERRORS };

    if (!data.name.trim()) {
      nextErrors.name = "โปรดใส่ชื่อของคุณ";
      hasError = true;
    }

    if (!data.email.trim()) {
      nextErrors.email = "โปรดใส่อีเมลของคุณ";
      hasError = true;
    } else if (!validateEmail(data.email)) {
      nextErrors.email = "โปรดใส่อีเมลของคุณให้ถูกต้อง";
      hasError = true;
    }

    if (!data.movie_title.trim()) {
      nextErrors.movie_title = "กรุณาเลือกหนังที่คุณชอบ";
      hasError = true;
    }

    setErrors(nextErrors);
    return hasError;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAutoValidate(true);

    const hasError = validateForm(feedbackForm);
    if (!hasError) {
      setIsSubmitted(true);
    }
  }

  // ---------- JSX ---------- //
  return (
    <section
      className={`min-h-screen flex items-center justify-center px-4 py-10 ${
        darkMode
          ? "bg-gradient-to-br from-[#6183e7] via-[#0b1220] to-[#020409]"
          : "bg-gray-50"
      }`}
      aria-label="แบบสำรวจความคิดเห็นเกี่ยวกับหนัง"
    >
      <article className="w-full max-w-2xl">
        {/* Card Header */}
        <header className="bg-white border border-gray-200 rounded-t-3xl shadow-sm px-8 py-7 border-b">
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
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
              aria-label={darkMode ? "สลับเป็นโหมดสว่าง" : "สลับเป็นโหมดมืด"}
            >
              {darkMode ? "🌙 Dark" : "☀ Light"}
            </button>
          </div>
        </header>

        {/* Card Body */}
        <div className="bg-white border-x border-b border-gray-200 rounded-b-3xl shadow-sm px-8 py-8">
          {!isSubmitted ? (
            <form
              action="#"
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Name */}
              <section>
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
                          errors.name
                            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100"
                        }`}
                  placeholder="กรุณากรอกชื่อของคุณ"
                  value={feedbackForm.name}
                  onChange={(e) => updateFeedbackField("name", e.target.value)}
                />
                {errors.name && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    {errors.name}
                  </p>
                )}
              </section>

              {/* Email */}
              <section>
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
                          errors.email
                            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100"
                        }`}
                  placeholder="example@email.com"
                  value={feedbackForm.email}
                  onChange={(e) =>
                    updateFeedbackField("email", e.target.value)
                  }
                />
                {errors.email && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    {errors.email}
                  </p>
                )}
              </section>

              {/* Movies */}
              <section aria-label="เลือกหนังที่คุณชอบ">
                <label className="text-sm font-medium text-gray-800">
                  เลือกหนังที่คุณชอบ
                </label>
                <fieldset
                  className={`mt-2 flex flex-col gap-3 w-full rounded-2xl border p-4 bg-white transition
                        ${
                          errors.movie_title
                            ? "border-red-300 ring-2 ring-red-50"
                            : "border-gray-200"
                        }`}
                >
                  <legend className="sr-only">ตัวเลือกหนัง</legend>
                  <MovieLists
                    movieList={movies}
                    selectMovie={selectedMovie}
                    onSelect={handleSelectMovie}
                  />
                </fieldset>

                {errors.movie_title && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    {errors.movie_title}
                  </p>
                )}
              </section>

              {/* Feedback */}
              <section>
                <label
                  htmlFor="feedbackArea"
                  className="text-sm font-medium text-gray-800"
                >
                  ความคิดเห็นเกี่ยวกับหนัง
                </label>
                <textarea
                  id="feedbackArea"
                  className="mt-2 w-full min-h-[120px] rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none  focus:border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-gray-200"
                  placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
                  onChange={(e) =>
                    updateFeedbackField("feedback", e.target.value)
                  }
                  value={feedbackForm.feedback}
                />
              </section>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetFormState}
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
            <section className="p-1" aria-label="ผลการส่งแบบสำรวจ">
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
                  <p className="text-gray-900">{feedbackForm.name}</p>

                  <p className="font-medium text-gray-500">อีเมล</p>
                  <p className="text-gray-900">{feedbackForm.email}</p>

                  <p className="font-medium text-gray-500">หนังที่เลือก</p>
                  <p className="text-gray-900">{feedbackForm.movie_title}</p>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-500">
                    ความคิดเห็น
                  </p>
                  <div className="mt-2 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 whitespace-pre-wrap">
                    {feedbackForm.feedback || "-"}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={resetFormState}
                    className="h-11 w-full rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    ทำแบบสำรวจใหม่
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>

        <footer className="text-center text-xs text-gray-400 mt-6">
          © 2026 CineComment • Feedback Movie
        </footer>
      </article>
    </section>
  );
}

export default MovieFeedbackForm;