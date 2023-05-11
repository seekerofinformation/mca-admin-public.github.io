import React, {useState} from 'react';

import QuestionModal from "./QuestionModal/QuestionModal";
import PageTitle from "../../../common/PageTitle/PageTitle";

import {TITLE_SIZES} from "../../../../constants/titleSizes";
import {TITLE_TYPES} from "../../../../constants/general";

import Edit from "../../../../images/icons/edit.svg";
import Delete from "../../../../images/icons/delete.svg";

import styles from "./QuestionItem.module.scss";

const QuestionItem = ({ question, onDelete }) => {
    const [edit, setEdit] = useState(false)

    return edit ? <QuestionModal question={question} setActiveAdd={setEdit} /> : (
        <div className={styles.theme_container}>
            <div className={styles.theme_container_names}>
                <PageTitle titles={question?.titles} size={TITLE_SIZES.M} type={TITLE_TYPES.QUESTION} />
            </div>
            <div className={styles.theme_container_func}>
                <img src={Edit} alt="edit" className={styles.theme_container_func__img} data-id={question.id} onClick={() => setEdit(true)}/>
                <img src={Delete} alt="del" className={styles.theme_container_func__img} onClick={() => onDelete(question)} />
            </div>
        </div>
    );
};

export default QuestionItem;