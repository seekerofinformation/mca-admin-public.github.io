import clsx from "clsx";
import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";

import {useCoursesContext} from "../../../../../context/coursesContext";

import QuestionTitle from "../QuestionTitle/QuestionTitle";
import QuestionAnswer from "../QuestionAnswer/QuestionAnswer"
import Button, {BUTTON_VARIANT} from "../../../../common/Button/Button";

import {MODES} from "../../../../../constants/general";
import {QUIZ_TYPES} from "../../QuestionList";
import {COURSE_LANGUAGES} from "../../../../../constants/courses";

import {buildDefaultQuizAnswer, buildDefaultTitle, courseTextDataBuild} from "../../../../../utils/courseUtil";

import styles from './QuestionModal.module.scss';
import {disabled, hasQuestionAnswersCorrectAnswer, questionAnswersLengthCorrect} from "../../../../../utils/validate";

const QuestionModal = ({ question = null, setActiveAdd }) => {
    const { courseId, quizId } = useParams();
    const { getCourse, singleCourse, addQuizQuestion, editQuizQuestion } = useCoursesContext();

    const mode = question?.id ? MODES.EDIT : MODES.CREATE;

    const [questionEng, setQuestionEng] = useState(
        mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.EN) : question?.titles?.find(title => title.language === COURSE_LANGUAGES.EN)
    );
    const [questionUkr, setQuestionUkr] = useState(
        mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.UA) : question?.titles?.find(title => title.language === COURSE_LANGUAGES.UA)
    );
    const [quizType, setQuizType] = useState(mode === MODES.CREATE ? QUIZ_TYPES.SINGLE : question?.type);

    const [quizAnswers, setQuizAnswers] = useState([])

    const [isDisabled, setDisabled] = useState(false)

    const handleCancel = (e) => {
        setActiveAdd(false);
    };

    const handleSave = async () => {
        handleCancel()

        const data = { titles: courseTextDataBuild(questionUkr, questionEng, singleCourse.language), answers: quizAnswers, type: quizType }
        mode === MODES.CREATE ? await addQuizQuestion(quizId, data) : await editQuizQuestion(quizId, question.id, data)
    };

    const handleQuestionUATitleChange = (value) => setQuestionUkr(prevState => ({ ...prevState, text: value}));
    const handleQuestionENTitleChange = (value) => setQuestionEng(prevState => ({ ...prevState, text: value}));

    const handleQuestionTypeChange = (type) => {
        if (quizType === QUIZ_TYPES.OPEN && type !== QUIZ_TYPES.OPEN) {
            setQuizAnswers(mode === MODES.EDIT ? question.answers : [buildDefaultQuizAnswer(singleCourse.language)])
        }
        if (type === QUIZ_TYPES.OPEN) {
            setQuizAnswers([buildDefaultQuizAnswer(singleCourse.language)])
        }
        if (type === QUIZ_TYPES.SINGLE) {
            setQuizAnswers(prev => prev.map(answer => ({ ...answer, isCorrect: false })))
        }
        setQuizType(type)
    }

    const handleAnswerCorrectStatusChange = (e, id) => {
        let updAnswers = [];

        if (quizType === QUIZ_TYPES.SINGLE) {
            updAnswers = quizAnswers?.map(answer => {
                return (answer.id === id || answer.group_id === id) ? {...answer, correct: true} : { ...answer, correct: false }
            })
        } else {
            updAnswers = quizAnswers?.map(answer => {
                return (answer.id === id  || answer.group_id === id)  ? {...answer, correct: e.target.checked} : answer
            })
        }

        setQuizAnswers(updAnswers)
    };

    const handleAnswerTitleChange = (text, id, language) => {
        const updTitles = quizAnswers?.find(answer => answer?.id === id)?.titles?.map(title => {
            return title.language === language ? { ...title, text } : title
        })

        const updAnswers = quizAnswers?.map(answer => {
            return answer?.id === id ? {...answer, titles: updTitles} : answer
        })

        setQuizAnswers(updAnswers)
    }

    const handleAdd = () => {
        if (quizType !== QUIZ_TYPES.OPEN) {
            setQuizAnswers(prevState => [...prevState, buildDefaultQuizAnswer(singleCourse?.language)]);
        }
    };

    const handleDeleteAnswer = (id) => {
        setQuizAnswers(prevState => prevState.filter(answer => !answer?.id ? answer.group_id !== id : answer.id !== id))
    }

    const handleDisableSaveButton = () => {
        const isDisabledByTitle = disabled(singleCourse.language, questionEng.text, questionUkr.text);
        const isDisabledByAnswerTitle = quizAnswers
            .map(({ titles }) =>
                disabled(singleCourse.language, titles?.find(title => title.language === COURSE_LANGUAGES.EN)?.text, titles?.find(title => title.language === COURSE_LANGUAGES.UA)?.text)
            ).find(value => value === true)

        const isDisabledByAnswerLength = questionAnswersLengthCorrect(quizAnswers.length, quizType)
        const isDisabledByCorrectAnswerMarked = hasQuestionAnswersCorrectAnswer(quizAnswers, quizType);

        console.log(isDisabledByCorrectAnswerMarked)

        setDisabled(isDisabledByTitle || isDisabledByAnswerTitle || isDisabledByAnswerLength || isDisabledByCorrectAnswerMarked)
    }

    useEffect(() => {
        handleDisableSaveButton()
    }, [questionEng, questionUkr, quizAnswers])

    useEffect(() => {
        if (!!courseId) {
            getCourse(courseId)
            setQuizAnswers(
                mode === MODES.CREATE ? [buildDefaultQuizAnswer(singleCourse?.language)] : question?.answers
            )
        }
    }, [courseId])

    return (
        <div className={styles.container}>
            <div className={styles.container_content}>
                <div>Питання</div>
                <QuestionTitle
                    type={quizType}
                    titles={[questionEng, questionUkr]}
                    language={singleCourse?.language}
                    onChangeHandlers={{
                        EN: handleQuestionENTitleChange,
                        UA: handleQuestionUATitleChange,
                        TYPE: handleQuestionTypeChange
                    }}
                />

                {quizAnswers.map((answer, index) => <QuestionAnswer
                        key={answer.id || answer.group_id || index + 1}
                        answer={answer}
                        index={index}
                        type={quizType}
                        language={singleCourse?.language}
                        onDelete={handleDeleteAnswer}
                        onTitleChange={handleAnswerTitleChange}
                        onCorrectChange={handleAnswerCorrectStatusChange}
                    />
                )}
                <button
                    className={clsx(styles.option, (quizType === QUIZ_TYPES.OPEN || quizAnswers.length >= 5) && styles.disabled)}
                    disabled={(quizType === QUIZ_TYPES.OPEN || quizAnswers.length >= 5)}
                    onClick={handleAdd}>
                    + Новий варіант
                </button>
                <div className={styles.buttons}>
                    <Button
                        className={styles.buttons_button}
                        onClick={handleSave}
                        disabled={isDisabled}
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
            </div>
        </div>
    );
};

export default QuestionModal;