Make a quiz game by querying the Open Trivia Database API
Use the API info to populate the app with trivia questions.

### Tasks to do

- [ ] Make the main components of the app
  - [x] A landing page component
  - [x] The main container component
  - [x] The individual question component
    - [x] Pass props to the questions component contain both question and incorrect/correct answers
- [x] Figure out how to store the state
  - [x] Need to store the API response in state
  - [x] Need to determine which questions are correct
  - [x] State should live inside main component
  - [x] Pass the questions and correct property via props to questions
- [x] Pull five questions from API
- [ ] Style answer buttons when selected
  - [ ] Map through state until the outer array id matches, then map through the answers array at that index and set all answers isSelected properties to false. Set current target to isSelected to true based on id
- [ ] Change style when check answer button is clicked
  - [ ] Need to change from selected style to right or wrong style
- [ ] Tally correct answers after check answers is clicked
  - [ ] Create count state to keep track of correct answers
  - [ ] Make function to loop through answers in state and check if both isSelected is true and the answer id matches correct answer id. Increment count by one when these conditions are true
  - [ ] Put count state in a variable that is contiditonally shown when the check game button is clicked
- [ ] Make sure it is styled and polished
- [ ] Change check answers button to reset game after round
