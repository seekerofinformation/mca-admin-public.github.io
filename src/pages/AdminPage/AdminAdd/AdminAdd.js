import React, { useEffect, useState } from 'react';
import styles from './AdminAdd.module.scss';
import Modal from '../../../components/common/Modal/Modal';
import { capitalize } from '../../../utils/capitalize';
import { usePostAdminMutation } from '../../../store/Admins/admins.api';
import AccessAdmin from './AccessAdmin/AccessAdmin';

const AdminAdd = ({active, setActive}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [examPass, setExamPass] = useState('');
  const [acceptPass, setAcceptPass] = useState(false);
  const [admin, setAdmin] = useState('admin');
  const [postAdmin] = usePostAdminMutation();

  const handleAccept = (e) => {
    setExamPass(e.target.value);
  };

  const close = () => setActive(false)

  const validate = () => {
    if(acceptPass || name.length === 0 ||  email.length === 0 || pass.length === 0){
      return true;
    }else return false;
  };

  const handleClick = async () => {
    await postAdmin({
      first_name: capitalize(name.split(' ')[0]),
      last_name: capitalize(name.split(' ')[1]),
      email: email,
      is_superuser: admin === 'admin' ? false : true,
      username: email,
      password: pass
    });
    setActive(false);
  };

  useEffect(() => {
    if(pass !== examPass){
      setAcceptPass(true);
    }else {
      setAcceptPass(false);
    };
  }, [pass, examPass]);


  return (
    <Modal active={active} close={close}>
      <div className={styles.container}>
        <div className={styles.title}>Додати користувача</div>
        <div name="add-admin" className={styles.form}>
          <div className={styles.form_container}>
            <label>Імʼя користувача</label>
            <input
              type="text"
              className={styles.form_container_input}
              onChange={(e) => setName(e.target.value)}
              placeholder="Імʼя та прізвище"
            />
            {name.length === 0 && <div className={styles.form_container_error}>Поле не може бути пустім</div>}
          </div>
          <div className={styles.form_container}>
            <label>E-mail</label>
            <input
              type="email"
              className={styles.form_container_input}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
            />
            {email.length === 0 && <div className={styles.form_container_error}>Поле не може бути пустім</div>}
          </div>
          <div className={styles.form_container}>
            <label>Пароль</label>
            <input
              type="password"
              className={styles.form_container_input}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Введіть пароль"
            />
            {pass.length === 0 && <div className={styles.form_container_error}>Поле не може бути пустім</div>}
          </div>
          <div className={styles.form_container}>
            <label>Підтвердьте пароль</label>
            <input
              type="password"
              className={styles.form_container_input}
              onChange={(e) => handleAccept(e)}
              placeholder="Підтвердьте пароль"
            />
            {acceptPass && <div className={styles.form_container_error}>Паролі не співпадають</div>}
          </div>
          <AccessAdmin admin={admin} setAdmin={setAdmin} />
          <div className={styles.button}>
            <input
              className={styles.button_btn}
              type="submit"
              value="Зберегти"
              disabled={validate()}
              onClick={() => handleClick()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminAdd;
