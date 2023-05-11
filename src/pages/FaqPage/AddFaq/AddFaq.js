import React, {useState } from 'react';
import styles from './AddFaq.module.scss';
import LanguageBox from '../../../components/common/LanguageBox/LanguageBox';
import { useGetFaqByIdQuery, usePostFaqMutation, useUpdateFaqMutation } from '../../../store/Faq/faq.api';
import LangCheckbox from '../../../components/common/LangCheckbox/LangCheckbox';
import { disabled } from '../../../utils/validate';

const AddFaq = ({setActiveButton, edit = false, id = ''}) => {
  const {data: faq} = useGetFaqByIdQuery(id);
  const [questionEn, setQuestionEn] = useState(faq?.titles?.find((title) => title.language === 'en')?.text || '');
  const [questionUkr, setQuestionUkr] = useState(faq?.titles?.find((title) => title.language === 'ua')?.text || '');
  const [answerUkr, setAnswerUkr] = useState(faq?.text?.find((title) => title.language === 'ua')?.text || '');
  const [answerEn, setAnswerEn] = useState(faq?.text?.find((title) => title.language === 'en')?.text || '');
  const [postFaq] = usePostFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [languageState, setLanguageState] = useState(edit ? '' : 'ua');

  const handleSaveQuestion = async () => {
    setActiveButton(false);
    if(languageState === 'en_ua'){
      await postFaq({
        language: 'en',
        published: false,
        titles: [{language: 'en', text: questionEn}],
        text: [{language: 'en', text: answerEn}]
      });
      await postFaq({
        language: 'ua',
        published: false,
        titles: [{language: 'ua', text: questionUkr}],
        text: [{language: 'ua', text: answerUkr}]
      });
    }else if(languageState === 'en'){
      await postFaq({
        language: 'en',
        published: false,
        titles: [{language: 'en', text: questionEn}],
        text: [{language: 'en', text: answerEn}]
      });
    }else if(languageState === 'ua'){
      await postFaq({
        language: 'ua',
        published: false,
        titles: [{language: 'ua', text: questionUkr}],
        text: [{language: 'ua', text: answerUkr}]
      });
    };
  };

  const handleUpdate = async () => {
    setActiveButton(false);
    if(questionEn.length === 0){
      await updateFaq({
        id,
        body: {
          titles: [{language: 'ua', text: questionUkr}],
          text: [{language: 'ua', text: answerUkr}]
        }
      })
    }else if(questionUkr.length === 0){
      await updateFaq({
        id,
        body: {
          titles: [{language: 'en', text: questionEn}],
          text: [{language: 'en', text: answerEn}]
        }
      })
    }
  }



  return (
    <div className={styles.edit}>
      {!edit && <LangCheckbox setLanguageState={setLanguageState} />}
      <div className={styles.edit_container}>
        <div className={styles.edit_container_title}>Введіть питання</div>
        {(languageState === 'ua' || languageState === 'en_ua' || faq?.language === 'ua') && (
          <div className={styles.edit_container_data}>
            <div className={styles.edit_container_data_row}>
              <LanguageBox lang='UKR' />
              <input
                value={questionUkr}
                className={styles.edit_container_data_input}
                onChange={(event) => setQuestionUkr(event.target.value)}
              />
            </div>
          </div>
        )}
        {(languageState === 'en' || languageState === 'en_ua' || faq?.language === 'en') && (
          <div className={styles.edit_container_data}>
            <div className={styles.edit_container_data_row}>
              <LanguageBox lang='ENG' />
              <input
                value={questionEn}
                className={styles.edit_container_data_input}
                onChange={(event) => setQuestionEn(event.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.edit_container}>
        <div className={styles.edit_container_title}>Введіть відповідь</div>
        {(languageState === 'ua' || languageState === 'en_ua' || faq?.language === 'ua') && (
          <div className={styles.edit_container_data}>
            <div className={styles.edit_container_data_row}>
              <LanguageBox lang='UKR' />
              <input
                value={answerUkr}
                className={styles.edit_container_data_input}
                onChange={(event) => setAnswerUkr(event.target.value)}
              />
            </div>
          </div>
        )}
        {(languageState === 'en' || languageState === 'en_ua' || faq?.language === 'en') && (
          <div className={styles.edit_container_data}>
            <div className={styles.edit_container_data_row}>
              <LanguageBox lang='ENG' />
              <input
                value={answerEn}
                className={styles.edit_container_data_input}
                onChange={(event) => setAnswerEn(event.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <button
        className={styles.edit_button}
        onClick={() => edit ? handleUpdate() : handleSaveQuestion()}
        disabled={
          disabled(!edit ? languageState : faq.language, questionEn, questionUkr) ||
          disabled(!edit ? languageState : faq.language, answerEn, answerUkr)
        }
      >
        Зберегти
      </button>
    </div>
  );
};

export default AddFaq;
