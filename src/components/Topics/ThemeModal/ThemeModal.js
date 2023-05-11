import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import InputField from '../../common/InputField/InputField';
import Button, {BUTTON_VARIANT} from "../../common/Button/Button";
import CheckInput, {CHECK_INPUT_TYPE} from "../../common/CheckInput/CheckInput";

import {MAX_TITLE_SYMBOLS_AMOUNT, MODES} from "../../../constants/general";
import { ADD_TYPES } from "../../../pages/TopicInfoPage/ThemeInfoPage";
import { COURSE_LANGUAGES, TOPIC_VARIANT } from "../../../constants/courses";

import {useCoursesContext} from "../../../context/coursesContext";

import { disabled } from '../../../utils/validate';
import {buildDefaultTitle, courseTextDataBuild} from "../../../utils/courseUtil";


import styles from './ThemeModal.module.scss';

const ThemeModal = (
    {
      mode = MODES.CREATE,
      topic = null,
      setActiveAdd
    }) => {

  const navigate = useNavigate();
  const { courseId, themeId } = useParams()

  const { singleCourse, addCourseTopic, editCourseTopic } = useCoursesContext();

  const [themeEng, setThemeEng] = useState(
      mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.EN) : topic.titles.find(title => title.language === COURSE_LANGUAGES.EN)
  );
  const [themeUkr, setThemeUkr] = useState(
      mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.UA) : topic.titles.find(title => title.language === COURSE_LANGUAGES.UA)
  );
  const [isChecked, setIsChecked] = useState(
      mode === MODES.CREATE ? TOPIC_VARIANT.PAID : topic.isFree ? TOPIC_VARIANT.FREE : TOPIC_VARIANT.PAID
  );

  const handleCancel = () => {
    setActiveAdd(false)
  }

  const handleSaveTopic = async () => {
    const titles = courseTextDataBuild(themeUkr, themeEng, singleCourse.language)
    const data = { titles, isFree: isChecked === TOPIC_VARIANT.FREE };

    handleCancel()

    if (mode === MODES.EDIT && JSON.stringify({ ...topic, ...data }) === JSON.stringify(topic)) {
      return
    }

    return mode === MODES.CREATE ? await addCourseTopic(courseId, data) : await editCourseTopic(courseId, topic.id, data);
  }

  const handleAddQuiz = async () => {
    const course = await handleSaveTopic();

    const topicId = mode === MODES.CREATE ? course.topics.at(-1).id : topic.id

    navigate(`/dashboard/courses/${courseId}/theme/${topicId}/info?createEntity=${ADD_TYPES.QUIZ}`);
  };

  const handleAddLesson = async () => {
    const course = await handleSaveTopic();

    const topicId = mode === MODES.CREATE ? course.topics.at(-1).id : topic.id

    navigate(`/dashboard/courses/${courseId}/theme/${topicId}/info?createEntity=${ADD_TYPES.LESSON}`);
  };

  const handleInputChange = (event) => setIsChecked(event.target.value);

  const handleThemeUATitleChange = (value) => setThemeUkr(prevState => ({ ...prevState, text: value}));
  const handleThemeENTitleChange = (value) => setThemeEng(prevState => ({ ...prevState, text: value}));

  return (
    <div className={styles.container_content}>
      <div className={styles.container_content_title}>Тема</div>
      <div className={styles.checkbox}>
        <CheckInput
            id={TOPIC_VARIANT.PAID}
            labelText={"Платна"}
            type={CHECK_INPUT_TYPE.RADIO}
            name='price'
            value={TOPIC_VARIANT.PAID}
            checked={isChecked === TOPIC_VARIANT.PAID}
            defaultChecked={isChecked === TOPIC_VARIANT.PAID}

            onChange={handleInputChange}
        />
        <div className={styles.checkbox_container}>
          <CheckInput
            type={CHECK_INPUT_TYPE.RADIO}
            name='price'
            value={TOPIC_VARIANT.FREE}
            id={TOPIC_VARIANT.FREE}
            checked={isChecked === TOPIC_VARIANT.FREE}
            defaultChecked={isChecked === TOPIC_VARIANT.FREE}
            labelText={"Безкоштовна"}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={styles.container_content_title}>Назва теми</div>
        <InputField
            symbol={MAX_TITLE_SYMBOLS_AMOUNT}
            setInputEng={handleThemeENTitleChange}
            setInputUkr={handleThemeUATitleChange}
            inputUkr={themeUkr?.text}
            inputEng={themeEng?.text}
            courseLanguage={!!singleCourse ? singleCourse.language : null}
        />
      <div className={styles.buttons}>
        <Button
          onClick={handleSaveTopic}
          className={styles.buttons_button}
          disabled={disabled(singleCourse?.language, themeEng?.text, themeUkr?.text)}
        >
          Зберегти
        </Button>
        <Button
            onClick={handleCancel}
            variant={BUTTON_VARIANT.SECONDARY}
            className={styles.buttons_button}
        >
          Скасувати
        </Button>
        <div className={styles.buttons_container}>
          <div className={styles.buttons_container_btn}>
            <button
              className={styles.buttons_container_btn__add}
              disabled={disabled(singleCourse?.language, themeEng?.text, themeUkr?.text)}
              onClick={handleAddLesson}
            >
              + Додати урок
            </button>
          </div>
          <div className={styles.buttons_container_btn}>
            <button
              disabled={disabled(singleCourse?.language, themeEng?.text, themeUkr?.text)}
              className={styles.buttons_container_btn__add}
              onClick={handleAddQuiz}
            >
              + Додати quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeModal
