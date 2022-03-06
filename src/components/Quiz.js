import React from "react";
import Question from "./Question";
import uuid from "react-uuid";

export default function Quiz() {
  const [questions, setQuestions] = React.useState([]);
  const [formQuestions, setFormQuestions] = React.useState([]);
  const [questionsArray, setQuestionsArray] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await response.json();
      setQuestions(data.results);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      let newQuestions = await questions.map((question) => ({
        correct_answer: {
          answer: question.correct_answer,
          id: uuid(),
          isSelected: false,
          isChecked: false,
        },
        oldAnswers: [
          ...question.incorrect_answers.map((item) => ({
            answer: item,
            id: uuid(),
            isSelected: false,
            isChecked: false,
          })),
        ],
        question: question.question,
        id: uuid(),
      }));
      newQuestions.forEach(
        (question) =>
          (question.answers = [
            ...question.oldAnswers,
            question.correct_answer,
          ].sort((a, b) => 0.5 - Math.random()))
      );
      console.log(newQuestions);
      setFormQuestions(newQuestions);
    })();
  }, [questions]);

  function toggleClick(ansArr, corrAns, event) {
    console.log(event, ansArr, corrAns);
  }

  React.useEffect(() => {
    (async () => {
      const newQuestArr = await formQuestions.map((question, index) => (
        <Question
          title={question.question}
          correct={question.correct_answer}
          answers={question.answers}
          handleClick={(event) =>
            toggleClick(question.answers, question.correct_answer, event)
          }
        />
      ));
      console.log(newQuestArr);
      setQuestionsArray(newQuestArr);
    })();
  }, [formQuestions]);

  return (
    <section className="quiz">
      {questionsArray.length > 0 ? questionsArray : null}
      <button className="check-answers">Check answers</button>
    </section>
  );
}
