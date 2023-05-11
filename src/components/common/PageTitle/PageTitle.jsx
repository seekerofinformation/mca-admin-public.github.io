import React from 'react';

import styles from "./PageTitle.module.scss"

const PageTitle = ({ titles, size, type = "" }) => {
    return (
        <div className={styles[size]}>
            {!!type && (<span>{type} </span>)}
            {
                titles?.map(({ language, text }, index) => (
                    <span key={language + text}>
                        {`${language.toUpperCase()}: ${text} ${!index && titles.length > 1 ? "/ " : ""}`}
                    </span>
                ))
            }
        </div>
    );
};

export default PageTitle;