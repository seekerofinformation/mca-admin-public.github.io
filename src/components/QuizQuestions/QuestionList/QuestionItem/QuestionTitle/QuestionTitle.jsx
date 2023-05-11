import React from 'react';
import Select from "react-select";

import InputField from "../../../../common/InputField/InputField";

import {COURSE_LANGUAGES} from "../../../../../constants/courses";

import styles from "./QuestionTitle.module.scss";
import {MAX_QUIZ_QUESTION_SYMBOLS_AMOUNT} from "../../../../../constants/general";

const QUIZ_TYPES = {
    MULTIPLE: "multiple",
    SINGLE: "single",
    OPEN: "open"
}

const QUESTION_TYPES = [
    {value: QUIZ_TYPES.SINGLE, label: 'Один зі списку'},
    {value: QUIZ_TYPES.MULTIPLE, label: 'Декілька зі списку'},
    {value: QUIZ_TYPES.OPEN, label: 'Поле для ввода відповіді'},
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

const QuestionTitle = ({ language, titles, onChangeHandlers, type }) => {

    return (
        <div className={styles.question}>
            <div className={styles.question_input}>
                <InputField
                    symbol={MAX_QUIZ_QUESTION_SYMBOLS_AMOUNT}
                    setInputEng={onChangeHandlers.EN}
                    setInputUkr={onChangeHandlers.UA}
                    inputEng={titles.find(title => title.language === COURSE_LANGUAGES.EN)?.text}
                    inputUkr={titles.find(title => title.language === COURSE_LANGUAGES.UA)?.text}
                    courseLanguage={language}
                />
            </div>
            <div className={styles.question_select}>
                <Select
                    styles={selectStyles}
                    options={QUESTION_TYPES}
                    defaultValue={QUESTION_TYPES.find(qType => qType.value === type)}
                    onChange={(e) => onChangeHandlers.TYPE(e.value)}
                />
            </div>
        </div>
    );
};

export default QuestionTitle;