import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LessonDetail from "../pages/LessonDetail";
import LessonExercises from "../pages/LessonExercises";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lesson/:id" element={<LessonDetail />} />
       <Route path="/lessons/:id/exercises" element={<LessonExercises />} />
      <Route path="*" element={<p>404 Not Found</p>} />
    </Routes>
  );
}
