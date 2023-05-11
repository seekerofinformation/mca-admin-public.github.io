import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/common/Layout/Layout';
import styles from './TopicCourse.module.scss';
import Right from '../../../images/icons/arrowRight.svg';
import AddTopic from './AddTopic/AddTopic';
import Delete from '../../../images/icons/delete.svg';
import Edit from '../../../images/icons/edit.svg';
import { useGetCourseQuery } from '../../../store/Courses/courseName.api';
import { validateName } from '../../../utils/validate';
import { useDeleteTopicMutation, useGetTopicQuery } from '../../../store/Courses/topics.api';
import {MAX_LESSON_AMOUNT} from "../../../constants/general";


const TopicCourse = () => {
  const navigate = useNavigate();
  const {data: course} = useGetCourseQuery();
  const {data: topics, refetch} = useGetTopicQuery();
  const [activeAdd, setActiveAdd] = useState(false);
  const [deleteTopic,] = useDeleteTopicMutation();

  const handleDeleteTopic = async (id) => {
    await deleteTopic(id);
    refetch();
  }

  return (
    <Layout
      buttonName="Повернутися до головної сторінки"
      name={validateName(course)}
    >
      <div className={styles.container}>
        <div className={styles.container_func}>
          <div className={styles.container_navigation}>
            <div className={styles.container_navigation_prev} onClick={() => navigate('/dashboard/courses/desc')}>Курс</div>
            <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
            <div className={styles.container_navigation_prev} onClick={() => navigate('/dashboard/courses/theme')}>Теми</div>
            <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
            <div className={styles.container_navigation_prev} onClick={() => navigate('/dashboard/courses/theme/lessons')}>Уроки</div>
            <img src={Right} alt="ArrowRight" className={styles.container_navigation_arrow} />
            <div className={styles.container_navigation__active}>Топіки</div>
          </div>
          <div className={styles.addTopic}>
            <button
              className={styles.addTopic_btn}
              onClick={() => setActiveAdd(!activeAdd)}
            >
              + Додати топік
            </button>
          </div>
        </div>
        {activeAdd && <AddTopic symbol={500} setActiveAdd={setActiveAdd} />}
        <div className={styles.list}>
          {topics?.map((item, idx) => (
            <div key={item.id} className={styles.list_item}>
              <div className={styles.list_item_name}>
                <div className={styles.list_item_name__title}>Топик {idx+1}</div>
                {JSON.parse(item.attributes.fields).map((el) => (
                  <div key={el.topicUkr+el.topicEng+el.link} className={styles.list_item_name__desc}>{el.topicUkr}</div>
                ))}
              </div>
              <div className={styles.list_item_func}>
                <img src={Edit} alt="edit" className={styles.list_item_func__img} data-id={item.id} />
                <img src={Delete} alt="del" className={styles.list_item_func__img} onClick={() => handleDeleteTopic(item.id)}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TopicCourse;
