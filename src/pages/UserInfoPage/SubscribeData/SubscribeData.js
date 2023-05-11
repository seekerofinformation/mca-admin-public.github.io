import styles from './SubscribeData.module.scss';
import Filter from '../../../images/icons/filter.svg';
import { useState } from 'react';
import AddStudent from './AddStudent/AddStudent';

const SubscribeData = () => {
  const [active, setActive] = useState(false)
  const data = [
    {
      id: 1,
      student: 'Студент 1',
      payment: 'Підписка 1',
      course: 'Курс 1',
      subscribe: 'Lifetime',
      date: '13/03/1998',
      nextPay: '28/03/2023',
      price: '250',
      admin: 'Admin 1'
    },
    {
      id: 2,
      student: 'Студент 1',
      payment: 'Підписка 1',
      course: 'Курс 1',
      subscribe: 'Lifetime',
      date: '13/03/1998',
      nextPay: '28/03/2023',
      price: '250',
      admin: 'Admin 1'
    },

  ]
  return (
    <div className={styles.container}>
      <table cellSpacing="0" className={styles.table}>
        <tbody>
          <tr className={styles.table_header}>
            <th className={styles.table_header_column}>
              <p>Студент</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
            <th className={styles.table_header_column}>
              <p>Назва підписки</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
            <th className={styles.table_header_column}>Включені курси</th>
            <th className={styles.table_header_column}>
              <p>Термін дії підписки</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
            <th className={styles.table_header_column}>
              <p>День передплати</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img} />
            </th>
            <th className={styles.table_header_column}>
              <p>Наступний платіж</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
            <th className={styles.table_header_column}>
              <p>Ціна</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
            <th className={styles.table_header_column}>
              <p>Адмін</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
          </tr>
          {data && data.map((item) => {
            return (
              <tr key={item.id} className={styles.table_body}>
                <th className={styles.table_body_item}>{item.student}</th>
                <th className={styles.table_body_item}>{item.payment}</th>
                <th className={styles.table_body_item}>{item.course}</th>
                <th className={styles.table_body_item}>{item.subscribe}</th>
                <th className={styles.table_body_item}>{item.date}</th>
                <th className={styles.table_body_item}>{item.nextPay}</th>
                <th className={styles.table_body_item}>{item.price}</th>
                <th className={styles.table_body_item}>{item.admin !== '' ? item.admin : ''}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className={styles.container_buttons}>
        <button className={styles.container_buttons__left}>
          Зберегти
        </button>
        <button className={styles.container_buttons__right} onClick={() => setActive(!active)}>
          + Додати студента
        </button>
      </div>
      {active && <AddStudent active={active} setActive={setActive} />}
    </div>
  );
};

export default SubscribeData;
