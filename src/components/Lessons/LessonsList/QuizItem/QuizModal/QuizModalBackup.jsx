import React, { useState, useEffect } from 'react';
import TextAreaField from '../../../../common/TextAreaField/TextAreaField';
import LanguageBox from '../../../../common/LanguageBox/LanguageBox';
import clsx from 'clsx';
import Select from 'react-select';
import InputField from '../../../../common/InputField/InputField';
import { useGetCourseQuery } from '../../../../../store/Courses/courseName.api';
import { useGetThemesQuery } from '../../../../../store/Courses/themes.api';
import {useNavigate, useParams} from "react-router-dom";
import {useCoursesContext} from "../../../../../context/coursesContext";
import {MODES} from "../../../../../constants/general";
import {COURSE_LANGUAGES} from "../../../../../constants/courses";
import {buildDefaultQuizAnswer, buildDefaultTitle} from "../../../../../utils/courseUtil";

import styles from './QuizModal.module.scss';

export const QUIZ_TYPES = {
    MULTIPLE: "MULTIPLE",
    SINGLE: "SINGLE",
    INPUT: "INPUT"
}

const quizDefaultValue = {
    titles: [{ language: COURSE_LANGUAGES.EN, text: "" }, { language: COURSE_LANGUAGES.UA, text: "" }],
    type: QUIZ_TYPES.SINGLE,
    answers: {
        1: [{ language: COURSE_LANGUAGES.EN, text: "", }, { language: COURSE_LANGUAGES.UA, text: "" }]
    }
}

const QuizModal = ({ quiz = null, setActiveAdd }) => {
    const navigate = useNavigate()
    const { courseId, topicId } = useParams();
    const { getCourse, getCourseTopic, singleCourse } = useCoursesContext();

    const mode = quiz?.id ? MODES.EDIT : MODES.CREATE;

    const [topic, setTopic] = useState(null);

    const {data: course} = useGetCourseQuery();
    const {data: theme} = useGetThemesQuery();
    const [selected, setSelected] = useState('one');

    const [questionEng, setQuestionEng] = useState(
        mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.EN) : quiz.titles.find(title => title.language === COURSE_LANGUAGES.EN)
    );
    const [questionUkr, setQuestionUkr] = useState(
        mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.UA) : quiz.titles.find(title => title.language === COURSE_LANGUAGES.UA)
    );
    const [quizType, setQuizType] = useState(mode === MODES.CREATE ? QUIZ_TYPES.SINGLE : quiz.type);

    const [quizAnswers, setQuizAnswers] = useState(
        mode === MODES.CREATE ? [ [buildDefaultQuizAnswer(), buildDefaultQuizAnswer(COURSE_LANGUAGES.EN)] ] : quiz.answers
    )
    const [fields, setFields] = useState([
        {
            key: crypto.randomUUID(),
            ukr: '',
            eng: ''
        }
    ]);

    const options = [
        {value: 'one', label: 'Один зі списку'},
        {value: 'some', label: 'Декількома зі списку'},
        {value: 'input', label: 'Поле для ввода відповіді'},
    ];

    const selectStyles = {
        control: (base) => ({
            ...base,
            fontSize: '14px',
            fontWeight: '400',
            borderRadius: '10px',
            background: '#F6F6F6',
            border: 'none',
            boxShadow: 'none',
            '&:focus': {
                border: '0 !important',
            },
        }),
        input: (baseStyles) => ({
            ...baseStyles,
            color: 'transparent'
        })
    }

    const handleChangeSelect = (e) => {
        setSelected(e);
    };

    const handleSave = () => {
        setActiveAdd(false);
    };

    const handleChange = (key, type, e) => {
        const values = fields.map((item) => {
            if (item.key === key)
                return {
                    ...item,
                    [type]: e.target.value
                };

            return item;
        });
        setFields(values);
    };

    const handleAdd = () => {
        setFields([...fields, { key: crypto.randomUUID(), ukr: "", eng: "" }]);
    };

    const handleGetTopic = async () => {
        setTopic(await getCourseTopic(topicId))
    }

    useEffect(() => {
        if (!!courseId) {
            getCourse()
        }
    }, [courseId])

    useEffect(() => {
        if (!!topicId) {
            handleGetTopic()
        }
    }, [topicId])

    return (
        <div className={styles.container}>
            <div className={styles.container_content}>
                <div className={styles.container_content_title}>
                    {
                        course?.attributes?.lang === 'UKR_ENG' || course?.attributes?.lang === 'UKR' ?
                            theme && theme[theme.length-1]?.attributes?.themeUkr :
                            theme && theme[theme.length-1]?.attributes?.themeEng
                    }
                </div>
                <div>Питання 1</div>
                <div className={styles.question}>
                    <div className={styles.question_input}>
                        <InputField
                            symbol={500}
                            setInputEng={setQuestionEng}
                            setInputUkr={setQuestionUkr}
                            inputEng={questionEng}
                            inputUkr={questionUkr}
                            languageState={course?.attributes?.lang}
                        />
                    </div>
                    <div className={styles.question_select}>
                        <Select
                            options={options}
                            defaultValue={options[0]}
                            styles={selectStyles}
                            onChange={(e) => handleChangeSelect(e.value)}
                        />
                    </div>
                </div>
                {fields.map(({ key, ukr, eng }, idx) => (
                        <div key={key} className={styles.addQuiz}>
                            {course?.attributes?.lang === "UKR_ENG" && (
                                <div className={styles.inputs}>
                                    <div className={styles.inputs_data}>
                                        <LanguageBox lang='UKR' />
                                        <TextAreaField
                                            value={ukr}
                                            autoHeight
                                            onChange = {(e) => handleChange(key, 'ukr', e)}
                                            maxLength={500}
                                            className={styles.inputs_textarea}
                                        />
                                        <label>{`${500-ukr.length}`}</label>
                                    </div>
                                    <div className={styles.inputs_data}>
                                        <LanguageBox lang='ENG' />
                                        <TextAreaField
                                            value={eng}
                                            autoHeight
                                            onChange = {(e) => handleChange(key, 'eng', e)}
                                            className={styles.inputs_textarea}
                                            maxLength={500}
                                        />
                                        <label>{`${500-eng.length}`}</label>
                                    </div>
                                </div>
                            )}
                            {course?.attributes?.lang !== 'UKR_ENG' && (
                                <div className={styles.inputs}>
                                    <div className={styles.inputs_data}>
                                        <LanguageBox lang={course?.attributes?.lang === 'UKR' ? 'UKR' : 'ENG'} />
                                        {course?.attributes?.lang === 'UKR' && (
                                            <TextAreaField
                                                autoHeight
                                                value={ukr}
                                                onChange={(e) => handleChange(key, 'ukr', e)}
                                                className={styles.inputs_textarea}
                                                maxLength={500}
                                            />
                                        )}
                                        {course?.attributes.lang === 'ENG' && (
                                            <TextAreaField
                                                value={eng}
                                                maxLength={500}
                                                autoHeight
                                                onChange={(e) => handleChange(key, 'eng', e)}
                                                className={styles.inputs_textarea}
                                            />
                                        )}
                                        <label>{course?.attributes?.lang === 'UKR' ? `${500-ukr.length}` : `${500-eng.length}`}</label>
                                    </div>
                                </div>
                            )}
                            {selected === 'some' && (
                                <label className={clsx(styles.answer_checkbox)}>
                                    <input className={styles.answer_checkbox_input} type="checkbox" id="true" name="true"  />
                                    <div className={styles.answer_checkbox_input_icon}></div>
                                    Правильний
                                </label>
                            )}
                            {selected === 'one' && (
                                <label className={clsx(styles.answer_checkbox)}>
                                    <input type="radio" name='choose' className={styles.answer_checkbox_input} />
                                    <div className={styles.answer_checkbox_input_icon}></div>
                                    Правильний
                                </label>
                            )}
                        </div>
                    )
                )}
                <div className={styles.option} onClick={() => handleAdd()}>
                    + Новий варіант
                </div>
                <div className={styles.buttons}>
                    <button className={styles.buttons_button} onClick={() => handleSave()} >
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizModal;
