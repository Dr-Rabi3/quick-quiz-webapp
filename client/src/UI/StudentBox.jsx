export default function StudentBox({ name, id, answers, questions }) {
  let degree = 0;
  let Answers = answers.filter((ans) => {
    if (ans == null) return 0;
    const answer = { id: ans.id, value: ans.value };
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].choose.length; j++) {
        if (
          questions[i].choose[j].value === answer.value &&
          answer.id === questions[i].choose[j].id &&
          questions[i].answer === answer.value
        ) {
          console.log(questions[i].choose[j], answer);
          return 1;
        }
      }
    }
    return 0;
  });
  // console.log(Answers);
  // for (let i = 0; i < Answers.length; ++i) {
  //   if (Answers[i] && Answers[i].value === Answers[i].answer) {
  //     degree += 1;
  //   }
  // }
  degree = Answers.length;
  return (
    <div className="studentBox">
      <div>
        <div style={{ width: "50%" }}>
          <h2>{name}</h2>
          <h3>{id}</h3>
        </div>
        <p style={{ color: "#f5ff00", fontWeight: 700, fontSize: "1.4rem" }}>
          {((degree / questions.length) * 100 || 0).toFixed(2)}%
        </p>
      </div>
      <div style={{ paddingTop: "13px" }}>
        {questions.map((question, idx) => {
          let isAnswered = "no answer";
          let correctAnswer = null;
          if (Answers[idx]) {
            isAnswered = Answers[idx].value;
            if (Answers[idx].value === question.answer)
              correctAnswer = "correct";
          }
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                overflowWrap: "anywhere",
                margin: "5px 0px",
              }}
            >
              {idx + 1}) {question.title}
              <span
                style={{
                  // float: "right",
                  color: !correctAnswer ? "#f00" : "#54d954",
                  fontWeight: 600,
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
