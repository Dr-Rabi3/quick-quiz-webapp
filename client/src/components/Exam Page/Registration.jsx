import Button from "../../UI/Button";
import Input from "../../UI/Input";
import useHttp from "../../Hocks/ustHttp";
import Loading from "../../UI/Loading";

const requestConfig = {};

export default function Registration({ userId, examId, onStart }) {
  const { data: ExamData } = useHttp(
    // `https://quickquizb.onrender.com/user/exam:${examId}`,
    `http://localhost:5000/user/exam:${examId}`,
    requestConfig
  );
  const { data: userData } = useHttp(
    // `https://quickquizb.onrender.com/user:${userId}/exam`,
    `http://localhost:5000/user:${userId}/exam`,
    requestConfig
  );
  if (ExamData && userData) {
    const start = (event) => {
      event.preventDefault();
      const fd = new FormData(event.target);
      const userFields = Object.fromEntries(fd.entries());
      onStart({
        userData,
        ExamData,
        studentData: userFields,
      });
    };

    return (
      <form className="examForm" onSubmit={start}>
        <div className="info">
          <ul className="taps">
            <li>
              Once you fill out the information and click Start, the exam will
              begin.
            </li>
            <li>Study will before starting</li>
            <li>It is not allowed to leave the exam, after starting.</li>
            <li>Do not reload the page.</li>
          </ul>
          <h3 style={{ fontSize: "2rem", margin: "1rem 0rem" }}>
            Exam: {ExamData.title}
          </h3>
          <h3 style={{ fontSize: "1.5rem", margin: "1rem 0rem" }}>
            Dr/ {userData.first} {userData.last}
          </h3>
          <h3 style={{ fontSize: "1rem", margin: "1rem 0rem" }}>
            Level: {ExamData.level}
          </h3>
          <h3 style={{ fontSize: "1rem", margin: "1rem 0rem" }}>
            duration: {ExamData.duration} minute
          </h3>
        </div>
        <div className="studentData">
          <Input
            id="name"
            label="Name"
            inputClass="control"
            type="text"
            required
          />
          <Input
            id="id"
            label="University ID"
            inputClass="control"
            type="text"
            required
          />
          <Button>Start</Button>
        </div>
      </form>
    );
  }
  return <Loading />;
}
