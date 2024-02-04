import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import useHttp from "../Hocks/ustHttp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../UI/Loading.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function SignIn() {
  const navigate = useNavigate();
  const { data, error, isLoading, sendRequest } = useHttp(
    "https://quickquizb.onrender.com/user",
    // "http://localhost:3000/user",
    requestConfig
  );
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  
  const onLogin = async () => {
    await sendRequest(
      JSON.stringify({
        email: userEmail.trim(),
        password: userPassword.trim(),
      })
    );
  };
  
  if (!error && data) {
    navigate(`/users/user/home/:${data}`);
  }

  if (!error && isLoading)
    return <Loading />;

  const fontSize = "1rem";

  return (
    <>
      <div className="signIn login">
        <div className="landing">
          <h2 className="title">Quick Quiz</h2>
          <p>
            Welcome to our innovative quiz platform where you can become the
            quizmaster! Our set quiz site empowers you to craft and share your
            own quizzes, putting your knowledge and creativity to the test.
            Design questions, set difficulty levels, and personalize your
            quizzes to reflect your unique style. Share your creations with the
            world and challenge friends to test their knowledge. Unleash the
            quiz-setter in you, and let the quizzing adventure begin!
          </p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <h2>Login now</h2>
          <p>
            Secure your access, login with confidence. Your gateway to a secure
            and tailored experience awaits.
          </p>
          <div id="personal-data">
            {error && (
              <p className="error" style={{ fontSize }}>
                {error}
              </p>
            )}
            <Input
              id="email"
              label="Email"
              type="text"
              inputClass="control"
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              inputClass="control"
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
            />
          </div>
          <p className="form-action">
            <Button type="button">
              <Link to="/create-account">Register</Link>
            </Button>
            <Button onClick={onLogin} type="submit">
              Login
            </Button>
          </p>
        </form>
      </div>
    </>
  );
}
