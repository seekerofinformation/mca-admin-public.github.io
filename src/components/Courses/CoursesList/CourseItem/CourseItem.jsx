import React, {useState} from 'react';

import PageTitle from "../../../common/PageTitle/PageTitle";
import ToggleSwitch from "../../../common/ToggleSwitch/ToggleSwitch";

import Edit from "../../../../images/icons/edit.svg";
import Delete from "../../../../images/icons/delete.svg";

import styles from "../../../../pages/CoursesPage/CoursesPage.module.scss";
import {useCoursesContext} from "../../../../context/coursesContext";

const CourseItem = ({ id, titles, published, onEdit, onDelete }) => {
    const { editCourse } = useCoursesContext();

    const [checked, setPublished] = useState(published);

    const onChange = async (value) => {
        setPublished(value);
        await editCourse(id, { is_published: value })
    }

    return (
        <div className={styles.list_container}>
            <div className={styles.list_item}>
                <div className={styles.list_item_title}>
                    <PageTitle titles={titles} />
                </div>
                <div className={styles.controls}>
                    <ToggleSwitch checked={checked} onChange={onChange} name={"published"} />
                    <div className={styles.list_item_func}>
                        <img
                            className={styles.list_item_func__img}
                            src={Edit}
                            onClick={() => onEdit(id)}
                            alt="Edit"
                        />
                        <img
                            className={styles.list_item_func__img}
                            src={Delete}
                            onClick={() => onDelete({ id, titles, published })}
                            alt="Delete"
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CourseItem;