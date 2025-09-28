import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLessonById } from "../features/lessons/lessonsSlice";
import RearrangeSentence from "../components/RearrangeSentence";
import FillInTheBlank from "../components/FillInTheBlank";

export default function LessonExercises() {
  // Lấy id từ URL (ví dụ: /lessons/1/exercises → id = 1)
  const { id } = useParams();

  // Khai báo dispatch để gọi action trong redux
  const dispatch = useDispatch();

  // Lấy dữ liệu bài học hiện tại từ redux store
  const { currentLesson, loading } = useSelector((state) => state.lessons);

  // Khi component render lần đầu → gọi API lấy dữ liệu bài học theo id
  useEffect(() => {
    dispatch(fetchLessonById(id));
  }, [dispatch, id]);

  // Trạng thái loading khi đang fetch dữ liệu
  if (loading) return <p className="loading">Loading...</p>;

  // Nếu không có dữ liệu (API trả về null hoặc lỗi)
  if (!currentLesson) return <p className="error">Không có dữ liệu</p>;

  // ✅ Chuẩn bị dữ liệu cho bài tập
  // Lấy tối đa 10 câu đầu tiên trong hội thoại để làm bài "Nghe và điền từ"
  const dialogueSentences =
    currentLesson?.dialogue?.map((d) => d.english).slice(0, 10) || [];

  // Lấy dữ liệu sắp xếp câu (từ backend/json-server)
  const sapXepCauItems = currentLesson?.sapxepcau || [];

  return (
    <div className="lesson-exercises">
      {/* Tiêu đề chung của trang bài tập */}
      <h1>📝 Bài tập – {currentLesson.title}</h1>

      {/* -------------------- Bài 1: Điền từ -------------------- */}
      <section>
        <h2>🎧 Bài 1: Nghe và điền từ</h2>
        {/* Lặp qua các câu hội thoại, mỗi câu sẽ render ra 1 component FillInTheBlank */}
        {dialogueSentences.map((s, i) => (
          <FillInTheBlank key={i} index={i} sentence={s} />
        ))}
      </section>

      {/* -------------------- Bài 2: Sắp xếp câu -------------------- */}
      <section>
        <h2>✂️ Bài 2: Sắp xếp câu</h2>
        {/* Lặp qua danh sách item sắp xếp câu, mỗi item là 1 component RearrangeSentence */}
        {sapXepCauItems.map((item, i) => (
          <RearrangeSentence key={i} index={i} item={item} />
        ))}
      </section>
    </div>
  );
}
