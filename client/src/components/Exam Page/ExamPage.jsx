import Header from "./Header.jsx";
import Quiz from "./Quiz.jsx";
import Loading from "../../UI/Loading.jsx";
import useHttp from "../../Hocks/ustHttp.js";
import { useParams } from "react-router-dom";
import Registration from "./Registration.jsx";
import { useEffect, useState } from "react";
import EndExam from "./EndExam.jsx";

const requestConfig = {};

export default function ExamPage() {
  const params = useParams();
  const { data } = useHttp(
    `https://quickquizb.onrender.com/exam/${params.token}`,
    // `http://localhost:3000/exam/${params.token}`,
    requestConfig
  );
  
  const [startQuiz, setStartQuiz] = useState();
  const [EndQuiz, setEndQuiz] = useState();
  const [userAnswer, setUserAnswer] = useState([]);
  const start = ({ userData, ExamData, studentData }) => {
    setStartQuiz({
      userData,
      ExamData,
      studentData,
    });
  };
  const End = () => {
    setEndQuiz(true);
  };
  if (data && data.questions) {
    if (!startQuiz) {
      return (
        <>
          <Registration
            userId={data.userId}
            examId={data.examId}
            onStart={start}
          />
        </>
      );
    } else if (!EndQuiz) {
      return (
        <>
          <Header
            userData={startQuiz.userData}
            examData={startQuiz.ExamData}
            studentData={startQuiz.studentData}
            onEnd={End}
          />
          <Quiz Questions={data.questions} onAnswer={setUserAnswer} />
        </>
      );
    } else {
      return (
        <EndExam
          allData={{
            userId: data.userId,
            examId: data.examId,
            student: startQuiz.studentData,
            answers: userAnswer,
          }}
        />
      );
    }
  }
  return <Loading />;
}
