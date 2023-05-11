import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../components/common/Layout/Layout';
import SubscriptionsList from "../../components/Subscriptions/SubsriptionsList/SubscriptionsList";

import {TITLE_TYPES} from "../../constants/general";

import styles from './PaymentsPage.module.scss';

const PaymentsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout type={TITLE_TYPES.PAYMENTS} buttonName="Повернутися до головної сторінки">
      <div className={styles.container}>
        <div className={styles.addButton} onClick={() => navigate('/dashboard/payments/add')}>
            + Додати тарифний план
        </div>
          <SubscriptionsList />
      </div>
    </Layout>
  );
};

export default PaymentsPage;
