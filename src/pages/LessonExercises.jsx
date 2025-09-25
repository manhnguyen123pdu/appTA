import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLessonById } from "../features/lessons/lessonsSlice";
import RearrangeSentence from "../components/RearrangeSentence";
import FillInTheBlank from "../components/FillInTheBlank";

export default function LessonExercises() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentLesson, loading } = useSelector((state) => state.lessons);

  useEffect(() => {
    dispatch(fetchLessonById(id));
  }, [dispatch, id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!currentLesson) return <p className="error">Không có dữ liệu</p>;

  const dialogueSentences =
    currentLesson?.dialogue?.map((d) => d.english).slice(0, 10) || [];
  const sapXepCauItems = currentLesson?.sapxepcau || [];

  return (
    <div className="lesson-exercises">
      <h1>📝 Bài tập – {currentLesson.title}</h1>

      {/* Bài 1 */}
      <section>
        <h2>🎧 Bài 1: Nghe và điền từ</h2>
        {dialogueSentences.map((s, i) => (
          <FillInTheBlank key={i} index={i} sentence={s} />
        ))}
      </section>

      {/* Bài 2 */}
      <section>
        <h2>✂️ Bài 2: Sắp xếp câu</h2>
        {sapXepCauItems.map((item, i) => (
          <RearrangeSentence key={i} index={i} item={item} />
        ))}
      </section>
    </div>
  );
}
