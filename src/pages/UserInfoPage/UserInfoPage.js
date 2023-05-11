import React, { useState } from 'react';
import Layout from '../../components/common/Layout/Layout';
import styles from './UserInfoPage.module.scss';
import clsx from 'clsx';
import AdminsData from './AdminsData/AdminsData';
import SubscribeData from './SubscribeData/SubscribeData';
import ProgressData from './ProgressData/ProgressData';

const UserInfoPage = () => {
  const [control, setControl] = useState({
    admins: true,
    subscribes: false,
    progress: false
  });

  const changeControl = (element, oldElement, oldElement2) => {
    setControl({
      [element]: true,
      [oldElement]: false,
      [oldElement2]: false
    });
  };

  return (
    <Layout name="Інформація про користувачів" buttonName="Повернутися до головної сторінки">
      <div className={styles.tables}>
        <div className={styles.tables_control}>
          <div
            className={clsx(control.admins ? styles.tables_control_button__active : styles.tables_control_button, styles.tables_control_button__left)}
            onClick={() => changeControl('admins', 'subscribes', 'progress')}
          >
            Дані користувачів
          </div>
          <div
            className={clsx(control.subscribes ? styles.tables_control_button__active : styles.tables_control_button )}
            onClick={() => changeControl('subscribes', 'admins', 'progress')}
          >
            Підписки користувачів
          </div>
          <div
            className={clsx(control.progress ? styles.tables_control_button__active : styles.tables_control_button, styles.tables_control_button__right)}
            onClick={() => changeControl('progress', 'admins', 'subscribes')}
          >
            Подивитися прогрес
          </div>
        </div>
        <div className={styles.tables_content}>
          {control.admins && <AdminsData />}
          {control.subscribes && <SubscribeData />}
          {control.progress && <ProgressData />}
        </div>
      </div>
    </Layout>
  );
};

export default UserInfoPage;
