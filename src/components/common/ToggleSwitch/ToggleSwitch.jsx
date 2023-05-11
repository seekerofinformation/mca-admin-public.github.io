import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = ({checked, onChange, name, id}) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.switch_checkbox}
        name={name}
        checked={checked}
        onChange={() => onChange()}
        id={name}
      />
      <div className={styles.switch_icon} htmlFor={name}></div>
    </label>
  );
};

export default ToggleSwitch;
