import styles from '../FaqPage.module.scss';
import Edit from '../../../images/icons/edit.svg';
import Delete from '../../../images/icons/delete.svg';
import { useEffect, useState } from 'react';
import ToggleSwitch from '../../../components/common/ToggleSwitch/ToggleSwitch';
import { useGetFaqByIdQuery, useUpdateFaqMutation } from '../../../store/Faq/faq.api';
import PageTitle from '../../../components/common/PageTitle/PageTitle';
import { TITLE_SIZES} from '../../../constants/titleSizes';
import AddFaq from '../AddFaq/AddFaq';

const FaqItem = ({ id, published, titles, onEdit, onDelete, edit, selectedFaq, setEdit}) => {
  const [checked, setCheked] = useState(published || false);
  const [updateFaq] = useUpdateFaqMutation();
  const {refetch} = useGetFaqByIdQuery(id);

  const updateChecked = async () => {
    setCheked(!published)
    await updateFaq({id , body: {published: !published}});
  };

  return (
    <div className={styles.list_container} key={id}>
      <div className={styles.list_item}>
        <div className={styles.list_item_title}>
          <PageTitle titles={titles} size={TITLE_SIZES.M}/>
        </div>
        <div className={styles.list_item_func}>
          <ToggleSwitch name="public" checked={checked} onChange={updateChecked} id={id} />
          <img
            src={Edit}
            data-id={id}
            className={styles.list_item_func__img}
            alt="Edit"
            onClick={() => {onEdit({id, published, titles}); refetch(); }}
          />
          <img
            className={styles.list_item_func__img}
            src={Delete}
            onClick={() => onDelete({id, published, titles})}
            alt="Delete"
          />
        </div>
      </div>
      {(edit && id === selectedFaq?.id) && (
        <AddFaq edit={true} id={id} setActiveButton={setEdit}/>
      )}
    </div>
  )
}

export default FaqItem;
