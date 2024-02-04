import { createContext, useReducer } from "react";

const ChoicesContext = createContext({
  choices: [],
  clearChoices: () => {},
});

let init = {
  id: `choose${Math.floor(Math.random() * 1000000)}`,
  value: "",
};

function ChooseReducer(state, action) {
  if (action.type === "add-choose") {
    const existId = state.choices.findIndex(
      (choose) => choose.id === action.choose.id
    );
    const updateState = [...state.choices];
    if (existId <= -1) {
      updateState.push({ ...action.choose });
    }
    return { ...state, choices: updateState };
  }
  if (action.type === "remove-choose") {
    const existId = state.choices.findIndex(
      (choose) => choose.id === action.id
    );
    const updateState = [...state.choices];
    updateState.splice(existId, 1);
    return { ...state, choices: updateState };
  }
  if (action.type === "edit-choose") {
    const existId = state.choices.findIndex(
      (choose) => choose.id === action.id
    );
    const updateState = [...state.choices];
    updateState[existId].value = action.value;
    return { ...state, choices: updateState };
  }
  if (action.type === "clear-choices") {
    init = {
      id: `choose${Math.floor(Math.random() * 1000000)}`,
      value: "",
    };
    return { ...state, choices: [init] };
  }
  return state;
}

export function ChooseContextProvider({ children }) {
  const [question, dispatchCart] = useReducer(ChooseReducer, {
    choices: [init],
  });

  function addItem(choose) {
    dispatchCart({ type: "add-choose", choose });
  }
  function removeItem(id) {
    dispatchCart({ type: "remove-choose", id });
  }
  function clearChoices() {
    dispatchCart({ type: "clear-choices" });
  }
  function editChoose({ value, id }) {
    dispatchCart({ type: "edit-choose", id, value });
  }

  const chooseContext = {
    choices: question.choices,
    addItem,
    removeItem,
    clearChoices,
    editChoose,
  };

  return (
    <ChoicesContext.Provider value={chooseContext}>
      {children}
    </ChoicesContext.Provider>
  );
}

export default ChoicesContext;
