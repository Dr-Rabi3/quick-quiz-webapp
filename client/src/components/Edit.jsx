import Textarea from "../UI/Textarea.jsx";
import Button from "../UI/Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import ChoicesContext from "../store/ChoicesList.jsx";
import { useContext, useState } from "react";
import ChooseBox from "../UI/ChooseBox.jsx";
import QuestionContext from "../store/QuestionList.jsx";
import { getExamId, getUserId } from "../util/getLocalStorage.js";
import Error from "../UI/Error.jsx";
import SmallLoading from "../UI/smallLoading.jsx";

const requestConfig = {};

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }
  return resData;
}

export default function Edit() {
  const { choices, clearChoices } = useContext(ChoicesContext);
  const { addItem: addQuestion } = useContext(QuestionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [answers, setAnswers] = useState([]);
  const [URL, setURL] = useState(null);
  const onSend = (event) => {
    event.preventDefault();
    let ok = 0;
    for (let i = 0; i < choices.length; ++i) {
      if (choices[i].value.trim().length !== 0) ok++;
    }
    if (ok <= 1) setError("Choices must be at least 2");
    else if (answers.length !== 1) setError("Correct answer must be 1");
    else {
      setError(null);
      const fd = new FormData(event.target);
      const userFields = Object.fromEntries(fd.entries());
      // console.log(userFields.image);;
      const question = {
        id: `question${Math.floor(Math.random() * 1000000)}`,
        title: userFields.title,
        image: userFields.image,
        choose: choices,
        answer: answers[0],
        examId: getExamId(),
      };
      addQuestion(question);
      setAnswers([]);
      clearChoices();
      event.target.reset();
    }
  };
  const isAnswer = (ans, True) => {
    if (True) setAnswers((prev) => [...prev, ans]);
    else {
      setAnswers((prev) => {
        const temp = prev.filter((x) => x !== ans);
        return [...temp];
      });
    }
  };

  const onCreateLink = async () => {
    setIsLoading(true);
    setURL(null);
    const { data } = await sendHttpRequest(
      // `https://quickquiz-backend.onrender.com/user:${getUserId()}/exam:${getExamId()}/create-link`,
      `http://localhost:3000/user:${getUserId()}/exam:${getExamId()}/create-link`,
      requestConfig
    );
    console.log(data);
    setIsLoading(false);
    setURL(data.Link);
  };

  const CopyLink = () => {
    navigator.clipboard.writeText(URL);
    document.querySelector(".createLink").classList.add("active");
    setTimeout(() => {
    document.querySelector(".createLink").classList.remove("active");
    },800);
  }

  const fontSize = "20px";
  return (
    <form onSubmit={onSend} className="editForm">
      <h1>Add Question</h1>
      <div className="fields">
        {/* <div className="image-input">
          <input type="file" accept="image/*" id="imageInput" name="image" />
          <label htmlFor="imageInput" className="image-button">
            <FontAwesomeIcon icon={faImage} /> Add image
          </label>
          <img src="" alt="image icon"  className="image-preview" />
          <span class="change-image">Choose different image</span>
        </div> */}
        <Textarea
          id="title"
          label="title"
          type="text"
          inputClass="control-two"
        />
        <p style={{ fontSize }}>Choices</p>
        {error && <Error message={error} />}
        {choices.map((choose) => {
          return (
            <ChooseBox
              key={choose.id}
              id={choose.id}
              text={choose.value}
              addAns={isAnswer}
              removeAns={isAnswer}
            />
          );
        })}
      </div>
      <div className="control-row">
        {URL && (
          <button className="createLink" type="button" onClick={CopyLink}>
            {URL}
          </button>
        )}
        {isLoading && <SmallLoading/>}
        <Button type="button" onClick={onCreateLink}>
          Create Link
        </Button>
        <Button type="submit">Add Question</Button>
      </div>
    </form>
  );
}
