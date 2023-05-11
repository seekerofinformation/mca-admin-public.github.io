import React from 'react';

import clsx from "clsx";

import styles from "./Button.module.scss"

export const BUTTON_VARIANT = {
    PRIMARY: "primary",
    SECONDARY: "secondary"
}

const Button = (
    {
        variant = BUTTON_VARIANT.PRIMARY,
        onClick = () => {},
        type = "button",
        children,
        className = "",
        disabled = false
    }
) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(styles.btn, styles[variant], className)}
        >
            {children}
        </button>
    );
};

export default Button;