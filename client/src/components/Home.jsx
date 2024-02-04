import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../Hocks/ustHttp";
import ExamCart from "./examCart";
import Button from "../UI/Button.jsx";
import openModal from "../store/modalContext.jsx";
import { setUser } from "../util/getLocalStorage.js";
import Loading from "../UI/Loading.jsx";

const requestConfig = {};

export default function Home() {
  const params = useParams();
  const { currentProgress, showAddExam } = useContext(openModal);
  const { data, isLoading, sendRequest } = useHttp(
    // `https://quickquiz-backend.onrender.com/users:${params.uid.slice(1)}/exams`,
    `http://localhost:3000/users:${params.uid.slice(1)}/exams`,
    requestConfig
  );
  if (data && data.user) {
    setUser(data.user);
  }
  useEffect(() => {
    sendRequest();
  }, [currentProgress]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Button className="up" onClick={() => showAddExam()}>
        +
      </Button>
      <div className="container">
        {data && !data.exams.length && (
          <p className="light-bold">Not Found Exams</p>
        )}
        {data &&
          data.exams.length !== 0 &&
          data.exams.map((exam) => {
            return (
              <ExamCart
                key={exam.id}
                id={exam.id}
                title={exam.title}
                duration={exam.duration}
                level={exam.level}
                hasNotify={exam.notify}
              />
            );
          })}
      </div>
    </>
  );
}
