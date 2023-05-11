import React from 'react';

import styles from "./FileInput.module.scss"

const FileInput = ({ fileName = "", onChange, language = "" }) => {
    return (
        <label htmlFor={language + "file"} className={styles.fileInput}>
            <input type="file" name="media" id={language + "file"} accept={"image/*, video/*"} onChange={(e) => onChange(e, language)}/>
            {!!fileName && <span className={styles.fileName}>{fileName}</span>}
            <span>{`${!!fileName ? "Змінити" : "+"} зображення/відео ${language.toUpperCase()}`}</span>
        </label>
    );
};

export default FileInput;