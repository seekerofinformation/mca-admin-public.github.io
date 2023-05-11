import React, { useState } from 'react';
import styles from '../AddFaq/AddFaq.module.scss';
import LanguageBox from '../../../components/common/LanguageBox/LanguageBox';
import Layout from '../../../components/common/Layout/Layout';
import { useGetFaqByIdQuery, useUpdateFaqMutation } from '../../../store/Faq/faq.api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const EditFaq = () => {
  const { id } = useParams();
  const {data} = useGetFaqByIdQuery(id);
  const [faq, setFaq] = useState(null);
  const [questionEn, setQuestionEn] = useState(faq?.titles?.find((title) => title.language === 'EN')?.text || '');
  const [questionUkr, setQuestionUkr] = useState(faq?.titles?.find((title) => title.language === 'UA')?.text || '');
  const [answerUkr, setAnswerUkr] = useState(faq?.text?.find((title) => title.language === 'UA')?.text || '');
  const [answerEn, setAnswerEn] = useState(faq?.text?.find((title) => title.language === 'EN')?.text || '');
  const [updateFaq] = useUpdateFaqMutation();


  const handleSaveQuestion = async () => {
    try {
      await updateFaq(id, {
        titles: [
          {
            language: 'EN',
            text: questionEn
          },
          {
            language: 'UA',
            text: questionUkr
          }
        ],
        text: [
          {
            language: 'EN',
            text: answerEn
          },
          {
            language: 'UA',
            text: answerUkr
          }
        ]
      });
    }catch(error){
      console.log(error);
    };
  };

  const validate = () => {
    if(questionUkr.length === 0 || questionEn.length === 0 || answerEn.length === 0 || answerUkr.length === 0){
      return true;
    }else return false;
  };


  useEffect(() => {
    if(typeof data === 'object'){
      setFaq(data);
    };
  }, [data]);

  return (
    <Layout name={faq?.title} buttonName="Назад" link='faq'>
      <div className={styles.edit}>
        <div className={styles.edit_container}>
          <div className={styles.edit_container_title}>Введіть питання</div>
          <div className={styles.edit_container_data}>
            <div className={styles.edit_container_data_row}>
              <LanguageBox lang='UKR' />
              <input
                value={questionUkr}
                className={styles.edit_container_data_input}
                onChange={(event) => setQuestionUkr(event.target.value)}
              />
            </div>
            {questionUkr.length === 0 && <b className={styles.edit_container_data_error}>Поле не може бути пустім</b>}
          </div>
          <div className={styles.edit_container_data}>
            <div className={styles.edit_container_data_row}>
              <LanguageBox lang='ENG' />
              <input
                value={questionEn}
                className={styles.edit_container_data_input}
                onChange={(event) => setQuestionEn(event.target.value)}
              />
            </div>
            {questionEn.length === 0 && <b className={styles.edit_container_data_error}>Поле не може бути пустім</b>}
          </div>
        </div>
        <div className={styles.edit_container}>
          <div className={styles.edit_container_title}>Введіть відповідь</div>
          <div className={styles.edit_container_data}>
            <div className={styles.edit_container_data_row}>
              <LanguageBox lang='UKR' />
              <input
                value={answerUkr}
                className={styles.edit_container_data_input}
                onChange={(event) => setAnswerUkr(event.target.value)}
              />
            </div>
            {answerUkr.length === 0 && <b className={styles.edit_container_data_error}>Поле не може бути пустім</b>}
          </div>
          <div className={styles.edit_container_data}>
            <div className={styles.edit_container_data_row}>
              <LanguageBox lang='ENG' />
              <input
                value={answerEn}
                className={styles.edit_container_data_input}
                onChange={(event) => setAnswerEn(event.target.value)}
              />
            </div>
            {answerEn.length === 0 && <b className={styles.edit_container_data_error}>Поле не може бути пустім</b>}
          </div>
        </div>
        <button disabled={validate()} className={styles.edit_button} onClick={() => handleSaveQuestion()}>Зберегти</button>
      </div>
    </Layout>
  );
};

export default EditFaq;

