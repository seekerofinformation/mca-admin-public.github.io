import React, {useState} from 'react';

import Modal from '../Modal/Modal';

import styles from './DeleteModal.module.scss';

const DeleteModal = ({active, close, title, onDelete, titles}) => {
  const [confirm, setConfirm] = useState(false);

  const handleDelete = () => {
    if (!confirm) {
      setConfirm(true)
    } else {
      close()
      setConfirm(false)
      onDelete()
    }
  };

  return (
    <Modal active={active} close={close}>
      <div className={styles.container}>
        <div className={styles.container_title}>{!confirm ? `Видалити ${title}?` : `Ви справді хочете видалити ${title}? Всі матеріали буде втрачено.`}</div>
        <div className={styles.container_subtitle}>
          {titles?.map(({ language, text }, index) => (
            <span key={language + text}>{`${language.toUpperCase()}: ${text} ${!index && titles.length > 1 ? "/ " : ""}`}</span>
          ))}
        </div>
        <div className={styles.container_buttons}>
          <div className={styles.container_buttons_back} onClick={close}>Скасувати</div>
          <div className={styles.container_buttons_delete} onClick={handleDelete}>Видалити</div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
