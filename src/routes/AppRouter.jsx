import React from "react";
import { createBrowserRouter } from "react-router-dom";

// import các page
import Home from "../pages/Home";
import LessonDetail from "../pages/LessonDetail";
import LessonExercises from "../pages/LessonExercises";

// 🟢 Định nghĩa router dùng createBrowserRouter
// Mỗi route là 1 object { path, element }
const AppRouter = createBrowserRouter([
  {
    path: "/", // trang chủ
    element: <Home />,
  },
  {
    path: "/lesson/:id", // chi tiết bài học (dùng param :id)
    element: <LessonDetail />,
  },
  {
    path: "/lessons/:id/exercises", // trang bài tập
    element: <LessonExercises />,
  },

]);

export default AppRouter;
