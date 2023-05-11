import React, { useState } from 'react'
import { useGetAdminByIdQuery, useUpdateAdminMutation } from '../../../store/Admins/admins.api';
import { capitalize } from '../../../utils/capitalize';
import AccessAdmin from '../AdminAdd/AccessAdmin/AccessAdmin';
import styles from '../AdminPage.module.scss';

const AdminEdit = ({setEdit, id='' }) => {
  const {data: admin} = useGetAdminByIdQuery(id);
  const [isSuper, setIsSuper] = useState(admin?.is_superuser);
  const [name, setName] = useState(admin?.first_name || '');
  const [surname, setSurname] = useState(admin?.last_name || '');
  // const [number, setNumber] = useState(admin.number || '');
  const [email, setEmail] = useState(admin?.email || '');
  const [updateAdmin] = useUpdateAdminMutation();

  const handleEdit = async () => {
    setEdit(false);
    await updateAdmin({
      id,
      body: {
        first_name: capitalize(name),
        last_name: capitalize(surname),
        email: email,
        is_superuser: isSuper === 'superAdmin' ? true : false
      }
    })
  }

  return (
    <tr className={styles.table_container}>
      <th className={styles.table_container_edit}>
        <div className={styles.table_container_edit__title}>Имя:</div>
        <input
          className={styles.table_container_edit__input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </th>
      <th className={styles.table_container_edit}>
        <div className={styles.table_container_edit__title}>Фамилия:</div>
        <input
          className={styles.table_container_edit__input}
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </th>
      <th className={styles.table_container_edit}>
        <div className={styles.table_container_edit__title}>Email:</div>
        <input
          className={styles.table_container_edit__input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </th>
      {/* <th className={styles.table_container_edit}>
        <div className={styles.table_container_edit__title}>Number:</div>
        <input
          className={styles.table_container_edit__input}

        />
      </th> */}
      <th className={styles.table_container_edit}>
        <AccessAdmin admin={isSuper} setAdmin={setIsSuper} />
      </th>
      <th className={styles.table_container_edit}>
        <div className={styles.table_container_edit__save} onClick={() => handleEdit()}>Зберегти</div>
        <div className={styles.table_container_edit__cancel} onClick={() => setEdit(false)}>Скасувати</div>
      </th>
    </tr>
  )
}

export default AdminEdit
