import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLessons } from "../features/lessons/lessonsSlice";
import { Link } from "react-router-dom";
import "../styles/index.css"

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.lessons);

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div  className="home-container">
      <h1 className="home-title">📘 English Lessons</h1>
      <p className="home-subtitle">Chọn bài học để bắt đầu luyện tập</p>
      <div className="lessons-grid">
        {items.map((lesson) => (
          <Link key={lesson.id} to={`/lesson/${lesson.id}`} className="lesson-card">
            <h2>{lesson.title}</h2>
            <p>{lesson.description || "Click để học ngay"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
