
export default function Button({children , ...props}) {
  return <button className="action" {...props}>{children}</button>
}