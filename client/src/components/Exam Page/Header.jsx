import Button from "../../UI/Button";
import Time from "../../UI/Time";

export default function Header({ userData, examData, studentData, onEnd }) {
  return (
    <div className="header">
      <Time time={examData.duration} onEndExam={onEnd} />
      <Button onClick={onEnd}>End Exam</Button>
      <div className="examData">
        <h3>{examData.title}</h3>
        <h3>
          Dr/ {userData.first} {userData.last}
        </h3>
      </div>
      <div className="student">
        <h3>{studentData.name}</h3>
        <p>{studentData.id}</p>
      </div>
    </div>
  );
}
