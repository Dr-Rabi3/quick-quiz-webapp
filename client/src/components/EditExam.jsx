import Edit from "./Edit";
import Review from "./Review";
import Button from "../UI/Button";
import { useState } from "react";
import { prefix } from "@fortawesome/free-solid-svg-icons";
import Response from "./Response";

const style = {
  padding: "10px 15px",
  border: "none",
  cursor: "pointer",
  borderRadius: "2px",
  color: "#fff",
  fontWeight: 600,
  backgroundColor: "transparent",
  border: "4px solid var(--second-color)",
};

const active = {
  backgroundColor: "var(--second-color)",
};

export default function EditExam() {
  const [cssStyle1, setCssStyle1] = useState({
    ...style,
    ...active,
  });
  const [cssStyle2, setCssStyle2] = useState(style);
  const [response, setResponse] = useState();
  const setActive = (num = 1) => {
    console.log(num);
    if (num === 1) {
      setCssStyle2(style);
      setCssStyle1((prev) => ({
        ...prev,
        ...active,
      }));
      setResponse(false);
    } else {
      setCssStyle1(style);
      setCssStyle2((prev) => ({
        ...prev,
        ...active,
      }));
      setResponse(true);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6rem",
          margin: "2rem 0rem -2rem",
        }}
      >
        <Button style={cssStyle1} onClick={() => setActive(1)}>
          Edit Exam
        </Button>
        <Button style={cssStyle2} onClick={() => setActive(2)}>
          Responses
        </Button>
      </div>
      <div className="container editing">
        {!response && (
          <>
            <Edit />
            <Review />
          </>
        )}
        {response && <Response/>}
      </div>
    </>
  );
}
