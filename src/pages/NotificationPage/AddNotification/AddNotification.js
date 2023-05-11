import clsx from 'clsx';
import React, { useState } from 'react';

import LangCheckbox from '../../../components/common/LangCheckbox/LangCheckbox';
import { useGetNotificationByIdQuery, usePostNotificationMutation, useUpdateNotificationMutation } from '../../../store/Notification/notifiaction.api';
import { disabled } from '../../../utils/validate';
import InputField from '../../../components/common/InputField/InputField';
import styles from './AddNotification.module.scss';
import CheckboxNotification from './CheckboxNotification/CheckboxNotification';

const AddNotification = ({setAddButton, edit = false, id='', setEdit }) => {
  const {data: alert} = useGetNotificationByIdQuery(id);
  const [nameUkr, setNameUkr] = useState(alert?.titles?.find((title) => title.language === 'ua')?.text || '');
  const [nameEng, setNameEng] = useState(alert?.titles?.find((title) => title.language === 'en')?.text || '');
  const [descUkr, setDescUkr] = useState(alert?.description?.find((title) => title.language === 'ua')?.text || '');
  const [descEng, setDescEng] = useState(alert?.description?.find((title) => title.language === 'en')?.text || '');
  const [value, setValue] = useState(alert?.type || 'new');
  const [languageState, setLanguageState] = useState(edit ? '' : 'ua');
  const [postNotification] = usePostNotificationMutation();
  const [updateNotification] = useUpdateNotificationMutation();


  const close = () => setEdit(false);
  const handleSave = async (published = false) => {
    if(languageState === 'en_ua'){
      await postNotification({
        language: 'en',
        type: value,
        published: published,
        titles: [{language: 'en', text: nameEng}],
        description: [{language: 'en', text: descEng}]
      });
      await postNotification({
        language: 'ua',
        type: value,
        published: published,
        titles: [{language: 'ua', text: nameUkr}],
        description: [{language: 'ua', text: descUkr}]
      });
    }else if(languageState === 'en'){
      await postNotification({
        language: 'en',
        type: value,
        published: published,
        titles: [{language: 'en', text: nameEng}],
        description: [{language: 'en', text: descEng}]
      });
    }else if(languageState === 'ua'){
      await postNotification({
        language: 'ua',
        type: value,
        published: published,
        titles: [{language: 'ua', text: nameUkr}],
        description: [{language: 'ua', text: descUkr}]
      });
    };
    close();
  };

  const handleUpdate = async () => {
    close();
    if(nameEng.length === 0){
      await updateNotification({
        id,
        body: {
          type: value,
          titles: [{language: 'ua', text: nameUkr}],
          description: [{language: 'ua', text: descUkr}]
        }
      })
    }else if(nameUkr.length === 0){
      await updateNotification({
        id,
        body: {
          type: value,
          titles: [{language: 'en', text: nameEng}],
          description: [{language: 'en', text: descEng}]
        }
      })
    }
  }


  return (
    <div className={styles.containerAdd}>
      {!edit && <LangCheckbox setLanguageState={setLanguageState} />}
      <div className={styles.containerAdd_choose}>
        <div className={styles.title}>Тип сповіщення</div>
        <CheckboxNotification setValue={setValue} value={value} />
      </div>
      <div className={styles.name}>
        <div className={styles.name_title}>Назва</div>
        <InputField
          courseLanguage={languageState || alert?.language}
          inputUkr={nameUkr}
          inputEng={nameEng}
          setInputEng={setNameEng}
          setInputUkr={setNameUkr}
          symbol={35}
        />
      </div>
      <div className={styles.name}>
        <div className={styles.name_title}>Опис</div>
        <InputField
          courseLanguage={languageState || alert?.language}
          inputEng={descEng}
          inputUkr={descUkr}
          setInputEng={setDescEng}
          setInputUkr={setDescUkr}
          symbol={500}
        />
      </div>
      <div className={styles.containerButtons}>
        <button
          className={clsx(edit ? styles.containerButtons_public : styles.containerButtons_save)}
          onClick={() => edit ? handleUpdate() : handleSave(false)}
          disabled={
            disabled(!edit ? languageState : alert.language, nameEng, nameUkr) ||
            disabled(!edit ? languageState : alert.language, descEng, descUkr)
          }
        >
          Зберегти
        </button>
          <button
            className={styles.containerButtons_save}
            onClick={close}
          >
            Скасувати
          </button>
          <button
            className={styles.containerButtons_public}
            onClick={() => handleSave(true)}
            disabled={
              disabled(!edit ? languageState : alert.language, nameEng, nameUkr) ||
              disabled(!edit ? languageState : alert.language, descEng, descUkr)
            }
          >
            Опублікувати
          </button>
      </div>
    </div>
  );
};

export default AddNotification;
