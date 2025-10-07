// import các hàm từ Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🟢 Tạo async thunk để gọi API lấy danh sách lessons
export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons", // tên action type
  async () => {
    const res = await fetch("https://86fqwk-8080.csb.app/lessons"); // gọi API
    return await res.json(); // trả về dữ liệu JSON
  }
);

// 🟢 Tạo async thunk để gọi API lấy chi tiết 1 lesson theo id
export const fetchLessonById = createAsyncThunk(
  "lessons/fetchLessonById", // tên action type
  async (id) => {
    const res = await fetch(`https://86fqwk-8080.csb.app/lessons/${id}`);
    return await res.json(); // trả về dữ liệu chi tiết 1 lesson
  }
);

// 🟢 Tạo slice quản lý state liên quan đến lessons
const lessonsSlice = createSlice({
  name: "lessons", // tên slice
  initialState: {
    items: [],          // lưu danh sách tất cả lessons
    currentLesson: null, // lưu lesson chi tiết khi xem 1 bài
    loading: false,      // trạng thái chờ (loading)
    error: null,         // lưu thông báo lỗi nếu có
  },
  reducers: {
    // ở đây không cần reducers đồng bộ
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Xử lý cho fetchLessons
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true; // khi bắt đầu gọi API -> bật loading
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false; // tắt loading
        state.items = action.payload; // lưu danh sách lessons vào state
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false; // tắt loading
        state.error = action.error.message; // lưu thông báo lỗi
      })

      // 🔹 Xử lý cho fetchLessonById
      .addCase(fetchLessonById.pending, (state) => {
        state.loading = true; // khi bắt đầu gọi API -> bật loading
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.loading = false; // tắt loading
        state.currentLesson = action.payload; // lưu lesson chi tiết vào state
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.loading = false; // tắt loading
        state.error = action.error.message; // lưu thông báo lỗi
      });
  },
});

// 🟢 Export reducer để add vào store
export default lessonsSlice.reducer;
