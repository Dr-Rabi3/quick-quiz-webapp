export function validEmail(email) {
  let error = { email: null };
  if (email === null || email.trim() === "")
    error.email = "this field cannot be empty";
  if (!email.includes("@")) error.email = "must input valid email";
  return error;
}
export function validName(fname, lname) {
  let error = { "first-name": null, "last-name": null };
  if (fname === null || fname.trim() === "")
    error["first-name"] = "this field cannot be empty";
  if (lname === null || lname.trim() === "")
    error["last-name"] = "this field cannot be empty";
  return error;
}
export function validPassword(password) {
  let error = { password: null };
  if (password === null || password.trim() === "")
    error.password = "this field cannot be empty";
  if (password.trim().length < 8)
    error.password = "number of characters at least 8";
  return error;
}
export function matching(password, confirmPassword) {
  let error = { "confirm-password": null };
  if (password !== confirmPassword)
    error["confirm-password"] = "must match password";
  return error;
}

export function validate(data) {
  let errors = {
    ...validName(data["first-name"], data["last-name"]),
    ...validEmail(data.email),
    ...validPassword(data.password),
    ...matching(data.password, data["confirm-password"])
  };
  return errors;
}
