import React from "react";
import Question from "./Question";

export default function Quiz() {
  const [questions, setQuestions] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await response.json();
      console.log(data);
      setQuestions(data.results);
    })();
  }, []);
  const [answers, setAnswers] = React.useState([]);
  React.useEffect(() => {
    console.log(questions.incorrect_answers);
    try {
      questions;
      setAnswers(
        [
          ...questions.map((item) => item.incorrect_answers),
          questions.correct_answer,
        ].sort(() => Math.random() - 0.5)
      );
    } catch (error) {
      console.log(error);
    }
  }, [questions]);
  const questionsArray = questions.map((question, index) => (
    <Question
      title={question.question}
      correct={question.correct_answer}
      answers={answers}
    />
  ));
  return (
    <section className="quiz">
      {questionsArray}
      <button className="check-answers">Check answers</button>
    </section>
  );
}
