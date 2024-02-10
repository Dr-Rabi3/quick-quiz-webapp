import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../Hocks/ustHttp";
import ExamCart from "./examCart";
import Button from "../UI/Button.jsx";
import openModal from "../store/modalContext.jsx";
import { setUser } from "../util/getLocalStorage.js";
import Loading from "../UI/Loading.jsx";
import Search from "../UI/search.jsx";

const requestConfig = {};

export default function Home() {
  const params = useParams();
  const { currentProgress, showAddExam } = useContext(openModal);
  const { data, isLoading, sendRequest } = useHttp(
    `https://quickquizb.onrender.com/users:${params.uid.slice(1)}/exams`,
    // `http://localhost:5000/users:${params.uid.slice(1)}/exams`,
    requestConfig
  );
  const [searchValues, setSearchValues] = useState('');
  const [exams, setExams] = useState([]);
  if (data && data.user) {
    setUser(data.user);
  }
  
  useEffect(() => {
    sendRequest();
  }, [currentProgress]);
  
  useEffect(() => {
    if (data && data.exams) setExams(data.exams);
    if (searchValues.trim().length > 0) {
      setExams(prev => {
        return prev.filter(
          (ex) => {
            const title = ex.title.toLowerCase();
            return title.includes(searchValues.trim().toLowerCase());
          }
        );
      })
    }
  }, [data, searchValues]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Button className="up" onClick={() => showAddExam()}>
        +
      </Button>
      <Search value={searchValues} onSearch={setSearchValues} />
      <div className="container">
        {exams.length === 0 && (
          <p className="light-bold">Not Found Exams</p>
        )}
        {exams &&
          exams.map((exam) => {
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
