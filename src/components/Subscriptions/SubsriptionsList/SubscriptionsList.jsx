import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {useSubscriptionContext} from "../../../context/subscriptionsContext";

import DeleteModal from "../../common/DeleteModal/DeleteModal";
import ToggleSwitch from "../../common/ToggleSwitch/ToggleSwitch";

import styles from "./SubscriptionsList.module.scss";
import {TITLE_TYPES} from "../../../constants/general";
import Edit from "../../../images/icons/edit.svg";
import Delete from "../../../images/icons/delete.svg";
import PageTitle from "../../common/PageTitle/PageTitle";
import {TITLE_SIZES} from "../../../constants/titleSizes";

const SubscriptionsList = () => {
    const navigate = useNavigate()
    const { subscriptions, getSubscriptions, editSubscription, deleteSubscription } = useSubscriptionContext();

    const [selectedSubscription, setSelectedSubscription] = useState(null)

    const handleDelete = (subscription) => {
        setSelectedSubscription(subscription)
    }

    const handlePublishSubscription = async (id, published) => {
        await editSubscription(id, { published })
    }

    const handleClose = () => setSelectedSubscription(null)

    const onSubscriptionDelete = async () => {
        await deleteSubscription(selectedSubscription.id)
    }

    const handleSetEdit = (id) => navigate(`/dashboard/payments/edit/${id}`)

    useEffect(() => {
        getSubscriptions()
    }, [])

    return (
        <div className={styles.list}>
            {!!subscriptions?.length && subscriptions?.map((element) => (
                <div className={styles.list_container} key={element.id}>
                    <div className={styles.list_item}>
                        <PageTitle titles={element.titles} type={TITLE_TYPES.PAYMENT} size={TITLE_SIZES.M} />
                        <div className={styles.list_item_func}>
                            <ToggleSwitch
                                checked={element.published}
                                onChange={() => handlePublishSubscription(element.id, !element.published)}
                            />
                            <img
                                className={styles.list_item_func__img}
                                src={Edit}
                                onClick={() => handleSetEdit(element.id)}
                                alt="Edit"
                            />
                            <img
                                className={styles.list_item_func__img}
                                src={Delete}
                                onClick={() => handleDelete(element)}
                                alt="Delete"
                            />
                            {/*<div data-id={element.id} onClick={() => handleSetEdit(element.id)}>Редагувати</div>*/}
                            {/*<div onClick={() => handleDelete(element)}>Видалити</div>*/}
                        </div>
                    </div>
                </div>
            ))}
            {!!selectedSubscription && <DeleteModal
                active={!!selectedSubscription}
                onDelete={onSubscriptionDelete}
                titles={selectedSubscription?.titles}
                title={TITLE_TYPES.PAYMENT}
                close={handleClose} />}
        </div>
    );
};

export default SubscriptionsList;