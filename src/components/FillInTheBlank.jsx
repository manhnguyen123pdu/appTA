import React from "react";

export default function FillInTheBlank({ index, sentence }) {
  const words = sentence.split(" ");
  // Hàm phát âm
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const [hiddenWordData] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex].replace(/[^\w]/g, "");
    const sentenceWithBlank = words
      .map((w, idx) => (idx === randomIndex ? "_____" : w))
      .join(" ");
    return { hiddenWord: word, sentenceWithBlank };
  });
  console.log(hiddenWordData);
  const { hiddenWord, sentenceWithBlank } = hiddenWordData;

  const [answer, setAnswer] = React.useState("");
  const [result, setResult] = React.useState(null);

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === hiddenWord.toLowerCase()) {
      setResult(true);
    } else {
      setResult(false);
    }
  };

  return (
    <div className="exercise-item">
      <p>
        {index + 1}. <b>{sentenceWithBlank}</b>
      </p>
      <button onClick={() => speak(sentence)}>🔊 Nghe</button>
      <input
        type="text"
        placeholder="Điền từ còn thiếu"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={checkAnswer}>Kiểm tra</button>
      {result === true && <p className="correct">✅ Chính xác!</p>}
      {result === false && (
        <p className="wrong">
          ❌ Sai rồi. Đáp án đúng: <b>{hiddenWord}</b>
        </p>
      )}
    </div>
  );
}
