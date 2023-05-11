import React, {useState} from 'react';

import CourseNameModal from "./CourseNameModal/CourseNameModal";

import Edit from '../../../images/icons/edit.svg';

import styles from './CourseNameItem.module.scss';

const CourseNameItem = ({course}) => {
    const [edit, setEdit] = useState(false)

    const handleEditCourseDescriptionClick = () => {
        setEdit(true)
    }

    return edit ? <CourseNameModal course={course} handleClose={() => setEdit(false)} /> : (
        <div className={styles.theme_container}>
            <div className={styles.theme_container_names}>
                <div className={styles.theme_container_names__id}>Назва курсу</div>
                <>
                    {course?.titles?.map(title => (
                        <div key={title.language + title.text} className={styles.theme_container_names__title}>
                            <span>{title.language.toUpperCase()}: </span>{title.text}
                        </div>
                    ))}
                </>
            </div>
            <div className={styles.theme_container_func}>
                <img src={Edit} alt="edit" className={styles.theme_container_func__img} onClick={handleEditCourseDescriptionClick}/>
            </div>
        </div>
    )
}

export default CourseNameItem
