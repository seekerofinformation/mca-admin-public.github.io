import React, { useState } from 'react';
import Layout from '../../components/common/Layout/Layout';
import styles from './FaqPage.module.scss';
import AddFaq from './AddFaq/AddFaq';
import { useGetFaqQuery } from '../../store/Faq/faq.api';
import Loader from '../../components/common/Loader/Loader';
import FaqList from './FaqList/FaqList';
import { TITLE_TYPES } from '../../constants/general';

const FaqPage = () => {
  const [activeAdd, setActiveAdd] = useState(false);
  const {isLoading} = useGetFaqQuery();

  const handleAddQuestion = () => setActiveAdd(!activeAdd);

  return (
    <Layout type={TITLE_TYPES.FAQ} buttonName="Повернутися до головної сторінки">
      <div className={styles.container}>
        <div className={styles.addButton} onClick={handleAddQuestion}>+ Додати питання</div>
        <div className={styles.list}>
          {activeAdd &&
            <AddFaq
              setActiveButton={setActiveAdd}
            />
          }
          {isLoading && <Loader />}
          <FaqList />
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;
