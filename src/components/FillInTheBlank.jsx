import React from "react";

export default function FillInTheBlank({ index, sentence }) {
  // Tách câu thành từng từ
  const words = sentence.split(" ");

  // Hàm phát âm (Text-to-Speech API)
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // đặt ngôn ngữ đọc
    speechSynthesis.speak(utterance);
  };

  // Ẩn 1 từ ngẫu nhiên trong câu
  const [hiddenWordData] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * words.length); // chọn vị trí random
    const word = words[randomIndex].replace(/[^\w]/g, ""); // loại bỏ ký tự đặc biệt (.,!?)
    const sentenceWithBlank = words
      .map((w, idx) => (idx === randomIndex ? "_____" : w)) // thay từ random bằng "_____"
      .join(" ");
    return { hiddenWord: word, sentenceWithBlank };
  });

  // Lấy dữ liệu đã xử lý
  const { hiddenWord, sentenceWithBlank } = hiddenWordData;

  // 📝 State để lưu câu trả lời và kết quả
  const [answer, setAnswer] = React.useState("");
  const [result, setResult] = React.useState(null); // null: chưa làm, true: đúng, false: sai

  // ✅ Hàm kiểm tra đáp án
  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === hiddenWord.toLowerCase()) {
      setResult(true);
    } else {
      setResult(false);
    }
  };

  return (
    <div className="exercise-item">
      {/* Hiển thị câu với 1 chỗ trống */}
      <p>
        {index + 1}. <b>{sentenceWithBlank}</b>
      </p>

      {/* Nút nghe toàn bộ câu */}
      <button onClick={() => speak(sentence)}>🔊 Nghe</button>

      {/* Ô input điền từ còn thiếu */}
      <input
        type="text"
        placeholder="Điền từ còn thiếu"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      {/* Nút kiểm tra kết quả */}
      <button onClick={checkAnswer}>Kiểm tra</button>

      {/* Hiển thị kết quả */}
      {result === true && <p className="correct">✅ Chính xác!</p>}
      {result === false && (
        <p className="wrong">
          ❌ Sai rồi. Đáp án đúng: <b>{hiddenWord}</b>
        </p>
      )}
    </div>
  );
}
