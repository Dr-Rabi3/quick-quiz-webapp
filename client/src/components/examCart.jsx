import img from "../assest/images/img1.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { setExamId } from "../util/getLocalStorage";
import useHttp from "../Hocks/ustHttp";
import Loading from "../UI/Loading";

const requestConfig = {};

export default function ExamCart({ id, title, duration, level, hasNotify }) {
  const params = useParams();
  const navigate = useNavigate();
  const { data, sendRequest } = useHttp(
    // `http://localhost:5000/user/home/exam:${id}/:${params.uid.slice(1)}`,
    `https://quickquizb.onrender.com/user/home/exam:${id}/:${params.uid.slice(1)}`,
    requestConfig
  );

  if (data) {
    const onGoToExam = async () => {
      setExamId(id);
      await sendRequest();
      navigate(`/users/user/home/:${data.nwToken}/edit-exam`);
    };
    return (
      <div onClick={onGoToExam} className="exam">
        {hasNotify > 0 && <span
          style={{  
            width: "12px",
            display: "inline-block",
            height: "12px",
            backgroundColor: "red",
            position: "absolute",
            right: "3%",
            top: "3%",
            fontWeight: "800",
            fontSize: "20px",
            borderRadius:"50%",
          }}
        ></span>}
        <img src={img} alt="" />
        <div className="article">
          <h2>Title: {title}</h2>
          <h2>Duration: {duration} minutes</h2>
          <div className="control-row">
            <h2>Level: {level}</h2>
            <h2>Solved: {data.count || 0}</h2>
          </div>
        </div>
      </div>
    );
  } else return <Loading />;
}
