import { createContext, useReducer } from "react";

const QuestionContext = createContext({
  questions: [],
  clearExam: () => {},
});

function  QuestionReducer(state, action) {
  if (action.type === 'init') {
    return { ...state, questions: action.questions};
  }
  if (action.type === "add-question") {
    const existId = state.questions.findIndex(
      (question) => question.id === action.question.id
    );
    const updateState = [...state.questions];
    if (existId <= -1) {
      updateState.push({ ...action.question });
    }
    return { ...state, questions: updateState };
  }
  if (action.type === "remove-question") {
    const existId = state.questions.findIndex(
      (question) => question.id === action.id
    );
    const updateState = [...state.questions];
    updateState.splice(existId, 1);
    return { ...state, questions: updateState };
  }
  if (action.type === "clear-exam") {
    return { ...state, questions: [] };
  }
  return state;
}

export function QuestionContextProvider({ children }) {
  const [exam, dispatchCart] = useReducer(QuestionReducer, { questions: [] });

  function init(questions) {
    dispatchCart({ type: "init", questions });
  }

  function addItem(question) {
    dispatchCart({ type: "add-question", question });
  }
  function removeItem(id) {
    dispatchCart({ type: "remove-question", id });
  }
  function clearCart() {
    dispatchCart({ type: "clear-exam" });
  }

  const questionContext = {
    questions: exam.questions,
    addItem,
    init,
    removeItem,
    clearCart,
  };

  return (
    <QuestionContext.Provider value={questionContext}>
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionContext;
