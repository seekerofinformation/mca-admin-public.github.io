import styles from './AdminsData.module.scss';
import Filter from '../../../images/icons/filter.svg';
import {useStudentsContext} from "../../../context/studentsContext";
import {useEffect} from "react";

const AdminsData = () => {
  const { students, getStudents } = useStudentsContext();
  const data = [
    {
      id: 1,
      name: 'Dima',
      email: 'test@mail.ru',
      phone: '+375255233966',
      date: '13/03/1998',
      country: 'BLR',
      language: 'UKR',
      subscribe: true
    },
    {
      id: 2,
      name: 'Dima',
      email: 'test@mail.ru',
      phone: '+375255233966',
      date: '13/03/1998',
      country: 'BLR',
      language: 'UKR',
      subscribe: true
    }
  ]

  useEffect(() => {
    getStudents()
  }, [])
  return (
    <div className={styles.container}>
      <table cellSpacing="0" className={styles.table}>
        <tbody>
          <tr className={styles.table_header}>
            <th className={styles.table_header_column}>
              <p>Ім'я користувача</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
            <th className={styles.table_header_column}>Email</th>
            <th className={styles.table_header_column}>Номер телефону</th>
            <th className={styles.table_header_column}>
              <p>Дата реєстрації</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
            <th className={styles.table_header_column}>
              <p>Місцезнаходження</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img} />
            </th>
            <th className={styles.table_header_column}>
              <p>Мова інтерфейсу</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
            <th className={styles.table_header_column}>
              <p>Підписка</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
          </tr>
          {!!students.length && students.map((item) => {
            return (
              <tr key={item.id} className={styles.table_body}>
                <th className={styles.table_body_item}>{item.fullname}</th>
                <th className={styles.table_body_item}>{item.email}</th>
                <th className={styles.table_body_item}>{item.phone}</th>
                <th className={styles.table_body_item}>{new Date(item.created_at).toLocaleDateString()}</th>
                <th className={styles.table_body_item}>{item.location}</th>
                <th className={styles.table_body_item}>{item.language.toUpperCase()}</th>
                <th className={styles.table_body_item}>{item.subscribe === true ? 'Yes' : 'No'}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button className={styles.container_button}>
        Зберегти
      </button>
    </div>
  );
};

export default AdminsData;
