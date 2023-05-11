import React, { useState } from 'react';

import PageTitle from "../../../common/PageTitle/PageTitle";

import {TITLE_SIZES} from "../../../../constants/titleSizes";
import {MODES, TITLE_TYPES} from "../../../../constants/general";

import Delete from '../../../../images/icons/delete.svg';
import Edit from '../../../../images/icons/edit.svg';

import styles from './ThemeItem.module.scss';
import ThemeModal from "../../ThemeModal/ThemeModal";

const ThemeItem = ({ topic, onDelete }) => {
    const [edit, setEdit] = useState(false);

    return (
        edit
            ?
            <ThemeModal topic={topic} setActiveAdd={setEdit} mode={MODES.EDIT} />
            :
            (
                <div className={styles.theme_container}>
                    <div className={styles.theme_container_names}>
                        <PageTitle titles={topic?.titles} size={TITLE_SIZES.M} type={TITLE_TYPES.TOPIC} />
                    </div>
                    <div className={styles.theme_container_func}>
                        <img src={Edit} alt="edit" className={styles.theme_container_func__img} data-id={topic.id} onClick={() => setEdit(true)}/>
                        <img src={Delete} alt="del" className={styles.theme_container_func__img} onClick={onDelete} />
                    </div>
                </div>
            )
    )
}

export default ThemeItem
