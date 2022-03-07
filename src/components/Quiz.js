import React from "react";
import Question from "./Question";
import uuid from "react-uuid";

export default function Quiz() {
  const [questions, setQuestions] = React.useState([]);
  const [formQuestions, setFormQuestions] = React.useState([]);
  const [questionsArray, setQuestionsArray] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [newGame, setNewGame] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await response.json();
      setQuestions(data.results);
    })();
  }, [newGame]);

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
      setFormQuestions(newQuestions);
    })();
  }, [questions]);

  function toggleClick(answerArr, correctAns, questId, event) {
    if (gameOver) {
      return;
    }
    setFormQuestions((prevFormQuest) => {
      // Set formatted questions to new array with the isSelected property of the matching answer toggled
      // Map through containing array to find matching Question index
      return prevFormQuest.map((quest) => {
        if (quest.id === questId) {
          return {
            ...quest,
            // Map through answers array of matching Question
            answers: quest.answers.map((answer) => {
              // Set isSelected value to true if id matches
              if (answer.id === event.target.id) {
                return {
                  ...answer,
                  isSelected: true,
                };
              } else {
                // Else set all other answers isSelected to false
                // This ensures only one question can be toggled at one time
                return {
                  ...answer,
                  isSelected: false,
                };
              }
            }),
          };
        } else {
          return quest;
        }
      });
    });
  }
  // Function to loop through state and check if selected answers are correct
  function checkAnswers() {
    setFormQuestions((prevFormQuest) => {
      return prevFormQuest.map((question) => {
        return {
          ...question,
          answers: question.answers.map((answer) => {
            return {
              ...answer,
              isChecked: true,
            };
          }),
        };
      });
    });
  }

  React.useEffect(() => {
    (async () => {
      const newQuestArr = await formQuestions.map((question, index) => (
        <Question
          title={question.question}
          correct={question.correct_answer}
          gameState={gameOver}
          answers={question.answers}
          id={question.id}
          handleClick={(event) =>
            toggleClick(
              question.answers,
              question.correct_answer,
              question.id,
              event
            )
          }
        />
      ));
      setQuestionsArray(newQuestArr);
    })();
  }, [formQuestions]);

  function countCorrect() {
    let count = 0;
    formQuestions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.id === question.correct_answer.id && answer.isSelected) {
          count++;
        }
      });
    });
    setCount(count);
    setGameOver(true);
  }

  function toggleNewGame() {
    setNewGame((prevGame) => !prevGame);
    setCount(0);
    setGameOver(false);
  }

  return (
    <section className="quiz">
      {questionsArray.length > 0 ? questionsArray : null}
      <section className="btn-container">
        <button
          onClick={
            !gameOver
              ? () => {
                  checkAnswers();
                  countCorrect();
                }
              : toggleNewGame
          }
          className="check-answers"
        >
          {!gameOver ? "Check answers" : "Play again"}
        </button>
        <p className="game-score">
          {gameOver && `You scored ${count}/5 correct answers`}
        </p>
      </section>
    </section>
  );
}
