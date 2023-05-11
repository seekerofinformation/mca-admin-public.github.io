import React from 'react';
import clsx from 'clsx';
import styles from './Modal.module.scss';
import RemoveIcon from '../../../images/icons/remove.svg';

const Modal = ({active, close, children}) => {
  return (
    <div>
      <div className={clsx(styles.container, active && styles.container_active)} onClick={close}>
        <div className={clsx(styles.container_content, active && styles.container_content_active)} onClick={(e) => e.stopPropagation()}>
          <div className={styles.container_content_close} onClick={close}>
            <img src={RemoveIcon} alt="remove" className={styles.container_content_close_img}/>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
