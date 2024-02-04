import { useState } from "react";
import Answer from "./Answers";

export default function Question({ question, onSelectAnswer,init }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: init.value,
    isCorrect: question.answer === init.id,
  });
  const sendAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer.value,
      isCorrect: question.answer === answer.id,
    });
    onSelectAnswer(answer);
  };
  return (
    <div id="question">
      <h2>{question.title}</h2>
      <Answer
        answers={question.choose}
        selectedAnswer={answer.selectedAnswer}
        onSelectAnswer={sendAnswer}
      />
    </div>
  );
}
