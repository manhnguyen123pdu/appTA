import React from "react";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

// 🟢 App.jsx chỉ cần dùng RouterProvider
export default function App() {
  return <RouterProvider router={AppRouter} />;
}
