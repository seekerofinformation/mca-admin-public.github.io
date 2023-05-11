import { capitalize } from '../../../utils/capitalize';
import React, { useState } from 'react';
import styles from '../AdminPage.module.scss';
import Profile from '../../../images/icons/profile.svg';
import Edit from '../../../images/icons/edit.svg';
import { useUserContext } from '../../../context/userContext';
import { useGetAdminByIdQuery, useUpdateAdminMutation } from '../../../store/Admins/admins.api';

const AdminProfile = () => {
  const [changesProfile, setChangesProfile] = useState({
    nameChange: false,
    emailChange: false,
    numberChange: false,
  });
  const user = JSON.parse(localStorage.getItem('user'));
  const {data: admin, refetch} = useGetAdminByIdQuery(user.id);
  console.log(admin)
  console.log(user)
  const [changeName, setChangeName] = useState((admin?.first_name+' '+admin?.last_name) || '');
  const [changeEmail, setChangeEmail] = useState(admin?.email || '');
  const [changeNumber, setChangeNumber] = useState('+375255233966' || '');
  const [updateAdmin] = useUpdateAdminMutation();

  const toggleChange =  (id) => {
    refetch();
    setChangesProfile({...changesProfile, [Object.keys(changesProfile)[id]]: !Object.values(changesProfile)[id]});
  };
  const handleEditChange = async (id, adminId, item, name) => {
    toggleChange(id);
    const data = {[name]: name === 'first_name' ? capitalize(item.split(' ')[0]) : item};
    if(name === 'first_name'){
      await updateAdmin({id: adminId, body: data});
      await updateAdmin({id: adminId, body: {last_name: capitalize(item.split(' ')[1])}})
    }else {
      await updateAdmin({id: adminId, body: data});
    }
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile_containerImg}>
        <img src={Profile} alt="Profile" className={styles.profile_containerImg_img}  />
      </div>
      <div className={styles.profile_content}>
        <div className={styles.profile_content_admin}>{admin?.is_superuser ? 'Супер адмін' : 'Админ'}</div>
        <div className={styles.profile_content_edit}>
          <span className={styles.profile_content_name}>Імʼя:</span>
          {!changesProfile.nameChange ?
            <span>{admin?.first_name} {admin?.last_name}</span>
            :
            <div className={styles.profile_content_container}>
              <input value={changeName} onChange={(e) => setChangeName(e.target.value)} className={styles.profile_content_container__input} />
              <button className={styles.profile_content_container__button} onClick={() => handleEditChange(0, admin?.id, changeName, 'first_name')}>Save</button>
            </div>
          }
          {!changesProfile.nameChange &&
            <img
              src={Edit}
              alt="Edit"
              onClick={() => toggleChange(0)}
            />
          }
        </div>
        <div className={styles.profile_content_edit}>
          <span className={styles.profile_content_name}>E-mail:</span>
          {!changesProfile.emailChange ?
            <span>{admin?.email}</span>
            :
            <div className={styles.profile_content_container}>
              <input value={changeEmail} onChange={(e) => setChangeEmail(e.target.value)} className={styles.profile_content_container__input}/>
              <button className={styles.profile_content_container__button} onClick={() => handleEditChange(1, admin?.id, changeEmail, 'email')}>Save</button>
            </div>
          }
          {!changesProfile.emailChange &&
            <img
              src={Edit}
              alt="Edit"
              onClick={() => toggleChange(1)}
            />
          }
        </div>
        <div className={styles.profile_content_edit}>
          <span className={styles.profile_content_name}>Номер телефону:</span>
          {!changesProfile.numberChange ?
            <span>{changeNumber}</span>
            :
            <div className={styles.profile_content_container}>
              <input value={changeNumber} onChange={(e) => setChangeNumber(e.target.value)} className={styles.profile_content_container__input}/>
              <button className={styles.profile_content_container__button} onClick={() => handleEditChange(2, admin?.id, changeNumber, 'number')}>Save</button>
            </div>
          }
          {!changesProfile.numberChange &&
            <img
              src={Edit}
              alt="Edit"
              onClick={() => toggleChange(2)}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
