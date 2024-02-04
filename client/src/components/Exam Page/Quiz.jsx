import { useEffect, useState } from "react";
import Question from "./QuestionExam.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function Quiz({ Questions, onAnswer }) {
  const [activeUserAnswers, setActiveUserAnswers] = useState(
    new Array(Questions.length)
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = Questions;
  function answerToQuestion(selectedAnswer) {
    const answers = [...activeUserAnswers];
    answers[currentQuestion] = selectedAnswer;
    setActiveUserAnswers((perv) => {
      return [...answers];
    });
  }
  useEffect(() => {
    onAnswer(activeUserAnswers);
  }, [activeUserAnswers]);
  // console.log(activeUserAnswers);
  let selectedAnswer = "";
  if (activeUserAnswers[currentQuestion])
    selectedAnswer = activeUserAnswers[currentQuestion];
  // console.log(selectedAnswer);
  return (
    <>
      <FontAwesomeIcon
        icon={faAngleLeft}
        className="angle-left"
        onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
      />
      <div id="quiz">
        <Question
          key={currentQuestion}
          question={questions[currentQuestion]}
          onSelectAnswer={answerToQuestion}
          init={selectedAnswer}
        />
      </div>
      <FontAwesomeIcon
        icon={faAngleRight}
        className="angle-right"
        onClick={() =>
          setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1))
        }
      />
    </>
  );
}
