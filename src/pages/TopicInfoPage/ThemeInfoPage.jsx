import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom';

import LessonsList from "../../components/Lessons/LessonsList/LessonsList";
import QuizModal from "../../components/Lessons/LessonsList/QuizItem/QuizModal/QuizModal";
import LessonModal from "../../components/Lessons/LessonsList/LessonItem/LessonModal/LessonModal";

import Layout from '../../components/common/Layout/Layout';

import {useCoursesContext} from "../../context/coursesContext";

import {MAX_LESSON_AMOUNT, MAX_QUIZ_AMOUNT, TITLE_TYPES} from "../../constants/general";

import Right from '../../images/icons/arrowRight.svg'

import styles from '../QuizPage/QuizCourse.module.scss';

export const ADD_TYPES = {
    QUIZ: "quiz",
    LESSON: "lesson",
    NONE: "none"
}

const ThemeInfoPage = () => {
    const navigate = useNavigate();
    const { search } = useLocation()
    const { courseId, themeId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const { singleCourse, singleTopic: topic, getCourse, getCourseTopic } = useCoursesContext();

    const [quizCreation, setCreateQuiz] = useState(false);
    const [lessonCreation, setCreateLesson] = useState(false);

    const handleAddLesson = () => {
        setCreateLesson(true)
    }

    const handleAddQuiz = () => {
        if (!!topic?.lessons?.length && !!topic?.lessons?.length <= 5) {
            setCreateQuiz(true)
        }
    }

    useEffect(() => {
        if (!!search) {
            const entity = search.split("=")[1]
            entity === ADD_TYPES.LESSON ? setCreateLesson(true) :
            entity === ADD_TYPES.QUIZ &&  handleAddQuiz()
            setSearchParams("")
        }
    }, [search])

    useEffect(() => {
        if (!!courseId) {
            getCourse(courseId)
        }
    }, [courseId])

    useEffect(() => {
        if (!!themeId) {
            getCourseTopic(themeId)
        }
    }, [themeId])

    return (
        <Layout
            buttonName="Повернутися до головної сторінки"
            title={!!singleCourse ? singleCourse.titles : null}
            type={TITLE_TYPES.COURSE}
        >
            <div className={styles.container}>
                <div className={styles.container_func}>
                    <div className={styles.container_navigation}>
                        <div className={styles.container_navigation_prev} onClick={() => navigate('/dashboard/courses/')}>Курс</div>
                        <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
                        <div className={styles.container_navigation_prev} onClick={() => navigate(`/dashboard/courses/${courseId}/theme`)}>Теми</div>
                        <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
                        <div className={styles.container_navigation__active}>Уроки</div>
                    </div>
                    <div className={styles.addQuiz}>
                        <button className={styles.addQuiz_btn} disabled={(topic?.lessons?.reduce((prev, curr) => (curr?.quizes?.length || 0) + prev, 0) || 0) >= MAX_QUIZ_AMOUNT || !topic?.lessons?.length} onClick={handleAddQuiz}>+ Додати quiz</button>
                        <div className={styles.addQuiz_counter}>{topic?.lessons?.reduce((prev, curr) => (curr?.quizes?.length || 0) + prev, 0) || 0}/{MAX_QUIZ_AMOUNT}</div>
                    </div>
                    <div className={styles.addQuiz}>
                        <button className={styles.addQuiz_btn} disabled={(topic?.lessons?.length || 0) >= MAX_LESSON_AMOUNT} onClick={handleAddLesson}>+ Додати урок</button>
                        <div className={styles.addQuiz_counter}>{topic?.lessons?.length || 0}/{MAX_LESSON_AMOUNT}</div>
                    </div>
                </div>

                {quizCreation && <QuizModal setActiveAdd={setCreateQuiz} />}

                {lessonCreation && <LessonModal setActiveAdd={setCreateLesson} />}

                {!!topic?.lessons?.length && <LessonsList lessons={topic.lessons} />}


            </div>
        </Layout>
    );
};

export default ThemeInfoPage;
