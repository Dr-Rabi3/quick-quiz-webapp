import useHttp from "../Hocks/ustHttp";
import { useParams } from "react-router-dom";
import Loading from "../UI/Loading";
import { getExamId } from "../util/getLocalStorage";
import StudentBox from "../UI/StudentBox.jsx";
const requestConfig = {};

export default function Response() {
  const params = useParams();
  const { data: studentData } = useHttp(
    `https://quickquizb.onrender.com/exam/response/${params.uid}`,
    // `http://localhost:5000/exam/response/${params.uid}`,
    requestConfig
  );
  const { data: questions } = useHttp(
    `https://quickquizb.onrender.com/users/exams:${getExamId()}/questions`,
    // `http://localhost:5000/users/exams:${getExamId()}/questions`,
    requestConfig
  );
    const {} = useHttp(
      `https://quickquizb.onrender.com/notification/:${getExamId()}/:0`,
      // `http://localhost:5000/notification/:${getExamId()}/:0`,
      requestConfig
    );
  if (studentData && questions) {
    return (
      <div className="students">
        {studentData.length === 0 && <p className="light-bold">No Responses</p>}
        {studentData.length > 0 &&
          studentData.map((student) => {
            return (
              <StudentBox
                key={student.id}
                name={student.student.name}
                id={student.student.id}
                answers={student.answers}
                questions={questions}
              />
            );
          })}
      </div>
    );
  } else return <Loading />;
}
