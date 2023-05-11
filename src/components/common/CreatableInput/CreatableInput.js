import React from 'react';
import styles from './CreatableInput.module.scss';
import TextAreaField from '../../../components/TextAreaField/TextAreaField';
import LanguageBox from '../../../components/LanguageBox/LanguageBox';
import {useGetCourseQuery} from '../../../store/Courses/courseName.api';

const CreatableInput = ({symbol, fields, setFields}) => {
  const {data: course} = useGetCourseQuery()

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

  return (
    <div>
      {fields.map(({ key, ukr, eng }, idx) => {
        return (
          <div className={styles.container}>
            {course?.attributes?.lang === "UKR_ENG" && (
              <div className={styles.inputs}>
                <div className={styles.inputs_data}>
                    <LanguageBox lang='UKR' />
                    <TextAreaField
                      value={ukr || ''}
                      autoHeight
                      onChange = {(e) => handleChange(key, ukr, e)}
                      maxLength={symbol}
                      className={styles.inputs_textarea}
                    />
                    <label>{`${symbol-ukr.length}`}</label>
                </div>
                <div className={styles.inputs_data}>
                    <LanguageBox lang='ENG' />
                    <TextAreaField
                      value={eng}
                      autoHeight
                      onChange = {(e) => handleChange(key, eng, e)}
                      className={styles.inputs_textarea}
                      maxLength={symbol}
                    />
                    <label>{`${symbol-eng.length}`}</label>
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
                        onChange={(e) => handleChange(key, ukr, e)}
                        className={styles.inputs_textarea}
                        maxLength={symbol}
                      />
                    )}
                    {course?.attributes?.lang === 'ENG' && (
                      <TextAreaField
                        value={eng}
                        maxLength={symbol}
                        autoHeight
                        onChange={(e) => handleChange(key, eng, e)}
                        className={styles.inputs_textarea}
                      />
                    )}
                    <label>{course?.attributes?.lang === 'UKR' ? `${symbol-ukr.length}` : `${symbol-eng.length}`}</label>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CreatableInput;
