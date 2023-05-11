import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import InputField from "../../../../common/InputField/InputField";
import Button, {BUTTON_VARIANT} from "../../../../common/Button/Button";

import {useCoursesContext} from "../../../../../context/coursesContext";

import {COURSE_LANGUAGES} from "../../../../../constants/courses";
import {MAX_LESSON_PARTS_AMOUNT, MAX_TITLE_SYMBOLS_AMOUNT, MODES} from "../../../../../constants/general";

import {disabled} from "../../../../../utils/validate";
import {buildDefaultTitle, courseTextDataBuild} from "../../../../../utils/courseUtil";

import styles from "./LessonModal.module.scss";

const LessonModal = ({ lesson = null, setActiveAdd }) => {
    const navigate = useNavigate()
    const { courseId, themeId } = useParams();
    const { getCourse, getCourseTopic, singleCourse, addLesson, editLesson } = useCoursesContext();

    const mode = lesson?.id ? MODES.EDIT : MODES.CREATE;

    const [topic, setTopic] = useState(null);
    const [titleEng, setTitleEng] = useState(
        mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.EN) : lesson?.titles?.find(title => title.language === COURSE_LANGUAGES.EN)
    );
    const [titleUkr, setTitleUkr] = useState(
        mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.UA) : lesson?.titles?.find(title => title.language === COURSE_LANGUAGES.UA)
    );

    const handleGetTopic = async () => {
        setTopic(await getCourseTopic(themeId))
    }

    const handleCancel = () => {
        setActiveAdd(false)
    }

    const handleSaveLesson = async () => {
        const titles = courseTextDataBuild(titleUkr, titleEng, singleCourse.language)
        const data = { titles, quizes: mode === MODES.CREATE ? null : topic.quiz }

        handleCancel()

        return mode === MODES.CREATE ? await addLesson(themeId, data) : await editLesson(themeId, lesson.id, data);
    }

    const handleLessonPartCreate = async () => {
        let lessonEntity = lesson;
        if (mode === MODES.CREATE) {
            lessonEntity = await handleSaveLesson();
        } else {
            await handleSaveLesson()
        }

        navigate(`/dashboard/courses/${courseId}/theme/${themeId}/lessons/${lessonEntity?.id}`)
    }

    const handleLessonUATitleChange = (value) => setTitleUkr(prevState => ({ ...prevState, text: value}));
    const handleLessonENTitleChange = (value) => setTitleEng(prevState => ({ ...prevState, text: value}));

    useEffect(() => {
        if (!!courseId) {
            getCourse(courseId)
        }
    }, [courseId])

    useEffect(() => {
        if (!!themeId) {
            handleGetTopic()
        }
    }, [themeId])

    return (
        <div className={styles.container_content}>
            <div className={styles.container_content_title}>Назва уроку</div>
            <InputField
                inputEng={titleEng?.text}
                inputUkr={titleUkr?.text}
                setInputEng={handleLessonENTitleChange}
                setInputUkr={handleLessonUATitleChange}
                courseLanguage={singleCourse?.language}
                symbol={MAX_TITLE_SYMBOLS_AMOUNT}
            />
            <div className={styles.buttons}>
                <div className={styles.contr}>
                    <Button
                        className={styles.buttons_button}
                        onClick={handleSaveLesson}
                        disabled={disabled(singleCourse?.language, titleEng?.text, titleUkr?.text)}
                    >
                        Зберегти
                    </Button>
                    <Button
                        className={styles.buttons_button}
                        onClick={handleCancel}
                        variant={BUTTON_VARIANT.SECONDARY}
                    >
                        Скасувати
                    </Button>
                </div>
                <div className={styles.buttons_container_btn}>
                    <button
                        className={styles.buttons_container_btn__add}
                        disabled={disabled(singleCourse?.language, titleEng?.text, titleUkr?.text)}
                        onClick={handleLessonPartCreate}
                    >
                        + Додати топік
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonModal;