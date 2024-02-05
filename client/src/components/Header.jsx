import Button from "../UI/Button.jsx";
import { useNavigate, Outlet, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { setUser, getUserName } from "../util/getLocalStorage.js";
import useHttp from "../Hocks/ustHttp.js";
import Loading from "../UI/Loading.jsx";

const requestConfig = {};

export default function Header() {
  const user = getUserName();
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useHttp(
    `http://localhost:5000/users:${params.uid.slice(1)}/exams`,
    // `https://quickquizb.onrender.com/users:${params.uid.slice(1)}/exams`,
    requestConfig
  );
  if (data && data.user) {
    setUser(data.user);
  }
  const onLogout = () => {
    setUser(null);
    navigate("/login");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <nav>
        <h1>
          <Link to={`/users/user/home/:${params.uid.slice(1)}`}>
            <span>Q</span>Quiz
          </Link>
        </h1>
        <div>
          {/* <FontAwesomeIcon icon={faBell}  style={{cursor:"pointer"}}/> */}
          {user && <h3 id="nameUser">{user}</h3>}
          <Button onClick={onLogout}>Logout</Button>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
