import clsx from "clsx";
import React, {useState} from 'react';

import Modal from "../common/Modal/Modal";

import {useUserContext} from "../../context/userContext";

import WhiteVector from "../../images/icons/whiteVector.svg";

import styles from "../../pages/AuthPage/AuthPage.module.scss";

const defaultPasswordError = { error: false, errorMessage: "", status: 0 };
const defaultNewPassword = { password: "", confirmPassword: "" };

const PasswordChangeModal = ({ active = false, setActive }) => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState(defaultNewPassword);
    const [passwordError, setPasswordError] = useState(defaultPasswordError);

    const [activeChange, setActiveChange] = useState(false);
    const [activeConfirmPassword, setConfirmPassword] = useState(false)

    const { sendPasswordEmail, changeUserPassword  } = useUserContext();

    const handleSetCode = (event) => setCode(event.target.value);
    const handleSetEmail = (event) => setEmail(event.target.value);
    const handleSetPassword = (event) => {
        setNewPassword(prevState => ({ ...prevState, password: event.target.value }));
        setPasswordError(defaultPasswordError)
    }
    const handleSetConfirmPassword = (event) => {
        setPasswordError(defaultPasswordError)
        setNewPassword(prevState => ({ ...prevState, confirmPassword: event.target.value }));
    }

    const handlePasswordValidate = () => {
        const regEx = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;

        if (!newPassword.password.match(regEx)) {
            setPasswordError({
                error: true,
                errorMessage: "Пароль має містити хоча б один спец. символ, маленьку, велику літеру і мінімум 8 символів",
                status: 1
            })

            return false
        }

        if (newPassword.password !== newPassword.confirmPassword) {
            setPasswordError({
                error: true,
                errorMessage: "Паролі не співпадають",
                status: 2
            })

            return false
        }

        return true
    }

    const handleClose = () => {
        setActive(false)
        setActiveChange(false)
        setConfirmPassword(false)
        setEmail("")
        setCode("")
        setNewPassword(defaultNewPassword)
        setPasswordError(defaultPasswordError)
    }

    const handleMailSend = async () => {
        await sendPasswordEmail({ email });
        setActiveChange(true);


        setTimeout(() => {
            setActiveChange(false)
            setConfirmPassword(true)
        }, 2000)
    }

    const handlePasswordChange = async () => {
        if (!!email && code && handlePasswordValidate()) {
            await changeUserPassword({ email, code, password: newPassword.password })
            setConfirmPassword(false)
            setActive(false)

        }
    }

    const emailBody = (
        <div className={styles.modal_wrapper}>
            <div className={styles.title}>Будь ласка, введіть свою електронну адресу, щоб ми могли надіслати вам посилання для відновлення пароля</div>
            <div className={styles.section}>
                <label htmlFor="email_changePassword">E-mail</label>
                <input
                    value={email}
                    onChange={handleSetEmail}
                    type="email"
                    placeholder="Введіть e-mail"
                    id="email_changePassword"
                    name="email_changePassword"
                    className={styles.section_input}
                />
            </div>
            <button disabled={!email.length} className={styles.button} onClick={handleMailSend}>
                {activeChange ? <img src={WhiteVector} alt='send' /> : `Надіслати лист`}
                {activeChange && <span>Відправлено</span>}
            </button>
            {activeChange && (
                <div className={styles.subtitle}>Лист для зміни пароля надіслано на вашу електронну адресу</div>
            )}
        </div>
    )

    const passwordBody = (
        <div className={styles.modal_wrapper}>
            <div className={styles.title}>Будь ласка, введіть код та новий пароль</div>
            <div className={styles.section}>
                <label htmlFor="email_changePassword">E-mail</label>
                <input
                    value={email}
                    onChange={handleSetEmail}
                    type="email"
                    placeholder="Введіть e-mail"
                    id="email_changePassword"
                    name="email_changePassword"
                    className={styles.section_input}
                    disabled={activeConfirmPassword}
                />
            </div>
            <div className={styles.section}>
                <label htmlFor="code_changePassword">Код</label>
                <input
                    value={code}
                    onChange={handleSetCode}
                    type="text"
                    placeholder="Введіть код з листа"
                    id="code_changePassword"
                    name="code_changePassword"
                    className={styles.section_input}
                />
            </div>
            <div className={styles.section}>
                <label htmlFor="password_changePassword">Введіть новий пароль</label>
                <input
                    value={newPassword.password}
                    onChange={handleSetPassword}
                    onBlur={handlePasswordValidate}
                    type="password"
                    placeholder="Введіть пароль"
                    id="password_changePassword"
                    name="password_changePassword"
                    className={clsx(styles.section_input, passwordError.error && styles.error)}
                />
                <p className={styles.errorMessage}>{passwordError.error && passwordError.errorMessage}</p>
            </div>
            <div className={styles.section}>
                <label htmlFor="confirmPassword_changePassword">Повторіть новий пароль</label>
                <input
                    value={newPassword.confirmPassword}
                    onChange={handleSetConfirmPassword}
                    onBlur={handlePasswordValidate}
                    type="password"
                    placeholder="Введіть пароль"
                    id="confirmPassword_changePassword"
                    name="confirmPassword_changePassword"
                    className={clsx(styles.section_input, passwordError.error && styles.error)}
                />
            </div>
            <button disabled={passwordError.error || !code.length} className={styles.button} onClick={handlePasswordChange}>
                Змінити пароль
            </button>
        </div>
    )

    return (
        <Modal active={active} close={handleClose}>
            <div className={styles.modal}>
                {activeConfirmPassword ? passwordBody : emailBody}
            </div>
        </Modal>
    );
};

export default PasswordChangeModal;