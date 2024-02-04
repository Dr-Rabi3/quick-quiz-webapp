import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import { ModalProvider } from "./store/modalContext.jsx";
import AddExam from "./components/AddExam.jsx";
import EditExam from "./components/EditExam.jsx";
import { ChooseContextProvider } from "./store/ChoicesList.jsx";
import { QuestionContextProvider } from "./store/QuestionList.jsx";
import ExamPage from "./components/Exam Page/ExamPage.jsx";
import Accepted from "./UI/Acceptedpage.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "/create-account", element: <SignUp /> },
    { path: "/login", element: <SignIn /> },
    { path: "/", element: <SignIn /> },
    {
      path: "/users/user/home/:uid",
      element: <Header />,
      children: [
        { index: true, element: <Home /> },
        { path: "/users/user/home/:uid/edit-exam", element: <EditExam /> },
      ],
    },
    { path: "/exam/:token", element: <ExamPage /> },
    { path: "/accept", element: <Accepted /> },
  ]);
  return (
    <ModalProvider>
      <QuestionContextProvider>
        <ChooseContextProvider>
          <RouterProvider router={router} />
          <AddExam />
        </ChooseContextProvider>
      </QuestionContextProvider>
    </ModalProvider>
  );
}

export default App;
