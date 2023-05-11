import React from 'react';
import {useNavigate} from "react-router-dom";

import PageTitle from "../PageTitle/PageTitle";

import {TITLE_TYPES} from "../../../constants/general";
import {TITLE_SIZES} from "../../../constants/titleSizes";

import Arrow from '../../../images/icons/arrow.svg';

import styles from './Layout.module.scss';

const Layout = ({title, buttonName, children, type = TITLE_TYPES.COURSE}) => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.container_wrapper}>
        <div className={styles.header}>
          <div className={styles.header_wrapper}>
            <PageTitle titles={title} size={TITLE_SIZES.L} type={type} />
            <div className={styles.header_goBack} onClick={() => navigate("/dashboard/")}>
              <div className={styles.header_goBack_img}>
                <img src={Arrow} alt="Arrow" />
              </div>
              <div className={styles.header_goBack_subtitle}>{buttonName}</div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_wrapper}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
