
export default function StudentBox({ name, id, answers, questions }) {
  let degree = 0;
  for (let i = 0; i < answers.length; ++i) {
    if (answers[i] && answers[i].value === questions[i].answer) {
      degree += 1;
    }
  }
  return (
    <div className="studentBox">
      <div>
        <div style={{ width: "50%" }}>
          <h2>{name}</h2>
          <h3>{id}</h3>
        </div>
        <p style={{ color: "#f5ff00", fontWeight: 700, fontSize: "1.4rem" }}>
          {((degree / questions.length) * 100).toFixed(2)}%
        </p>
      </div>
      <div style={{paddingTop: "13px"}}>
        {questions.map((question, idx) => {
            let isAnswered = "no answer";
            let correctAnswer = null;
            if (answers[idx]) {
              isAnswered = answers[idx].value;
              if (answers[idx].value === question.answer)
                correctAnswer = "correct";
            }
            return (
              <div key={idx}>
                {idx + 1}) {question.title}
                <span
                  style={{
                    float: "right",
                    color: !correctAnswer ? "#f00" : "#54d954",
                    fontWeight:600
                  }}
                >
                  {isAnswered}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
