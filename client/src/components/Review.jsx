import { useContext, useEffect, useState } from "react";
import QuestionContext from "../store/QuestionList";
import Question from "./Question";
import useHttp from "../Hocks/ustHttp";
import { getExamId, getUserId } from "../util/getLocalStorage";
import Button from "../UI/Button";

const requestConfig = {};
const requestConfig2 = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Review() {
  const { questions, init } = useContext(QuestionContext);
  const { data } = useHttp(
    // `https://quickquizb.onrender.com/users/exams:${getExamId()}/questions`,
    `http://localhost:5000/users/exams:${getExamId()}/questions`,
    requestConfig
  );
  const { sendRequest } = useHttp(
    // `https://quickquizb.onrender.com/users:${getUserId()}/exams:${getExamId()}/add-questions`,
    `http://localhost:5000/users:${getUserId()}/exams:${getExamId()}/add-questions`,
    requestConfig2
  );
  const [saved, setSaved] = useState();
  useEffect(() => {
    if (data) init(data);
  }, [data]);

  useEffect(() => setSaved(false), [questions]);

  const onSubmitQuestion = () => {
    setSaved(true);
    sendRequest(JSON.stringify(questions));
  }
  return (
    <form className="editForm" onSubmit={(event) => event.preventDefault()}>
      <Button style={{ float: "right" }} onClick={onSubmitQuestion}>
        {saved ? "Saved" : "Save"}
      </Button>
      <h1>Review Questions</h1>
      <ul className="questions">
        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              id={question.id}
              Answer={question.answer}
              title={question.title}
              answers={question.choose}
            />
          );
        })}
      </ul>
    </form>
  );
}
