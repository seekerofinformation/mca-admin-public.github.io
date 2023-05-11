import React, { useState } from 'react';
import styles from './HomePage.module.scss';
import Courses from '../../images/home/courses.svg';
import Subscribe from '../../images/home/subscribe.svg';
import Faq from '../../images/home/faq.svg';
import UserInfo from '../../images/home/userInfo.svg';
import Notification from '../../images/home/notifications.svg';
import Profile from '../../images/icons/profile.svg';
import { useNavigate } from 'react-router-dom';
import Logout from '../../images/icons/logout.svg';
import Modal from '../../components/common/Modal/Modal';
import clsx from 'clsx';
import {useUserContext} from "../../context/userContext";

const HomePage = () => {
  const [activeModal, setActiveModal] = useState(false);
  const navigate = useNavigate();
  const { handleLogout } = useUserContext()

  return (
    <div className={styles.container}>
      <div className={styles.container_wrapper}>
        <div className={styles.header}>
          <div className={styles.profile}>
            <div className={styles.profile_top} onClick={() => navigate('/dashboard/admin')}>
              <div className={styles.profile_top_img}>
                <img src={Profile} alt="Profile"  className={styles.profile_top_img__image}/>
              </div>
              <div className={styles.profile_top_name}>Перейти в мій профіль</div>
            </div>
            <div className={styles.profile_container_bottom} onClick={() => setActiveModal(!activeModal)}>
              <img src={Logout} alt="Logout" className={styles.image}/>
              <div className={styles.logout}>Вийти</div>
            </div>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.list_wrapper}>
            <div className={styles.list_function} onClick={() => navigate('/dashboard/courses')}>
              <div className={styles.list_function_img}>
                <img src={Courses} className={styles.list_function_img__image} alt="Courses"/>
              </div>
              <div className={styles.list_function_title}>Курси</div>
            </div>
            <div className={styles.list_function} onClick={() => navigate('/dashboard/payments')}>
              <div className={styles.list_function_img}>
                <img src={Subscribe} className={styles.list_function_img__image} alt="Subscribes"/>
              </div>
              <div className={styles.list_function_title}>Підписки</div>
            </div>
            <div className={styles.list_function} onClick={() => navigate('/dashboard/faq')}>
              <div className={styles.list_function_img}>
                <img src={Faq} className={styles.list_function_img__image} alt="Faq"/>
              </div>
              <div className={styles.list_function_title}>FAQ</div>
            </div>
            <div className={styles.list_function} onClick={() => navigate('/dashboard/user_info')}>
              <div className={styles.list_function_img}>
                <img src={UserInfo} className={styles.list_function_img__image} alt="UserInfo"/>
              </div>
              <div className={styles.list_function_title}>Дані користувачів</div>
            </div>
            <div className={styles.list_function} onClick={() => navigate('/dashboard/notification')} >
              <div className={styles.list_function_img}>
                <img src={Notification} className={styles.list_function_img__image} alt="Notification"/>
              </div>
              <div className={styles.list_function_title}>Сповіщення</div>
            </div>
          </div>
        </div>
        {activeModal && (
          <Modal active={activeModal} setActive={setActiveModal}>
            <div className={styles.modal}>
              <div className={styles.modal_title}>Ви справді хочете вийти?</div>
              <div className={styles.modal_buttons}>
                <div className={clsx(styles.modal_buttons_btn, styles.cancel)} onClick={() => setActiveModal(false)}>Скасувати</div>
                <div onClick={handleLogout} className={styles.modal_buttons_btn}>Так, вийти</div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default HomePage;
