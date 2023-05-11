import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import ThemeModal from '../../components/Topics/ThemeModal/ThemeModal';
import DescItem from "../../components/Topics/DescItem/DescItem";
import ThemeList from "../../components/Topics/ThemeList/ThemeList";
import CourseNameItem from "../../components/Topics/CourseNameItem/CourseNameItem";

import Layout from '../../components/common/Layout/Layout';

import { useCoursesContext } from "../../context/coursesContext";

import {MAX_LESSON_AMOUNT} from "../../constants/general";

import Right from '../../images/icons/arrowRight.svg';

import styles from './ThemeCourse.module.scss';

const ThemeCourse = () => {
  const { courseId } = useParams()
  const navigate = useNavigate();
  const { singleCourse: course, getCourse } = useCoursesContext();

  const [activeAdd, setActiveAdd] = useState(false);

  useEffect(() => {
    getCourse(courseId)
  }, [courseId])

  return (
    <Layout
      buttonName="Повернутися до головної сторінки"
      title={!!course ? course.titles : null}
    >
      <div className={styles.container}>
        <div className={styles.container_func}>
          <div className={styles.container_navigation}>
            <div className={styles.container_navigation_prev} onClick={() => navigate(`/dashboard/courses/`)}>Курс</div>
            <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
            <div className={styles.container_navigation__active}>Теми</div>
          </div>
          <div className={styles.addTheme}>
            <button
              className={styles.addTheme_btn}
              onClick={() => setActiveAdd(!activeAdd)}
              disabled={course?.topics?.length >= MAX_LESSON_AMOUNT}
            >
              + Додати тему
            </button>
            <div className={styles.addTheme_counter}>{course?.topics?.length || 0}/{MAX_LESSON_AMOUNT}</div>
          </div>
        </div>
        <div className={styles.theme}>
          <CourseNameItem course={course} />
        </div>
        <div className={styles.theme}>
          <DescItem course={course} />
        </div>

        {activeAdd && <ThemeModal activeAdd={activeAdd} setActiveAdd={setActiveAdd} />}

        {!!course?.topics?.length && <ThemeList />}
      </div>
    </Layout>
  );
};

export default ThemeCourse;
