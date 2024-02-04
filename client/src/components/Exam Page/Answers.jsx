
export default function Answer({
  answers,
  selectedAnswer,
  onSelectAnswer,
}) {
  return (
    <ul id="answers">
      {answers.map((choose) => {
        const isSelected = choose.value === selectedAnswer;
        let cssClass = "";
        if (isSelected) {
          cssClass = "selected";
        }
        return (
          <li key={choose.id} className="answer" style={{width:"100%"}}> 
            <button
              onClick={() => onSelectAnswer(choose)}
              className={cssClass}
            >
              {choose.value}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
