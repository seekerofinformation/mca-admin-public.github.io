import React, { useState } from 'react';
import Layout from '../../components/common/Layout/Layout';
import AddNotification from './AddNotification/AddNotification';
import styles from './NotificationPage.module.scss';

import { TITLE_TYPES } from '../../constants/general';
import NotificationList from './NotifiactionList/NotificationList';
import { useGetNotificationQuery } from '../../store/Notification/notifiaction.api';
import Loader from '../../components/common/Loader/Loader';


const NotificationPage = () => {
  const [addButton, setAddButton] = useState(false);
  const {isLoading} = useGetNotificationQuery();

  return (
    <Layout type={TITLE_TYPES.NOTIFICATION} buttonName="Повернутися до головної сторінки">
      <div className={styles.container}>
        <div className={styles.addButton} onClick={() => setAddButton(!addButton)}>+ Додати сповіщення</div>
        <div className={styles.list}>
          {addButton && <AddNotification setAddButton={setAddButton} addButton={addButton} setEdit={setAddButton}/>}
          {isLoading && <Loader />}
          <NotificationList />
        </div>
      </div>
    </Layout>
  );
};

export default NotificationPage;
