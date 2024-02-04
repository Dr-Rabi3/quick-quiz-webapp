export function setUser(data) {
  if (data) {
    localStorage.userId = data.userId;
    localStorage.userName = data.userName;
  } else {
    localStorage.userName = null;
    localStorage.userId = null;
  }
}

export function getUserId() {
  return localStorage.userId;
}
export function getUserName() {
  return localStorage.userName;
}

export function setExamId(id) {
  localStorage.examId = id;
}

export function getExamId() {
  return localStorage.examId;
}