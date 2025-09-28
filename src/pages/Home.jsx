import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { fetchLessons } from "../features/lessons/lessonsSlice"; 
import { Link } from "react-router-dom"; 
import "../styles/index.css"

// 🟢 Component trang Home
export default function Home() {
  const dispatch = useDispatch();

  // Lấy state từ Redux store (state.lessons do lessonsSlice quản lý)
  const { items, loading } = useSelector((state) => state.lessons);

  // Khi component mount -> gọi API lấy danh sách lessons
  useEffect(() => {
    dispatch(fetchLessons()); 
  }, [dispatch]);

  // Nếu đang loading thì hiển thị text
  if (loading) return <p>Loading...</p>;

  return (
    <div className="home-container">
      {/* Tiêu đề trang */}
      <h1 className="home-title">📘 English Lessons</h1>
      <p className="home-subtitle">Chọn bài học để bắt đầu luyện tập</p>

      {/* Lưới hiển thị danh sách các bài học */}
      <div className="lessons-grid">
        {items.map((lesson) => (
          // Link tới trang chi tiết của từng bài học
          <Link
            key={lesson.id}
            to={`/lesson/${lesson.id}`} // ví dụ /lesson/1
            className="lesson-card"
          >
            <h2>{lesson.title}</h2>
            <p>{lesson.description || "Click để học ngay"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
