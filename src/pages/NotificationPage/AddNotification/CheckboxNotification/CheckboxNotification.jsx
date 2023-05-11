import React from 'react';
import styles from '../AddNotification.module.scss'

const CheckboxNotification = ({setValue, value='new'}) => {
  const changeValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.checkbox}>
      <div className={styles.checkbox_container}>
        <input
          type="radio"
          id='new'
          value="new"
          name='type'
          defaultChecked={value === 'new' ? true : false }
          className={styles.checkbox_container_input}
          onChange={(event) => changeValue(event)}
        />
        <label htmlFor='new'>Про новий курс</label>
      </div>
      <div className={styles.checkbox_container}>
        <input
          type="radio"
          id='edit'
          value="edit"
          name='type'
          defaultChecked={value === 'edit' ? true : false }
          className={styles.checkbox_container_input}
          onChange={(event) => changeValue(event)}
        />
        <label htmlFor='edit'>Про знижку</label>
      </div>
      <div className={styles.checkbox_container}>
        <input
          type="radio"
          id='update'
          value="update"
          name='type'
          defaultChecked={value === 'update' ? true : false }
          className={styles.checkbox_container_input}
          onChange={(event) => changeValue(event)}
        />
        <label htmlFor='update'>Про обновлення програми</label>
      </div>
    </div>
  )
}

export default CheckboxNotification
