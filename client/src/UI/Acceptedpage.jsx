
export default function Accepted() {
  return (
    <div
      className="EndExam"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p className="correct-assign" />
      <p style={{ color: "#fff", fontSize: "2rem" }}>
        We are happy to have you join us,Please confirm your email, and login again.
      </p>
      <p
        style={{
          fontSize: "2rem",
          margin: "2rem",
          color: "#54d954",
          fontWeight: 700,
        }}
      >
        check your email.
      </p>
    </div>
  );
}