import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useCoursesContext} from "../../context/coursesContext";

import QuestionList from "../../components/QuizQuestions/QuestionList/QuestionList";
import Layout from '../../components/common/Layout/Layout';

import Right from '../../images/icons/arrowRight.svg'

import styles from './QuizCourse.module.scss';
import QuestionModal from "../../components/QuizQuestions/QuestionList/QuestionItem/QuestionModal/QuestionModal";
import {MAX_QUIZ_QUESTION_AMOUNT} from "../../constants/general";

const QuizPage = () => {
  const navigate = useNavigate();
  const { quizId, courseId, themeId } = useParams();
  const { singleCourse, singleQuiz: quiz, getCourse, getQuiz } = useCoursesContext();

  const [activeAdd, setActiveAdd] = useState(false);

  useEffect(() => {
    if (!!quizId) {
      getQuiz(quizId)
    }
  }, [quizId])

  useEffect(() => {
    if (!!courseId) {
      getCourse(courseId)
    }
  }, [courseId])

  return (
    <Layout
      buttonName="Повернутися до головної сторінки"
      title={singleCourse?.titles}
    >
      <div className={styles.container}>
        <div className={styles.container_func}>
          <div className={styles.container_navigation}>
            <div className={styles.container_navigation_prev} onClick={() => navigate(`/dashboard/courses`)}>Курс</div>
            <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
            <div className={styles.container_navigation_prev} onClick={() => navigate(`/dashboard/courses/${courseId}/theme`)}>Теми</div>
            <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
            <div className={styles.container_navigation_prev} onClick={() => navigate(`/dashboard/courses/${courseId}/theme/${themeId}/info`)}>Уроки</div>
            <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
            <div className={styles.container_navigation__active}>Квіз</div>
          </div>
          <div className={styles.addQuiz}>
            <div className={styles.addQuiz_btn} onClick={() => setActiveAdd(!activeAdd)}>+ Додати питання</div>
            <div className={styles.addQuiz_counter}>{quiz?.questions?.length || 0}/{MAX_QUIZ_QUESTION_AMOUNT}</div>
          </div>
        </div>
        <QuestionList questions={quiz?.questions} />

        {activeAdd && <QuestionModal setActiveAdd={setActiveAdd} />}
      </div>
    </Layout>
  );
};

export default QuizPage;
