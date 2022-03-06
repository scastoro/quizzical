import React from "react";
import parse from "html-react-parser";

export default function Question({ title, answers, correct, handleClick }) {
  // const buttons = answers.map((item) => (
  //   <button className="answer">{parse(item)}</button>
  // ));
  console.log(answers, correct);
  return (
    <section className="question">
      <h3 className="question-heading">{parse(title)}</h3>
      <section className="answer-container">
        {" "}
        {answers.length > 0
          ? answers.map((item) => (
              <button className="answer" onClick={handleClick}>
                {parse(item.answer)}
              </button>
            ))
          : null}
      </section>
      <section className="question-border"></section>
    </section>
  );
}
