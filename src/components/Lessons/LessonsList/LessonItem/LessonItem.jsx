import React, {useState} from 'react';

import {ENTITY_TYPES} from "../LessonsList";
import LessonModal from "./LessonModal/LessonModal";
import PageTitle from "../../../common/PageTitle/PageTitle";

import {TITLE_SIZES} from "../../../../constants/titleSizes";
import {TITLE_TYPES} from "../../../../constants/general";

import Edit from "../../../../images/icons/edit.svg";
import Delete from "../../../../images/icons/delete.svg";

import styles from "./LessonItem.module.scss";

const LessonItem = ({ lesson, onDelete }) => {
    const [edit, setEdit] = useState(false)

    return edit ? <LessonModal lesson={lesson} setActiveAdd={setEdit} /> : (
        <div className={styles.theme_container}>
            <div className={styles.theme_container_names}>
                <PageTitle titles={lesson?.titles} size={TITLE_SIZES.M} type={TITLE_TYPES.LESSON} />
            </div>
            <div className={styles.theme_container_func}>
                <img src={Edit} alt="edit" className={styles.theme_container_func__img} data-id={lesson.id} onClick={() => setEdit(true)}/>
                <img src={Delete} alt="del" className={styles.theme_container_func__img} onClick={() => onDelete(lesson, ENTITY_TYPES.LESSON)} />
            </div>
        </div>
    );
};

export default LessonItem;