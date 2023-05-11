import React from 'react'
import { useState } from 'react';
import PageTitle from '../../../components/common/PageTitle/PageTitle';
import ToggleSwitch from '../../../components/common/ToggleSwitch/ToggleSwitch';
import { TITLE_SIZES } from '../../../constants/titleSizes';
import { useGetNotificationByIdQuery, useUpdateNotificationMutation } from '../../../store/Notification/notifiaction.api';
import styles from '../NotificationPage.module.scss';
import Edit from '../../../images/icons/edit.svg';
import Delete from '../../../images/icons/delete.svg';
import AddNotification from '../AddNotification/AddNotification';

const NotificationItem = ({ id, published, description, titles, onEdit, onDelete, edit, selectedFaq, setEdit}) => {
  const [checked, setCheked] = useState(published || false);
  const [updateNotification] = useUpdateNotificationMutation();
  const {refetch} = useGetNotificationByIdQuery(id);

  const updateChecked = async () => {
    setCheked(!published)
    await updateNotification({id , body: {published: !published}});
  };

  return (
    (edit && id === selectedFaq?.id)
      ?
      <AddNotification edit={true} id={id} setEdit={setEdit}/>
      :
      (
        <div className={styles.list_container} key={id}>
          <div className={styles.list_item}>
            <div className={styles.list_item_title}>
              <PageTitle titles={titles} size={TITLE_SIZES.L}/>
              <div className={styles.list_item_title__desc}>
                <PageTitle titles={description} size={TITLE_SIZES.S} />
              </div>
            </div>
            <div className={styles.list_item_func}>
              <ToggleSwitch name="public" checked={checked} onChange={updateChecked} id={id} />
              <img
                src={Edit}
                data-id={id}
                className={styles.list_item_func__img}
                alt="Edit"
                onClick={() => {onEdit({id, published, titles}); refetch(); }}
              />
              <img
                className={styles.list_item_func__img}
                src={Delete}
                onClick={() => onDelete({id, published, titles})}
                alt="Delete"
              />
            </div>
          </div>
        </div>
      )
  );
};

export default NotificationItem;
