import React from 'react'

export default function RearrangeSentence({ index, item }) {

  const words = item.words;

  const [shuffled, setShuffled] = React.useState(() =>
    [...words].sort(() => Math.random() - 0.5)
  );
  const [selectedWords, setSelectedWords] = React.useState([]);
  const [result, setResult] = React.useState(null);

  const selectWord = (w, i) => {
    setSelectedWords([...selectedWords, w]);
    setShuffled((prev) => {
      const newArr = [...prev];
      newArr[i] = null;
      return newArr;
    });
  };

  const checkAnswer = () => {
    if (selectedWords.join(" ") === item.correct) {
      setResult(true);
    } else {
      setResult(false);
    }
  };

  const reset = () => {
    setSelectedWords([]);
    setResult(null);
    setShuffled([...words].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="exercise-item">
      <p>
        {index + 1}. <b>Sắp xếp lại câu</b>
      </p>
      <div className="words-bank">
        {shuffled.map(
          (w, i) =>
            w && (
              <button
                key={i}
                className="word-btn"
                onClick={() => selectWord(w, i)}
              >
                {w}
              </button>
            )
        )}
      </div>
      <p className="answer-box">{selectedWords.join(" ")}</p>
      <button onClick={checkAnswer}>Kiểm tra</button>
      <button onClick={reset}>Làm lại</button>
      {result === true && <p className="correct">✅ Chính xác!</p>}
      {result === false && (
        <p className="wrong">
          ❌ Sai rồi. Đáp án đúng: <b>{item.correct}</b>
        </p>
      )}
      {item.explanation && (
        <p style={{ color: "#555", fontSize: "14px" }}>💡 {item.explanation}</p>
      )}
    </div>
  );
}
