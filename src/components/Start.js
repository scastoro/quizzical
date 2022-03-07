import React from "react";

export default function Start({ handleClick }) {
  return (
    <section className="landing-page">
      <h1 className="landing-heading">Quizzical</h1>
      <p className="landing-text">Ipsum officia nihil sed quasi.</p>
      <button className="start-quiz-btn" onClick={handleClick}>
        Start Quiz
      </button>
    </section>
  );
}
