import clsx from 'clsx';
import React, { useState } from 'react';
import { useUserContext } from '../../../../context/userContext';
import { useGetAdminByIdQuery } from '../../../../store/Admins/admins.api';
import { isAdmin } from '../../../../utils/adminUtil';
import AccessAdmin from '../../AdminAdd/AccessAdmin/AccessAdmin';
import AdminEdit from '../../AdminEdit/AdminEdit';
import styles from '../../AdminPage.module.scss';

const AdminItem = ({item, index, edit, selectedValue, handleEdit, handleDelete, setEdit} ) => {
  const {user} = useUserContext();
  const {refetch} = useGetAdminByIdQuery(item.id)

  return (
    (edit && item.id === selectedValue?.id)
      ?
        <AdminEdit setEdit={setEdit} id={item.id} />
      :
        (
          <tr key={item.id} className={styles.table_row}>
            <td className={styles.table_column}>{index+1}</td>
            <th className={styles.table_column}>{item.first_name}</th>
            <th className={styles.table_column}>{item.last_name}</th>
            <th className={styles.table_column}>{item.email}</th>
            <th className={styles.table_column}>{isAdmin(item.is_superuser)}</th>
            {user?.is_superuser && <th className={clsx(styles.table_edit, styles.table_column)} onClick={() => {handleEdit(item); refetch()}}></th>}
            {user?.is_superuser && <th className={clsx(styles.table_delete, styles.table_column)} onClick={() => handleDelete(item.id)}></th>}
          </tr>
        )
  )
}

export default AdminItem;
