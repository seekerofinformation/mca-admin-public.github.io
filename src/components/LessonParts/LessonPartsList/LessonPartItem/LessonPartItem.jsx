import React, {useState} from 'react';

import LessonPartsModal from "./LessonPartsModal/LessonPartsModal";

import Edit from "../../../../images/icons/edit.svg";
import Delete from "../../../../images/icons/delete.svg";

import styles from "./LessonPartItem.module.scss";

const LessonPartItem = ({ lessonPart, index, onDelete }) => {
    const [edit, setEdit] = useState(false);

    const handleEdit = () => setEdit(true);

    return edit ? <LessonPartsModal lessonPart={lessonPart} setEdit={setEdit} /> : (
        <div className={styles.lessonPartWrapper}>
            <p>Топік {index + 1}</p>
            <div className={styles.theme_container_func}>
                <img
                    src={Edit}
                    alt="edit"
                    className={styles.theme_container_func__img}
                    data-id={lessonPart.id}
                    onClick={handleEdit}
                />
                <img src={Delete} alt="del" className={styles.theme_container_func__img} onClick={onDelete} />
            </div>
        </div>
    );
};

export default LessonPartItem;