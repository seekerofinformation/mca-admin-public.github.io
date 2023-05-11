import React from 'react'
import { useDeleteFaqMutation, useGetFaqQuery } from '../../../store/Faq/faq.api';
import { useState } from 'react';
import DeleteModal from '../../../components/common/DeleteModal/DeleteModal';
import FaqItem from '../FaqItem/FaqItem';

const FaqList = () => {
  const {data: faq} = useGetFaqQuery();
  const [activeDelete, setActiveDelete] = useState(false);
  const [deleteFaq] = useDeleteFaqMutation();
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleEditToggle = () => setEdit(!edit);
  const handleDeleteModalToggle = () => setActiveDelete(!activeDelete);

  const handleDeleteFaq = async () => {
    await deleteFaq(selectedFaq.id);
  };

  const handleEditIconClick = (faq) => {
    handleEditToggle();
    setSelectedFaq(faq);
  };

  const handleDeleteIconClick = (faq) => {
    handleDeleteModalToggle();
    setSelectedFaq(faq);
  };


  return (
    <div>
      {!!faq?.entities?.length && faq?.entities?.map(faq => (
        <FaqItem
          key={faq.id}
          onEdit={handleEditIconClick}
          setSelectedFaq={setSelectedFaq}
          onDelete={handleDeleteIconClick}
          selectedFaq={selectedFaq}
          edit={edit}
          setEdit={setEdit}
          {...faq}
        />
      ))}
      {setActiveDelete && (
        <DeleteModal
          active={activeDelete}
          close={handleDeleteModalToggle}
          onDelete={handleDeleteFaq}
          titles={null}
          title={selectedFaq?.titles[0]?.text}
        />
      )}
    </div>
  )
}

export default FaqList
