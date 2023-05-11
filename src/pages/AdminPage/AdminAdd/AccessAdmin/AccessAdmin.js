import React from 'react';
import styles from '../AdminAdd.module.scss';

const AccessAdmin = ({admin, setAdmin}) => {
  const adminHandler = (e) => setAdmin(e.target.value);

  return (
    <div className={styles.access}>
      <div className={styles.access_title}>Права доступу</div>
      <div className={styles.access_container}>
        <input
          className={styles.access_container_input}
          type="radio"
          id='admin'
          value="admin"
          name='admin'
          onChange={(e) => adminHandler(e)}
          defaultChecked={admin === false && true}
        />
        <label htmlFor='admin'>Адмін</label>
      </div>
      <div className={styles.access_container}>
        <input
          className={styles.access_container_input}
          type="radio"
          name='admin'
          id='superadmin'
          value="superAdmin"
          onChange={(e) => adminHandler(e)}
          defaultChecked={admin === true && true}
        />
        <label htmlFor="superadmin" >Супер адмін</label>
      </div>
    </div>
  )
}

export default AccessAdmin
