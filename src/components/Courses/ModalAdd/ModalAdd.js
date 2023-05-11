import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../common/Modal/Modal';
import InputField from '../../common/InputField/InputField';

import {COURSE_LANGUAGES} from "../../../constants/courses";
import {MAX_TITLE_SYMBOLS_AMOUNT} from "../../../constants/general";

import { disabled } from '../../../utils/validate';
import { courseTextDataBuild } from "../../../utils/courseUtil";

import CoursesService from "../../../services/coursesService";

import styles from './ModalAdd.module.scss';

const ModalAdd = ({active, setActive}) => {
  const [courseNameEng, setCourseNameEng] = useState({ language: COURSE_LANGUAGES.EN, text: "" });
  const [courseNameUkr, setCourseNameUkr] = useState({ language: COURSE_LANGUAGES.UA, text: "" });
  const [languageState, setLanguageState] = useState(COURSE_LANGUAGES.UA);

  const navigate = useNavigate();

  const languageStateHandler=(event)=>{
    setLanguageState(event.target.value);
  };

  const handleSave = async () => {
      const courses = await CoursesService.addCourse(
          {
              titles: courseTextDataBuild(courseNameUkr, courseNameEng, languageState),
              language: languageState
          }
      )

      setActive(prev => !prev);

      if (!!courses) {
        navigate(`/dashboard/courses/${courses?.at(-1).id}/theme/`);
      }
  };

    const handleCourseUATitleChange = (value) => setCourseNameUkr(prevState => ({ ...prevState, text: value}));
    const handleCourseENTitleChange = (value) => setCourseNameEng(prevState => ({ ...prevState, text: value}));

  return (
    <Modal active={active} close={() => setActive(false)}>
        <div className={styles.edit}>
        <div className={styles.edit_container}>
          <div className={styles.edit_container_title}>Створення курсу</div>
          <p className={styles.edit_container_description}>Назва курсу</p>
          <div className={styles.edit_container_radio} id="radioinp">
            <div className={styles.edit_container_radio_group}>
                <input
                type="radio" id="contactChoice1"
                name="contact" value={COURSE_LANGUAGES.UA}
                onChange={languageStateHandler}
                defaultChecked
                />
                <label htmlFor="contactChoice1">UKR</label>
            </div>
            <div className={styles.edit_container_radio_group}>
                <input
                type="radio" id="contactChoice2"
                name="contact" value={COURSE_LANGUAGES.EN}
                onChange={languageStateHandler}
                />
                <label htmlFor="contactChoice2">ENG</label>
            </div>
            <div className={styles.edit_container_radio_group}>
                <input
                type="radio" id="contactChoice3"
                name="contact" value={COURSE_LANGUAGES.EN_UA}
                onChange={languageStateHandler}
                />
                <label htmlFor="contactChoice3">UKR i ENG</label>
            </div>
          </div>
          <InputField
            setInputEng={handleCourseENTitleChange}
            setInputUkr={handleCourseUATitleChange}
            inputEng={courseNameEng.text}
            inputUkr={courseNameUkr.text}
            courseLanguage={languageState}
            symbol={MAX_TITLE_SYMBOLS_AMOUNT}
          />
          <div className={styles.edit_button}>
            <button
              className={styles.edit_button_add}
              disabled={disabled(languageState, courseNameEng.text, courseNameUkr.text)}
              onClick={handleSave}
            >
              Створити
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalAdd;
