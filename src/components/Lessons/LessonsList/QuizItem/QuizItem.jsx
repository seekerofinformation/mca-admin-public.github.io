import React, { useState } from 'react';

import PageTitle from "../../../common/PageTitle/PageTitle";

import {TITLE_SIZES} from "../../../../constants/titleSizes";
import {TITLE_TYPES} from "../../../../constants/general";

import {useCoursesContext} from "../../../../context/coursesContext";

import Edit from "../../../../images/icons/edit.svg";
import Delete from "../../../../images/icons/delete.svg";

import styles from "./QuizItem.module.scss";
import {ENTITY_TYPES} from "../LessonsList";
import QuizModal from "./QuizModal/QuizModal";

const QuizItem = ({ quiz, onDelete }) => {
    const [edit, setEdit] = useState(false)

    return edit ? <QuizModal quiz={quiz} setActiveAdd={setEdit} /> : (
        <div className={styles.theme_container}>
            <div className={styles.theme_container_names}>
                <PageTitle titles={quiz?.titles} size={TITLE_SIZES.M} type={TITLE_TYPES.QUIZ} />
            </div>
            <div className={styles.theme_container_func}>
                <img src={Edit} alt="edit" className={styles.theme_container_func__img} data-id={quiz.id} onClick={() => setEdit(true)}/>
                <img src={Delete} alt="del" className={styles.theme_container_func__img} onClick={() => onDelete(quiz, ENTITY_TYPES.QUIZ)} />
            </div>
        </div>
    );
};

export default QuizItem;