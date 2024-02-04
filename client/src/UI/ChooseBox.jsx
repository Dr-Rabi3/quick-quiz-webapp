import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import Textarea from "./Textarea";
import { useState, useContext } from "react";
import Error from "./Error";
import ChoicesContext from "../store/ChoicesList.jsx";



export default function ChooseBox({ id, text, addAns, removeAns}) {
  const { addItem, removeItem, editChoose } = useContext(ChoicesContext);
  const [error, setError] = useState();
  const [ansClass, setAnsClass] = useState("answer");
  const fire = () => {
    if (text.trim() === "") {
      setError("Please enter a choose or remove this field!");
    } else {
      setError(null);
      const choose = {
        id: `choose${Math.floor(Math.random() * 1000000)}`,
        value: "",
      };
      addItem(choose);
    }
  };
  const cusId = `textarea${id}`;
  const isAns = () => {
    if (ansClass.includes("checked")) {
      setAnsClass("answer");
      removeAns(text, false);
    } else {
      setAnsClass((prev) => prev + " checked");
      addAns(text, true);
    }
  };

  return (
    <>
      <button className={ansClass} onClick={isAns} type="button">
        answer
      </button>
      <Textarea
        id={cusId}
        type="text"
        value={text}
        inputClass="control-two"
        onChange={(event) => editChoose({ value: event.target.value, id })}
      >
        <div className="plus-minus">
          <FontAwesomeIcon icon={faPlus} onClick={fire} />
          <FontAwesomeIcon icon={faMinus} onClick={() => removeItem(id)} />
        </div>
        {error && <Error message={error} />}
      </Textarea>
    </>
  );
}
