import React, {useEffect, useState} from 'react';
import Modal from '../../components/common/Modal/Modal';
import WhiteVector from '../../images/icons/whiteVector.svg';
import {useNavigate} from 'react-router-dom';
import styles from './AuthPage.module.scss';
import Main from '../../images/auth/authPage.svg';
import {useUserContext} from "../../context/userContext";
import PasswordChangeModal from "../../components/PasswordChangeModal/PasswordChangeModal";

const AuthPage = () => {
  const navigate = useNavigate();

  const { handleLogin, isAuth } = useUserContext();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [active, setActive] = useState(false);
  const [activeChange, setActiveChange] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await handleLogin({ username: email, password: pass })

    if(!!result) {
      navigate('/dashboard');
    }
  };

  const handleChangePassword = (change) => {
    setActiveChange(!change);
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [isAuth])

  return (
    <div className={styles.container}>
      <div className={styles.container_wrapper}>
        <div className={styles.content}>
          <div className={styles.content_left}>
            <img
              src={Main}
              alt="AuthPhoto"
              className={styles.content_left_img}
            />
          </div>
          <div className={styles.content_right}>
            <h2 className={styles.content_right_title}>Авторизація</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.section}>
                <label htmlFor="email">E-mail</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Введіть e-mail"
                  id="email"
                  name="email"
                  className={styles.section_input}
                />
              </div>
              <div className={styles.section}>
                <label htmlFor="password">Пароль</label>
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                  placeholder="Введіть пароль"
                  id="password"
                  name="password"
                  className={styles.section_input}
                />
              </div>
              <label className={styles.form_checkbox}>
                <input className={styles.form_checkbox_input} type="checkbox" id="save" name="save"  />
                <div className={styles.form_checkbox_input_icon}></div>
                Запам’ятати мене
              </label>
              <button type="submit" className={styles.button}>Увійти</button>
            </form>
            <div className={styles.update}>
              <button className={styles.update_button} onClick={() => setActive(true)}>Відновити пароль</button>
            </div>
          </div>
        </div>
        <PasswordChangeModal active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default AuthPage;
