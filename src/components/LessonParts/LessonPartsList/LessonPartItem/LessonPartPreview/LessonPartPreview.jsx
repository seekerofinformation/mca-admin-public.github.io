import React from 'react';
import clsx from "clsx";


import styles from "./LessonPartPreview.module.scss";

const LessonPartPreview = ({ active, close, content }) => {
    console.log(content)

    return (
        <div className={clsx(styles.container, active && styles.container_active)} onClick={close}>
            <div className={styles.previewWrapper}>
               <div className={styles.contentWrapper}>
                   <div className={styles.head}>
                       <img src={content.file} alt=""/>
                   </div>
                   <div className={styles.content}>
                       {!!content?.text?.length && content?.text.map((text, index) => (
                           <p className={styles.text} key={text + index}>{text}</p>
                       ))}
                   </div>
               </div>
            </div>
        </div>
    );
};

export default LessonPartPreview;