import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLessonById } from "../features/lessons/lessonsSlice";

export default function LessonDetail() {
  // 🟢 Lấy id từ URL (vd: /lesson/1 -> id = 1)
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🟢 Lấy state từ Redux
  const { currentLesson, loading } = useSelector((state) => state.lessons);

  // 🟢 Khi component mount hoặc id thay đổi -> fetch chi tiết lesson
  useEffect(() => {
    dispatch(fetchLessonById(id));
  }, [dispatch, id]);

  // 🟢 Trạng thái loading
  if (loading) return <p className="loading">Loading...</p>;
  // 🟢 Nếu không có dữ liệu
  if (!currentLesson) return <p className="no-data">No data</p>;

  // 🟢 Hàm phát âm text bằng Web Speech API
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // chọn giọng tiếng Anh (Mỹ)
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="lesson-container">
      {/* Tiêu đề bài học */}
      <h1 className="lesson-title">📘 {currentLesson.title}</h1>

      {/* 📖 Từ vựng */}
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

      {/* 💡 Ngữ pháp */}
      <section className="lesson-section">
        <h2 className="section-title">💡 Ngữ pháp</h2>
        <div
          className="grammar-content"
          dangerouslySetInnerHTML={{ __html: currentLesson.grammar }}
        />
      </section>

      {/* 💬 Hội thoại */}
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

      {/* 🎧 Listening */}
      {currentLesson.listening && currentLesson.listening.length > 0 && (
        <section className="lesson-section">
          <h2 className="section-title">🎧 Nghe</h2>

          {/* Nút nghe toàn bộ */}
          <button
            className="listen-btn"
            onClick={() =>
              speak(currentLesson.listening.map((item) => item.chu).join(". "))
            }
          >
            🔊 Nghe toàn bộ
          </button>

          {/* Danh sách từ/câu nghe */}
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

      {/* 📝 Nút chuyển sang trang bài tập */}
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
