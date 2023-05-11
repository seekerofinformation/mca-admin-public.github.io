import React, { useState } from 'react';
import LanguageBox from '../../../../components/common/LanguageBox/LanguageBox';
import TextAreaField from '../../../../components/common/TextAreaField/TextAreaField';
import { useGetCourseQuery } from '../../../../store/Courses/courseName.api';
import { useGetTopicQuery, usePostTopicMutation } from '../../../../store/Courses/topics.api';
import { disabled } from '../../../../utils/validate';
import styles from './AddTopic.module.scss';

const AddTopic = ({symbol, setActiveAdd}) => {
  const [fields, setFields] = useState([
    {
      key: crypto.randomUUID(),
      topicUkr: '',
      topicEng: ''
    }
  ]);
  const {data: course} = useGetCourseQuery();
  const {refetch} = useGetTopicQuery();
  const [postTopic] = usePostTopicMutation();

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

  const handleNewInput = () => {
    setFields([...fields, { key: crypto.randomUUID(), topicUkr: '', topicEng: '' }])
  };

  const handleSaveTopic = async () => {
    const fieldsToString = JSON.stringify(fields);
    await postTopic({data: { fields: fieldsToString, link: 'asdasd'}});
    refetch();
    setActiveAdd(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topic}>
        <div className={styles.topic_buttons_button}>+ Зображення/відео</div>
        <div className={styles.topic_inputs}>
          {fields.map((item, idx) => (
            <div key={item.key} className={styles.fields}>
              {course?.attributes?.lang === "UKR_ENG" && (
                <div className={styles.fields_inputs}>
                  <div className={styles.fields_inputs_data}>
                    <LanguageBox lang='UKR' />
                    <TextAreaField
                      value={item.topicUkr}
                      autoHeight
                      onChange = {(e) => handleChange(item.key, 'topicUkr', e)}
                      maxLength={symbol}
                      className={styles.fields_inputs_textarea}
                    />
                    <label>{`${symbol-item.topicUkr.length}`}</label>
                  </div>
                  <div className={styles.fields_inputs_data}>
                    <LanguageBox lang='ENG' />
                    <TextAreaField
                      value={item.topicEng}
                      autoHeight
                      onChange = {(e) => handleChange(item.key, 'topicEng', e)}
                      className={styles.fields_inputs_textarea}
                      maxLength={symbol}
                    />
                    <label>{`${symbol-item.topicEng.length}`}</label>
                  </div>
                </div>
              )}
              {course?.attributes?.lang !== 'UKR_ENG' && (
                <div className={styles.fields_inputs}>
                  <div className={styles.fields_inputs_data}>
                    <LanguageBox lang={course?.attributes?.lang === 'UKR' ? 'UKR' : 'ENG'} />
                    {course?.attributes?.lang === 'UKR' && (
                      <TextAreaField
                        autoHeight
                        value={item.topicUkr}
                        onChange={(e) => handleChange(item.key, 'topicUkr', e)}
                        className={styles.fields_inputs_textarea}
                        maxLength={symbol}
                      />
                    )}
                    {course?.attributes?.lang === 'ENG' && (
                      <TextAreaField
                        value={item.topicEng}
                        maxLength={symbol}
                        autoHeight
                        onChange={(e) => handleChange(item.key, 'topicEng', e)}
                        className={styles.fields_inputs_textarea}
                      />
                    )}
                    <label>{course?.attributes?.lang === 'UKR' ? `${symbol-item.topicUkr.length}` : `${symbol-item.topicEng.length}`}</label>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.topic_buttons}>
          <div className={styles.topic_buttons_button} onClick={() => handleNewInput()}>+ Абзац</div>
          <div className={styles.topic_buttons_button}>Показати</div>
        </div>
        <button
          className={styles.topic_save}
          onClick={() => handleSaveTopic()}
          disabled={disabled(course?.attributes?.lang, fields[0].topicEng, fields[0].topicUkr)}
        >
          Зберегти
        </button>
      </div>
    </div>
  );
};

export default AddTopic;
