import React from "react";
import parse from "html-react-parser";

export default function Question({ title, answers, correct }) {
  const buttons = answers.map((item) => (
    <button className="answer">{parse(item)}</button>
  ));
  return (
    <section className="question">
      <h3 className="question-heading">{parse(title)}</h3>
      <section className="answer-container"> {buttons}</section>
      <section className="question-border"></section>
    </section>
  );
}
