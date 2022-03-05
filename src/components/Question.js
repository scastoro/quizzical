import React from "react";
import parse from "html-react-parser";
import uuid from "react-uuid";

export default function Question({ title, incorrect, handleClick, correct }) {
  const [answers, setAnswers] = React.useState([]);
  React.useEffect(() => {
    let newAnswers = [];
    incorrect.forEach((answer) => {
      newAnswers.push({
        questionAnswer: answer,
        isSelected: false,
        isCorrect: false,
        id: uuid(),
      });
    });
    newAnswers.push({
      questionAnswer: correct,
      isSelected: false,
      isCorrect: true,
      id: uuid(),
    });
    setAnswers(newAnswers.sort(() => Math.random() - 0.5));
  }, []);
  const buttons = answers.map((item) => (
    <button
      onClick={(event, answers) => handleClick(event, answers)}
      className="answer"
      id={item.id}
      iscorrect={`${item.isCorrect}`}
      isselected={`${item.isSelected}`}
    >
      {parse(item.questionAnswer)}
    </button>
  ));
  return (
    <section className="question">
      <h3 className="question-heading">{parse(title)}</h3>
      <section className="answer-container"> {buttons}</section>
      <section className="question-border"></section>
    </section>
  );
}
