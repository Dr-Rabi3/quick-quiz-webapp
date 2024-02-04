import Error from "./Error";

export default function Textarea({
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
      <div className="plus-minus">
        <textarea id={id} name={id} {...props} />
        {!hasError && children}
      </div>
      <Error className={hasError ? "show" : "hidden"} message={hasError} />
    </div>
  );
}
