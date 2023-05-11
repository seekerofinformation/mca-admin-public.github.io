import React from 'react';

import CheckInput, {CHECK_INPUT_TYPE} from "../../../../common/CheckInput/CheckInput";

import { QUIZ_TYPES } from "../../QuestionList";

import styles from "./QuestionAnswer.module.scss"
import InputField from "../../../../common/InputField/InputField";
import {COURSE_LANGUAGES} from "../../../../../constants/courses";
import Delete from "../../../../../images/icons/delete.svg";
import {MAX_QUIZ_ANSWER_SYMBOLS_AMOUNT} from "../../../../../constants/general";

const QuestionAnswer = ({ language, answer, type, onTitleChange, onCorrectChange, index, onDelete }) => {
    console.log(answer)
    return (
        <div>
            <p className={styles.answerCount}>Відповідь {index + 1}</p>
            <div className={styles.addQuiz}>
                <div className={styles.question}>
                    <div className={styles.question_input}>
                        <InputField
                            symbol={MAX_QUIZ_ANSWER_SYMBOLS_AMOUNT}
                            setInputEng={(value) => onTitleChange(value, answer?.id, COURSE_LANGUAGES.EN)}
                            setInputUkr={(value) => onTitleChange(value, answer?.id, COURSE_LANGUAGES.UA)}
                            inputEng={answer?.titles.find(title => title.language === COURSE_LANGUAGES.EN)?.text}
                            inputUkr={answer?.titles.find(title => title.language === COURSE_LANGUAGES.UA)?.text}
                            courseLanguage={language}
                        />
                    </div>
                </div>

                <div className={styles.theme_container_func}>
                    {type !== QUIZ_TYPES.OPEN && <CheckInput
                        type={type === QUIZ_TYPES.SINGLE ? CHECK_INPUT_TYPE.RADIO : CHECK_INPUT_TYPE.CHECKBOX}
                        checked={answer?.correct || answer?.isCorrect}
                        // defaultChecked={answer?.correct || answer?.isCorrect}
                        labelText={"Правильний"}
                        id={`answer${index}`}
                        name={"qAnswer"}
                        onChange={(event) => onCorrectChange(event, answer.id || answer.group_id)}
                    />
                    }
                    {type !== QUIZ_TYPES.OPEN && <img src={Delete} alt="del" className={styles.theme_container_func__img} onClick={() => onDelete(answer?.id || answer?.group_id)} />}
                </div>
            </div>
        </div>

    );
};

export default QuestionAnswer;