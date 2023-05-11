import React, { useState } from 'react';

import InputField from "../../../common/InputField/InputField";
import Button, {BUTTON_VARIANT} from "../../../common/Button/Button";

import {disabled} from "../../../../utils/validate";
import { courseTextDataBuild } from "../../../../utils/courseUtil";

import { useCoursesContext } from "../../../../context/coursesContext";

import {COURSE_LANGUAGES} from "../../../../constants/courses";

import styles from "./CourseNameModal.module.scss";
import {MAX_TITLE_SYMBOLS_AMOUNT} from "../../../../constants/general";

const CourseNameModal = ({ course, handleClose }) => {
    const { editCourse } = useCoursesContext();

    const [titlesEng, setTitleEng] = useState(course?.titles?.find(title => title.language === COURSE_LANGUAGES.EN));
    const [titlesUkr, setTitleUkr] = useState(course?.titles?.find(title => title.language === COURSE_LANGUAGES.UA));

    const handleUATitleChange = (value) => setTitleUkr(prevState => ({ ...prevState, text: value}));
    const handleENTitleChange = (value) => setTitleEng(prevState => ({ ...prevState, text: value}));

    const handleTitleSave = async () => {
        await editCourse(course.id, { titles: courseTextDataBuild(titlesUkr, titlesEng, course.language) })
        handleClose()
    }

    return (
        <div className={styles.container_content}>
            <div className={styles.container_content_title}>Опис курсу</div>
            <InputField
                symbol={MAX_TITLE_SYMBOLS_AMOUNT}
                setInputEng={handleENTitleChange}
                setInputUkr={handleUATitleChange}
                inputUkr={titlesUkr?.text}
                inputEng={titlesEng?.text}
                courseLanguage={!!course ? course.language : null}
            />
            <div className={styles.buttons}>
                <Button
                    className={styles.container_button}
                    onClick={handleTitleSave}
                    disabled={disabled(course?.language, titlesEng?.text, titlesUkr?.text)}
                >
                    Зберегти
                </Button>
                <Button
                    className={styles.container_button}
                    variant={BUTTON_VARIANT.SECONDARY}
                    onClick={handleClose}
                >
                    Скасувати
                </Button>
            </div>

        </div>
    );
};

export default CourseNameModal;