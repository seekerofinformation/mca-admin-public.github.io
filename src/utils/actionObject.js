export const handleDeleteObject = (id, data, setData, setActive) => {
  const newData = data.filter((element) => element.id !== id);
  setData(newData);
  setActive();
};

export  const handleEditObject = (event, setEdit, setEditButton, editButton) => {
  setEdit(Number(event.target.dataset.id));
  setEditButton(!editButton);
};