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
  const questionsArray = questions.map((question, index) => (
    <Question
      title={question.question}
      correct={question.correct_answer}
      incorrect={question.incorrect_answers}
    />
  ));
  return (
    <section className="quiz">
      {questionsArray}
      <button className="check-answers">Check answers</button>
    </section>
  );
}
