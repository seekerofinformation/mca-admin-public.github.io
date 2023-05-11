import React, { useState } from 'react';
import styles from './Dropdown.module.scss';
import ArrowDown from '../../../images/icons/arrowDown.svg';


const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      setSelection([item]);
    }
    setOpen(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.dropdown} onClick={(event) => handleClick(event)}>
        <div>{selection.length !== 0 ? selection.map(el => el.title) : title}</div>
        <img src={ArrowDown} alt="VectorDown" />
      </div>
      {open && (
        <div className={styles.list}>
          {items.map(item => (
            <div key={item.id} className={styles.list_item} onClick={() => handleOnClick(item)}>
              <div>{item.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;