import React from 'react';
import styles from './LangCheckbox.module.scss';

const LangCheckbox = ({setLanguageState}) => {
  const languageStateHandler = (event) => setLanguageState(event.target.value);

  return (
    <div className={styles.edit_language}>
        <label className={styles.edit_language_group}>
          <input
            type="radio"
            name="contact"
            value="ua"
            onChange={languageStateHandler}
            defaultChecked
            className={styles.edit_language_group__input}
          />
          <div className={styles.edit_language_group__icon}></div>
          UKR
        </label>
        <label className={styles.edit_language_group}>
          <input
            type="radio"
            name="contact"
            value="en"
            onChange={languageStateHandler}
            className={styles.edit_language_group__input}
          />
          <div className={styles.edit_language_group__icon}></div>
          ENG
        </label>
        <label className={styles.edit_language_group}>
          <input
            type="radio"
            name="contact"
            value="en_ua"
            onChange={languageStateHandler}
            className={styles.edit_language_group__input}
          />
          <div className={styles.edit_language_group__icon}></div>
          UKR i ENG
        </label>
      </div>
  )
}

export default LangCheckbox
