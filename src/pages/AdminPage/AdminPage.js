import React, { useState } from 'react';
import Layout from '../../components/common/Layout/Layout';
import styles from './AdminPage.module.scss';
import clsx from 'clsx';
import AdminAdd from './AdminAdd/AdminAdd';
import AdminList from './AdminList/AdminList';
import AdminProfile from './AdminProfile/AdminProfile';

const AdminPage = () => {
  const [activeLeft, setActiveLeft] = useState(true);
  const [activeRight, setActiveRight] = useState(false);
  const [activeModal, setActiveModal] = useState(false);

  const toggle = () => {
    setActiveLeft(!activeLeft);
    setActiveRight(!activeRight);
  };

  return (
    <Layout type="Профіль адміністратора" buttonName="Повернутися до головної сторінки">
      <div className={styles.container}>
        <div className={styles.container_buttons}>
          <div
            className={clsx(styles.container_buttons_btn, activeLeft &&  styles.container_buttons_btn__activeLeft)}
            onClick={toggle}
          >
            Мій профіль
          </div>
          <div
            className={clsx(styles.container_buttons_btn, activeRight && styles.container_buttons_btn__activeRight)}
            onClick={toggle}
          >
            Збережені таблиці
          </div>
        </div>
        {activeLeft && (
          <div>
            <AdminProfile />
            <AdminList setActiveModal={setActiveModal} activeModal={activeModal} />
          </div>
        )}
        {activeRight && (
          <div>
            Saved tables
          </div>
        )}
      </div>
      <AdminAdd active={activeModal} setActive={setActiveModal} />
    </Layout>
  );
};

export default AdminPage;
