import Error from "./Error";

export default function Input({
  id,
  label,
  inputClass,
  children,
  hasError,
  labelClass,
  ...props
}) {
  return (
    <div className={inputClass}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} name={id} {...props} />
      {!hasError && children}
      <Error className={hasError ? "show" : "hidden"} message={hasError} />
    </div>
  );
}
