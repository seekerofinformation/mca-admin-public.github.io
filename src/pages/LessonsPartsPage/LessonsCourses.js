import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import {useCoursesContext} from "../../context/coursesContext";

import Layout from '../../components/common/Layout/Layout';
import LessonPartsList from "../../components/LessonParts/LessonPartsList/LessonPartsList";
import LessonPartsModal
  from "../../components/LessonParts/LessonPartsList/LessonPartItem/LessonPartsModal/LessonPartsModal";

import {MAX_LESSON_PARTS_AMOUNT} from "../../constants/general";

import Right from '../../images/icons/arrowRight.svg';

import styles from './LessonsCourses.module.scss';


const LessonsCourses = () => {
  const navigate = useNavigate();
  const { courseId, lessonId, themeId } = useParams()

  const [activeAdd, setActiveAdd] = useState(false);

  const { singleCourse: course, singleLesson: lesson, getLesson, getCourse } = useCoursesContext();

  useEffect(() => {
    if (!!courseId) {
      getCourse(courseId)
    }

    if (!!lessonId) {
      getLesson(lessonId)
    }
  }, [courseId, lessonId])

  return (
    <Layout
      buttonName="Повернутися до головної сторінки"
      title={course?.titles}
    >
      <div className={styles.container}>
        <div className={styles.container_func}>
          <div className={styles.container_navigation}>
            <div className={styles.container_navigation_prev} onClick={() => navigate('/dashboard/courses/')}>Курс</div>
            <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
            <div className={styles.container_navigation_prev} onClick={() => navigate(`/dashboard/courses/${courseId}/theme`)}>Теми</div>
            <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
            <div className={styles.container_navigation_prev} onClick={() => navigate(`/dashboard/courses/${courseId}/theme/${themeId}/info`)}>Уроки</div>
            <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
            <div className={styles.container_navigation__active}>Топіки</div>
          </div>
          <div className={styles.container_func_add}>
            <div className={styles.addLesson}>
              <button className={styles.addQuiz_btn} disabled={lesson?.lessonParts?.length >= MAX_LESSON_PARTS_AMOUNT} onClick={() => setActiveAdd(!activeAdd)}>+ Додати топік</button>
              <div className={styles.addLesson_counter}>{lesson?.lessonParts?.length}/{MAX_LESSON_PARTS_AMOUNT}</div>
            </div>
          </div>
        </div>
        {activeAdd && <LessonPartsModal setEdit={setActiveAdd} />}

        <LessonPartsList lesson={lesson} />
      </div>
    </Layout>
  );
};

export default LessonsCourses;
