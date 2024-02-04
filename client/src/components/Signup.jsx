import useHttp from "../Hocks/ustHttp";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { validate } from "../util/validationSignUp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../UI/Loading.jsx";
const _ = require("lodash"); // to check two object equal or not

const initField = {
  "first-name": null,
  "last-name": null,
  email: null,
  password: null,
  "confirm-password": null,
};

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function SignUp() {
  const navigate = useNavigate();
  const [inputField, setInputField] = useState(initField);
  const { data, error, isLoading, sendRequest } = useHttp(
    "https://quickquizb.onrender.com/create-account",
    // "http://localhost:3000/create-account",
    requestConfig
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const userFields = Object.fromEntries(fd.entries());
    const errors = validate(userFields);
    setInputField((prev) => ({
      ...prev,
      ...errors,
    }));
    if (_.isEqual(errors, initField)) {
      delete userFields["confirm-password"];
      sendRequest(JSON.stringify(userFields));
    }
  };
  if (data) navigate("/accept");

  if (!error && isLoading)
    return <Loading />;

  return (
    <>
      <div className="login">
        <header>
          <h1>
            <Link to="/login">Quick Exam </Link>
          </h1>
        </header>
        <form className="signUp" onSubmit={handleSubmit}>
          <h2>Registration</h2>
          <p>We just need a little bit of data from you to get you started.</p>
          <div id="personal-data" className="control-row">
            <Input
              id="first-name"
              label="First Name"
              type="text"
              inputClass="control"
              hasError={inputField["first-name"]}
            />
            <Input
              id="last-name"
              label="Last Name"
              type="text"
              inputClass="control"
              hasError={inputField["last-name"]}
            />
          </div>
          <div id="media-data">
            <Input
              id="email"
              label="Email"
              type="email"
              inputClass="control"
              hasError={inputField.email || error}
            >
              <p className="text-light">must be valid email</p>
            </Input>
            <div className="control-row">
              <Input
                id="password"
                label="Password"
                type="password"
                inputClass="control"
                hasError={inputField.password}
              >
                <p className="text-light">
                  Password should contain at least eight characters
                </p>
              </Input>
              <Input
                id="confirm-password"
                label="Confirm Password"
                type="password"
                inputClass="control"
                hasError={inputField["confirm-password"]}
              >
                <p className="text-light">must match password</p>
              </Input>
            </div>
          </div>
          <p className="form-action">
            <Button>Register</Button>
          </p>
        </form>
      </div>
    </>
  );
}
