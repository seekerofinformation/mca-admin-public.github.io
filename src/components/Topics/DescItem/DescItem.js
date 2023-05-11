import React, {useState} from 'react';
import Edit from '../../../images/icons/edit.svg';

import styles from './DescItem.module.scss';
import DescriptionModal from "./DescriptionModal/DescriptionModal";

const DescItem = ({course}) => {
  const [edit, setEdit] = useState(false)

  const handleEditCourseDescriptionClick = () => {
    setEdit(true)
  }

    return edit ? <DescriptionModal course={course} handleClose={() => setEdit(false)} /> : (
      <div className={styles.theme_container}>
        <div className={styles.theme_container_names}>
          <div className={styles.theme_container_names__id}>Опис курсу</div>
          <>
            {course?.description?.map(description => (
                <div key={description.language + description.text} className={styles.theme_container_names__title}>
                  <span>{description.language.toUpperCase()}: </span>{description.text}
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

export default DescItem
