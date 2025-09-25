import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// gọi API lấy danh sách lessons
export const fetchLessons = createAsyncThunk("lessons/fetchLessons", async () => {
  const res = await fetch("https://wrfx9j-8080.csb.app/lessons");
  return await res.json();
});

// gọi API lấy chi tiết 1 lesson
export const fetchLessonById = createAsyncThunk("lessons/fetchLessonById", async (id) => {
  const res = await fetch(`https://wrfx9j-8080.csb.app/lessons/${id}`);
  return await res.json();
});

const lessonsSlice = createSlice({
  name: "lessons",
  initialState: {
    items: [],
    currentLesson: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchLessons
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchLessonById
      .addCase(fetchLessonById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLesson = action.payload;
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default lessonsSlice.reducer;
