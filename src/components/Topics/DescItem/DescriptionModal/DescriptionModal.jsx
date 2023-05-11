import React, { useState } from 'react';

import InputField from "../../../common/InputField/InputField";
import Button, {BUTTON_VARIANT} from "../../../common/Button/Button";

import {disabled} from "../../../../utils/validate";
import {buildDefaultTitle, courseTextDataBuild} from "../../../../utils/courseUtil";

import {useCoursesContext} from "../../../../context/coursesContext";

import {MAX_DESCRIPTION_SYMBOLS_AMOUNT, MODES} from "../../../../constants/general";
import {COURSE_LANGUAGES} from "../../../../constants/courses";

import styles from "./DescriptionModal.module.scss";

const DescriptionModal = ({ course, handleClose }) => {
    const mode = course?.description?.length ? MODES.EDIT : MODES.CREATE

    const { addCourseDescription, editCourseDescription } = useCoursesContext();

    const [descriptionEng, setDescriptionEng] = useState(
        mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.EN) : course.description.find(title => title.language === COURSE_LANGUAGES.EN)
    );
    const [descriptionUkr, setDescriptionUkr] = useState(
        mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.UA) : course.description.find(title => title.language === COURSE_LANGUAGES.UA)
    );

    const handleDescriptionUATitleChange = (value) => setDescriptionUkr(prevState => ({ ...prevState, text: value}));
    const handleDescriptionENTitleChange = (value) => setDescriptionEng(prevState => ({ ...prevState, text: value}));

    const handleDescriptionSave = async () => {
        mode === MODES.CREATE
            ?
            await addCourseDescription(course.id, { description: courseTextDataBuild(descriptionUkr, descriptionEng, course.language) })
            :
            await course.description.forEach(async oldDescription => {
                await editCourseDescription(course.id, oldDescription.id, {
                    id: oldDescription.id,
                    language: oldDescription.language,
                    description: oldDescription.language === COURSE_LANGUAGES.EN ? descriptionEng.text : descriptionUkr.text
                })
            })
        handleClose()
    }

    return (
        <div className={styles.container_content}>
            <div className={styles.container_content_title}>Опис курсу</div>
            <InputField
                symbol={MAX_DESCRIPTION_SYMBOLS_AMOUNT}
                setInputEng={handleDescriptionENTitleChange}
                setInputUkr={handleDescriptionUATitleChange}
                inputUkr={descriptionUkr?.text}
                inputEng={descriptionEng?.text}
                courseLanguage={!!course ? course.language : null}
            />
            <div className={styles.buttons}>
                <Button
                    className={styles.container_button}
                    onClick={handleDescriptionSave}
                    disabled={disabled(course?.language, descriptionEng?.text, descriptionUkr?.text)}
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

export default DescriptionModal;