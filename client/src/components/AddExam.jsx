import { useContext, useState } from "react";
import openModal from "../store/modalContext.jsx";
import Modal from "../UI/modal.jsx";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import useHttp from "../Hocks/ustHttp.js";
import Error from "../UI/Error.jsx";
import { getUserId } from "../util/getLocalStorage.js";

const requestConfigExam = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function AddExam() {
  const { currentProgress, hideAddExam } = useContext(openModal);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState();
  const [level, setLevel] = useState("");
  const { data, error, sendRequest, clearData } = useHttp(
    `http://localhost:3000/users:${getUserId()}/add-exam`,
    // `https://quickquiz-backend.onrender.com/users:${getUserId()}/add-exam`,
    requestConfigExam
  );

  function addExam(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const userFields = Object.fromEntries(fd.entries());
    sendRequest(JSON.stringify(userFields));
  }

  function onCancel() {
    setDuration();
    setTitle("");
    setLevel("");
    hideAddExam();
    clearData();
  }

  if (!error && data) {
    onCancel();
  }

  return (
    <>
      <Modal
        open={currentProgress === "addExam"}
        onClose={currentProgress === "addExam" ? hideAddExam : null}
      >
        <form className="modelForm" onSubmit={addExam}>
          <h1>Add Exam</h1>
          <Input
            id="title"
            label="Title"
            type="text"
            inputClass="control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <div className="control-row">
            <Input
              id="duration"
              label="Duration"
              type="number"
              placeholder="in minutes"
              min="60"
              inputClass="control"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            />
            <Input
              id="level"
              label="Level"
              type="text"
              inputClass="control"
              value={level}
              onChange={(event) => setLevel(event.target.value)}
            />
          </div>
          <div className="control-row">
            {error && <Error message={error} />}
            <Button onClick={onCancel} type="button">
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
