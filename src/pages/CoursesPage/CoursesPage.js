import React, { useState } from 'react';

import Layout from '../../components/common/Layout/Layout';
import ModalAdd from '../../components/Courses/ModalAdd/ModalAdd';
import CoursesList from "../../components/Courses/CoursesList/CoursesList";

import styles from './CoursesPage.module.scss';
import {TITLE_TYPES} from "../../constants/general";

const CoursesPage = () => {
  const [activeModal, setActiveModal] = useState(false);

  return (
    <Layout name="Курси" buttonName="Повернутися до головної сторінки" type={TITLE_TYPES.EMPTY}>
      <div className={styles.container}>
        <button className={styles.addButton} onClick={() => setActiveModal(!activeModal)}>+ Додати курс</button>
        <div className={styles.list}>
          <CoursesList />
        </div>
        <ModalAdd active={activeModal} setActive={setActiveModal} />
      </div>
    </Layout>
  );
};

export default CoursesPage;
