import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLessonById } from "../features/lessons/lessonsSlice";

export default function LessonDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let navigate =useNavigate()
  const { currentLesson, loading } = useSelector((state) => state.lessons);

  useEffect(() => {
    dispatch(fetchLessonById(id));
  }, [dispatch, id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!currentLesson) return <p className="no-data">No data</p>;

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // phát âm tiếng Anh (Mỹ)
    speechSynthesis.speak(utterance);
  };
  return (
    <div className="lesson-container">
      {/* Title */}
      <h1 className="lesson-title">📘 {currentLesson.title}</h1>

      {/* Vocabulary */}
      <section className="lesson-section">
        <h2 className="section-title">📖 Từ vựng</h2>
        <table className="vocab-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Từ vựng</th>
              <th>Phiên âm</th>
              <th>Nghĩa</th>
              <th>Phát âm</th>
            </tr>
          </thead>
          <tbody>
            {currentLesson.NewWord?.map((w) => (
              <tr key={w.stt}>
                <td>{w.stt}</td>
                <td>{w.chu}</td>
                <td>{w.pronunciation}</td>
                <td>{w.nghia}</td>
                <td>
                  <button
                    className="speak-btn"
                    onClick={() => speak(w.chu)}
                    title="Nghe phát âm"
                  >
                    🔊
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Grammar */}
      <section className="lesson-section">
        <h2 className="section-title">💡 Ngữ pháp</h2>
        <div
          className="grammar-content"
          dangerouslySetInnerHTML={{ __html: currentLesson.grammar }}
        />
      </section>

      {/* Dialogue */}
      <section className="lesson-section">
        <h2 className="section-title">💬 Hội thoại</h2>
        <div className="dialogue-list">
          <table className="dialogue-table">
            <thead>
              <tr>
                <th>Người nói</th>
                <th>Câu tiếng Anh</th>
                <th>Phiên âm</th>
                <th>Dịch nghĩa</th>
                <th>Phát âm</th>
              </tr>
            </thead>
            <tbody>
              {currentLesson.dialogue?.map((d, i) => (
                <tr key={i}>
                  <td className="speaker">{d.speaker}</td>
                  <td>{d.english}</td>
                  <td className="pron">{d.pronunciation}</td>
                  <td className="vn">{d.vietnamese}</td>
                  <td>
                    <button
                      className="speak-btn"
                      onClick={() => speak(d.english)}
                      title="Nghe phát âm"
                    >
                      🔊
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Listening */}

      {currentLesson.listening && currentLesson.listening.length > 0 && (
        <section className="lesson-section">
          <h2 className="section-title">🎧 Nghe</h2>
          <button
            className="listen-btn"
            onClick={() =>
              speak(currentLesson.listening.map((item) => item.chu).join(". "))
            }
          >
            {" "}
            🔊 Nghe toàn bộ
          </button>
          <ul className="vocab-list">
            {currentLesson.listening.map((item) => (
              <li key={item.stt}>
                <b className="vocab-word">{item.chu}</b>{" "}
                <span className="vocab-pron">({item.pronunciation})</span> –{" "}
                {item.nghia}
              </li>
            ))}
          </ul>
        </section>
      )}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          className="exercise-btn"
          onClick={() => navigate(`/lessons/${id}/exercises`)}
        >
          📝 Làm bài tập
        </button>
      </div>
    </div>
  );
}
