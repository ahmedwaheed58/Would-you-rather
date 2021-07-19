import { saveQuestionAnswer, saveQuestion } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function returnAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  };
}

function returnQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question
  };
}

export function handleReturnAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(returnAnswer(authedUser, qid, answer));
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    });
  };
}

export function handleReturnQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOne,
      optionTwo,
      author: authedUser
    }).then(q => dispatch(returnQuestion(q)));
  };
}
