import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import QuestionContext from "../store/QuestionList";
import { useContext } from "react";

export default function Question({ id, image, title, Answer, answers }) {
  const { removeItem } = useContext(QuestionContext);
  return (
    <li className="question">
      <h2 className="head">
        {image && <img src={image} alt="question image" />}
        {title}
        <FontAwesomeIcon
          icon={faTrash}
          size="2xs"
          style={{ cursor: "pointer" }}
          onClick={() => removeItem(id)}
        />
      </h2>
      <ul className="answers">
        {answers.map((ans) => {
          return (
            <li
              key={ans.id}
              className="ans"
              style={{ color: Answer === ans.value ? "#0a0" : "black" }}
            >
              {ans.value}
            </li>
          );
        })}
      </ul>
    </li>
  );
}
