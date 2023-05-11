import React from 'react';

import LanguageBox from '../LanguageBox/LanguageBox';
import TextAreaField from '../TextAreaField/TextAreaField';

import {COURSE_LANGUAGES} from "../../../constants/courses";

import styles from './InputField.module.scss';

const InputField = (
    {
      courseLanguage,
      inputUkr = "",
      setInputUkr,
      inputEng = "",
      setInputEng,
      symbol=500
    }) => {

  return (
    <div className={styles.container}>
      {courseLanguage === COURSE_LANGUAGES.EN_UA ? (
        <div className={styles.inputs}>
          <div className={styles.inputs_data}>
              <LanguageBox lang={COURSE_LANGUAGES.UA} />
              <TextAreaField
                value={inputUkr}
                autoHeight
                onChange = {(event) => setInputUkr(event.target.value)}
                maxLength={symbol}
                className={styles.inputs_textarea}
              />
              <label>{`${symbol-inputUkr?.length}`}</label>
          </div>
          <div className={styles.inputs_data}>
              <LanguageBox lang={COURSE_LANGUAGES.EN} />
              <TextAreaField
                value={inputEng}
                autoHeight
                onChange = {(event) => setInputEng(event.target.value)}
                className={styles.inputs_textarea}
                maxLength={symbol}
              />
              <label>{`${symbol-inputEng?.length}`}</label>
          </div>
        </div>
      ) : (
        <div className={styles.inputs}>
          <div className={styles.inputs_data}>
              <LanguageBox lang={courseLanguage} />
              {courseLanguage === COURSE_LANGUAGES.UA && (
                <TextAreaField
                  autoHeight
                  value={inputUkr}
                  onChange={(event) => setInputUkr(event.target.value)}
                  className={styles.inputs_textarea}
                  maxLength={symbol}
                />
              )}
              {courseLanguage === COURSE_LANGUAGES.EN && (
                <TextAreaField
                  value={inputEng}
                  maxLength={symbol}
                  autoHeight
                  onChange={(event) => setInputEng(event.target.value)}
                  className={styles.inputs_textarea}
                />
              )}
              <label>{courseLanguage === COURSE_LANGUAGES.UA ? `${symbol-inputUkr?.length}` : `${symbol-inputEng?.length}`}</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputField;
