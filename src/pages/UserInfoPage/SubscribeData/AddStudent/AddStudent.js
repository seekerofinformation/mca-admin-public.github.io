import Modal from '../../../../components/common/Modal/Modal';
import styles from './AddStudent.module.scss';
import Select from 'react-select'
import { useState } from 'react';

const AddStudent = ({active, setActive}) => {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState('');

  const options = [
    {value: '', label: ''},
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  
  const changeSelected = (e) => {
    setSelected(e);
  };
  
  const selectStyles = {
    control: (base) => ({
      ...base,
      fontSize: '14px',
      fontWeight: '400',
      borderRadius: '10px',
      background: '#F6F6F6',
      border: 'none',
      boxShadow: 'none',
      '&:focus': {
          border: '0 !important',
      },
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: 'transparent'
  }),
};
  
  return (
    <Modal active={active} setActive={setActive}>
      <div className={styles.modal}>
        <div className={styles.modal_title}>Додати студента</div>
        <form className={styles.modal_form} onSubmit={handleSubmit}>
          <div className={styles.modal_form_container}>
            <label className={styles.modal_form_container__label}>Імʼя студента</label>
            <input
              placeholder="Імʼя студента"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.modal_form_container__input}
            />
          </div>
          <div className={styles.modal_form_container}>
            <label className={styles.modal_form_container__label}>Назва передплати</label>
            <Select
              placeholder="Виберіть зі списку"
              options={options}
              styles={selectStyles}
              onChange={(e) => changeSelected(e.value)}
            />
          </div>
          <button type="submit" className={styles.modal_form_button}>Зберегти</button>
        </form>
      </div>
    </Modal>
  )
}

export default AddStudent;
