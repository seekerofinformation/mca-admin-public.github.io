import { Skeleton } from "@mui/material";
import {COURSE_LANGUAGES} from "../constants/courses";
import {QUIZ_TYPES} from "../components/QuizQuestions/QuestionList/QuestionList";

export const disabled = (language, inputEng = "", inputUkr = "") => {
  return language === COURSE_LANGUAGES.EN_UA
      ?
      (!inputEng.length || !inputUkr.length)
      :
      language === COURSE_LANGUAGES.UA
          ?
          !inputUkr.length
          :
          !inputEng.length
};

export const validateName = (course) => {
  if(course){
    if(course?.language === COURSE_LANGUAGES.UA || course?.language === COURSE_LANGUAGES.EN_UA){
      return course?.titles.find(title => title.language === COURSE_LANGUAGES.UA)
    } else {
      return course?.titles.find(title => title.language === COURSE_LANGUAGES.EN)
    }
  }else {
    return <Skeleton width={300} height={42} animation="wave" />
  }
}

export const isDisabledAddButton = (amount, maxAmount) => amount <= maxAmount;

export const questionAnswersLengthCorrect = (length, questionType) => {
  return !(questionType === QUIZ_TYPES.OPEN ? length === 1 : questionType === QUIZ_TYPES.SINGLE ? length > 1 : length > 2)
}

export const hasQuestionAnswersCorrectAnswer = (answers, questionType) => {
  return questionType !== QUIZ_TYPES.OPEN && (questionType === QUIZ_TYPES.SINGLE ? !answers.find(answer => answer.correct) : !(answers.filter(answer => answer.correct).length > 1))
}