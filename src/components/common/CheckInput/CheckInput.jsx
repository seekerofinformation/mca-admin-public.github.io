import React from 'react';

import styles from "./CheckInput.module.scss";

export const CHECK_INPUT_TYPE = {
    RADIO: "radio",
    CHECKBOX: "checkbox"
}

const CheckInput = ({ labelText, id, defaultChecked, onChange,...inputProps }) => {
    console.log(inputProps, defaultChecked)
    return (
        <label htmlFor={id} className={styles.checkbox_container}>
            <input
                {...inputProps}
                id={id}
                defaultChecked={defaultChecked}
                onChange={onChange}
                className={styles.checkbox_container__input}
            />
            <p className={styles.checkbox_container__label} >{labelText}</p>
        </label>
    );
};

export default CheckInput;