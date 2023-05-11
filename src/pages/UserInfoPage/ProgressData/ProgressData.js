import styles from './ProgressData.module.scss';
import Filter from '../../../images/icons/filter.svg';

const ProgressData = () => {
  const data = [
    {
      id: 1,
      student: 'Андріі Chornyi',
      course: 'Course name 1',
      test: '65%',
      test2: '65%',
      test3: '',
      qn1: '',
      qn: '',
      bal: '73%',
      progress: '70%'
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
              <p>Назва курсу</p>
              <img src={Filter} alt="Filter" className={styles.table_header_column__img}/>
            </th>
            <th className={styles.table_header_column}>Тест 1</th>
            <th className={styles.table_header_column}>Тест 2</th>
            <th className={styles.table_header_column}>Тест 3</th>
            <th className={styles.table_header_column}>...</th>
            <th className={styles.table_header_column}>QN-1</th>
            <th className={styles.table_header_column}>QN</th>
            <th className={styles.table_header_column}>Ср. бал</th>
            <th className={styles.table_header_column}>Прогрес</th>
          </tr>
          {data && data.map((item) => {
            return (
              <tr key={item.id} className={styles.table_body}>
                <th className={styles.table_body_item}>{item.student}</th>
                <th className={styles.table_body_item}>{item.course}</th>
                <th className={styles.table_body_item}>{item.test}</th>
                <th className={styles.table_body_item}>{item.test2}</th>
                <th className={styles.table_body_item}>{item.test3}</th>
                <th className={styles.table_body_item}></th>
                <th className={styles.table_body_item}>{item.qn}</th>
                <th className={styles.table_body_item}>{item.qn1}</th>
                <th className={styles.table_body_item}>{item.bal}</th>
                <th className={styles.table_body_item}>{item.progress}</th>
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

export default ProgressData;
