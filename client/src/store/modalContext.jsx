import { createContext, useState } from "react";

const openModal = createContext({
  progress: "",
  showAddExam: () => {},
  hideAddExam: () => {},
});

export function ModalProvider({ children }) {
  const [progress, setProgress] = useState("");

  function showAddExam() {
    setProgress("addExam");
  }
  function hideAddExam() {
    setProgress("");
  }

  const userProgress = {
    currentProgress: progress,
    showAddExam,
    hideAddExam,
  };

  return (
    <openModal.Provider value={userProgress}>{children}</openModal.Provider>
  );
}

export default openModal;
