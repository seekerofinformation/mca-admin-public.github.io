import clsx from 'clsx';
import React, { useState } from 'react';
import { useDeleteAdminMutation, useGetAdminQuery, useUpdateAdminMutation } from '../../../store/Admins/admins.api';
import { isAdmin } from '../../../utils/adminUtil';
import styles from '../AdminPage.module.scss';
import ToggleSwitch from '../../../components/common/ToggleSwitch/ToggleSwitch'
import { useUserContext } from '../../../context/userContext';
import AdminItem from './AdminItem/AdminItem';

const AdminList = ({setActiveModal, activeModal}) => {
  const {data: admins} = useGetAdminQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [edit, setEdit] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [checked, setChecked] = useState(selectedValue?.is_superuser || null);
  const [updateAdmin] = useUpdateAdminMutation();
  const {user} = useUserContext();

  const handleDelete = async(id) => await deleteAdmin(id);
  const toggleEdit = () => setEdit(!edit);

  const handleEditIconClick = (admin) =>  {
    toggleEdit();
    setSelectedValue(admin);
  };

  const updateChecked = async () => {
    setChecked(!checked)
    await updateAdmin({body: {is_superuser: !selectedValue?.is_superuser}});
  };


  return (
    <div className={styles.admin}>
      <div className={styles.admin_title}>
        <div className={styles.admin_title_name}>Список адмінів та супер адмінів</div>
        <div className={styles.admin_title_button} onClick={() => setActiveModal(!activeModal)}>+ Додати користувача</div>
      </div>
      <table className={styles.table} cellSpacing="0">
        <tbody>
          <tr className={styles.table_row}>
            <th className={styles.table_column}>№</th>
            <th className={styles.table_column}>Ім'я</th>
            <th className={styles.table_column}>Прізвище</th>
            <th className={styles.table_column}>Логін</th>
            <th className={styles.table_column}>Адмін</th>
            {user?.is_superuser && <th className={clsx(styles.table_column)}></th>}
            {user?.is_superuser && <th className={clsx(styles.table_column)}></th>}
          </tr>
          {admins?.length !== 0 && admins?.map((item, index) => (
            <AdminItem
              key={item.id}
              edit={edit}
              handleEdit={handleEditIconClick}
              handleDelete={handleDelete}
              selectedValue={selectedValue}
              item={item}
              index={index}
              setEdit={setEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminList
