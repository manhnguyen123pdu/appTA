import React from "react";

export default function RearrangeSentence({ index, item }) {
  // Lấy danh sách từ trong câu (được truyền từ props)
  const words = item.correct.split(" "); 

  // State lưu danh sách từ đã được trộn ngẫu nhiên
  const [shuffled, setShuffled] = React.useState(
    () => [...words].sort(() => Math.random() - 0.5) // trộn mảng words
  );

  // State lưu các từ mà người dùng đã chọn
  const [selectedWords, setSelectedWords] = React.useState([]);

  // State lưu kết quả kiểm tra (true = đúng, false = sai, null = chưa kiểm tra)
  const [result, setResult] = React.useState(null);

  // 👉 Hàm xử lý khi chọn một từ
  const selectWord = (w, i) => {
    // Thêm từ vừa chọn vào danh sách selectedWords
    setSelectedWords([...selectedWords, w]);

    // Xóa từ đó khỏi danh sách shuffled (gán = null để không render nữa)
    setShuffled((prev) => {
      const newArr = [...prev];
      newArr[i] = null;
      return newArr;
    });
  };

  // 👉 Hàm kiểm tra câu trả lời
  const checkAnswer = () => {
    if (selectedWords.join(" ") === item.correct) {
      setResult(true); // đúng
    } else {
      setResult(false); // sai
    }
  };

  // 👉 Hàm làm lại: reset toàn bộ state về ban đầu
  const reset = () => {
    setSelectedWords([]); // xóa đáp án đã chọn
    setResult(null); // reset kết quả
    setShuffled([...words].sort(() => Math.random() - 0.5)); // trộn lại từ ban đầu
  };

  return (
    <div className="exercise-item">
      {/* Tiêu đề câu hỏi */}
      <p>
        {index + 1}. <b>Sắp xếp lại câu</b>
      </p>

      {/* Danh sách từ gợi ý (đã được trộn) */}
      <div className="words-bank">
        {shuffled.map(
          (w, i) =>
            w && ( // chỉ render những từ khác null
              <button
                key={i}
                className="word-btn"
                onClick={() => selectWord(w, i)} // khi bấm thì chọn từ
              >
                {w}
              </button>
            )
        )}
      </div>

      {/* Hiển thị đáp án người dùng đang sắp xếp */}
      <p className="answer-box">{selectedWords.join(" ")}</p>

      {/* Nút chức năng */}
      <button onClick={checkAnswer}>Kiểm tra</button>
      <button onClick={reset}>Làm lại</button>

      {/* Hiển thị kết quả */}
      {result === true && <p className="correct">✅ Chính xác!</p>}
      {result === false && (
        <p className="wrong">
          ❌ Sai rồi. Đáp án đúng: <b>{item.correct}</b>
        </p>
      )}

      {/* Nếu có lời giải thích thì hiển thị */}
      {item.explanation && (
        <p style={{ color: "#555", fontSize: "14px" }}>💡 {item.explanation}</p>
      )}
    </div>
  );
}
