import { useEffect } from "react";
import useHttp from "../../Hocks/ustHttp";
import Loading from "../../UI/Loading";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const requestConfig2 = {};

export default function EndExam({ allData }) {
  const { isLoading, sendRequest } = useHttp(
    // "https://quickquiz-backend.onrender.com/exam/response",
    "http://localhost:3000/exam/response",
    requestConfig
  );
  const {} = useHttp(
    // `https://quickquiz-backend.onrender.com/notification/:${allData.examId}/:1`,
    `http://localhost:3000/notification/:${allData.examId}/:1`,
    requestConfig2
  );
  useEffect(() => {
    sendRequest(JSON.stringify(allData));
    // notify();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div
      className="EndExam"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p className="correct-assign" />
      <p style={{ color: "#fff", fontSize: "2rem" }}>
        The exam is over and we hope that all your answers are correct.
      </p>
      <p
        style={{
          fontSize: "2rem",
          margin: "2rem",
          color: "#54d954",
          fontWeight: 700,
        }}
      >
        Good luck for everybody.
      </p>
    </div>
  );
}
