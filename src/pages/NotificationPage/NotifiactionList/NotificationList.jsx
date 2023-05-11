import React from 'react';
import { useState } from 'react';
import DeleteModal from '../../../components/common/DeleteModal/DeleteModal';
import { useDeleteNotificationMutation, useGetNotificationQuery } from '../../../store/Notification/notifiaction.api';
import NotificationItem from '../NotificationItem/NotificationItem';

const NotificationList = () => {
  const {data: alerts} = useGetNotificationQuery();
  const [activeDelete, setActiveDelete] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState();
  const [edit, setEdit] = useState(false);
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleEditToggle = () => setEdit(!edit);
  const handleDeleteModalToggle = () => setActiveDelete(!activeDelete);

  const handleDeleteAlert = async () => {
    await deleteNotification(selectedAlerts.id);
  };

  const handleEditIconClick = (alert) => {
    handleEditToggle();
    setSelectedAlerts(alert);
  };

  const handleDeleteIconClick = (alert) => {
    handleDeleteModalToggle();
    setSelectedAlerts(alert);
  };

  return (
    <div>
      {!!alerts?.length && alerts?.map(alert => (
        <NotificationItem
          key={alert.id}
          onEdit={handleEditIconClick}
          setSelectedFaq={selectedAlerts}
          onDelete={handleDeleteIconClick}
          selectedFaq={selectedAlerts}
          edit={edit}
          setEdit={setEdit}
          {...alert}
        />
      ))}
      {setActiveDelete && (
        <DeleteModal
          active={activeDelete}
          close={handleDeleteModalToggle}
          onDelete={handleDeleteAlert}
          titles={null}
          title={selectedAlerts?.titles[0]?.text}
        />
      )}
    </div>
  );
};

export default NotificationList;
