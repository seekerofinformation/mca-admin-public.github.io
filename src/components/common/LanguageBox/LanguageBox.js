import React from 'react';
import styles from './LanguageBox.module.scss';

const LanguageBox = ({lang}) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_label}>{lang?.toUpperCase()}</div>
    </div>
  );
};

export default LanguageBox;
