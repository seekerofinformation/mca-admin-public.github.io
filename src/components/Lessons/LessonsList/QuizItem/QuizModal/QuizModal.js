import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import InputField from "../../../../common/InputField/InputField";
import Button, {BUTTON_VARIANT} from "../../../../common/Button/Button";

import {useCoursesContext} from "../../../../../context/coursesContext";

import {MAX_QUIZ_QUESTION_AMOUNT, MAX_TITLE_SYMBOLS_AMOUNT, MODES} from "../../../../../constants/general";
import {COURSE_LANGUAGES} from "../../../../../constants/courses";

import {disabled} from "../../../../../utils/validate";
import {buildDefaultTitle, courseTextDataBuild} from "../../../../../utils/courseUtil";

import styles from "./QuizModal.module.scss";

const QuizModal = ({ quiz = null, setActiveAdd }) => {
  const navigate = useNavigate()
  const { courseId, themeId } = useParams();
  const { getCourse, getCourseTopic, singleCourse, addQuiz, editQuiz } = useCoursesContext();

  const mode = quiz?.id ? MODES.EDIT : MODES.CREATE;

  const [topic, setTopic] = useState(null);
  const [titleEng, setTitleEng] = useState(
      mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.EN) : quiz.titles.find(title => title.language === COURSE_LANGUAGES.EN)
  );
  const [titleUkr, setTitleUkr] = useState(
      mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.UA) : quiz.titles.find(title => title.language === COURSE_LANGUAGES.UA)
  );

  const handleGetTopic = async () => {
    setTopic(await getCourseTopic(themeId))
  }

  const handleCancel = () => {
    setActiveAdd(false)
  }

  const handleSaveQuiz = async () => {
    const titles = courseTextDataBuild(titleUkr, titleEng, singleCourse.language)
    const data = { titles, lesson: mode === MODES.CREATE ? (topic.lessons.at(-1).id || null) : quiz.lesson }

    handleCancel()

    return mode === MODES.CREATE ? await addQuiz(themeId, data) : await editQuiz(themeId, quiz.id, data);
  }

  const handleAddQuestion = async () => {
    const result = await handleSaveQuiz()

    navigate(`/dashboard/courses/${courseId}/theme/${themeId}/quiz/${mode === MODES.CREATE ? result.id : quiz.id}`)
  }

  const handleLessonUATitleChange = (value) => setTitleUkr(prevState => ({ ...prevState, text: value}));
  const handleLessonENTitleChange = (value) => setTitleEng(prevState => ({ ...prevState, text: value}));

  useEffect(() => {
    if (!!courseId) {
      getCourse(courseId)
    }
  }, [courseId])

  useEffect(() => {
    if (!!themeId) {
      handleGetTopic()
    }
  }, [themeId])

  return (
      <div className={styles.container_content}>
        <div className={styles.container_content_title}>Назва квіза</div>
        <InputField
            inputEng={titleEng.text}
            inputUkr={titleUkr.text}
            setInputEng={handleLessonENTitleChange}
            setInputUkr={handleLessonUATitleChange}
            courseLanguage={singleCourse?.language}
            symbol={MAX_TITLE_SYMBOLS_AMOUNT}
        />
        <div className={styles.buttons}>
          <div className={styles.contr}>
            <Button
                className={styles.buttons_button}
                onClick={handleSaveQuiz}
                disabled={disabled(singleCourse?.attributes?.lang, titleEng.text, titleUkr.text)}
            >
              Зберегти
            </Button>
            <Button
                className={styles.buttons_button}
                onClick={handleCancel}
                variant={BUTTON_VARIANT.SECONDARY}
            >
              Скасувати
            </Button>
          </div>
          <div className={styles.buttons_container_btn}>
            <button
                className={styles.buttons_container_btn__add}
                disabled={disabled(singleCourse?.language, titleEng.text, titleUkr.text)}
                onClick={handleAddQuestion}
            >
              + Додати питання
            </button>
          </div>
        </div>
      </div>
  );
};

export default QuizModal;