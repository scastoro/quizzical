import React from "react";
import parse from "html-react-parser";

export default function Question({
  title,
  answers,
  gameState,
  correct,
  handleClick,
}) {
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
          ? answers.map((item) => {
              let styles = {};
              if (item.isSelected) {
                styles.backgroundColor = "#D6DBF5";
                styles.border = "none";
              }
              if (gameState) {
                styles.cursor = "default";
              }
              if (item.isChecked && item.id === correct.id) {
                styles.backgroundColor = "#94D7A2";
                styles.border = "none";
              } else if (
                item.isSelected &&
                item.isChecked &&
                item.id !== correct.id
              ) {
                styles.backgroundColor = "#F8BCBC";
                styles.border = "none";
                styles.opacity = "50%";
              }
              return (
                <button
                  id={item.id}
                  style={styles}
                  className="answer"
                  onClick={handleClick}
                >
                  {parse(item.answer)}
                </button>
              );
            })
          : null}
      </section>
      <section className="question-border"></section>
    </section>
  );
}
