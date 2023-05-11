import React, {useState} from 'react';

import {useCoursesContext} from "../../../context/coursesContext";

import QuestionItem from "./QuestionItem/QuestionItem";
import DeleteModal from "../../common/DeleteModal/DeleteModal";
import {useParams} from "react-router-dom";
import {TITLE_TYPES} from "../../../constants/general";


export const QUIZ_TYPES = {
    MULTIPLE: "multiple",
    SINGLE: "single",
    OPEN: "open"
}

const QuestionList = ({ questions }) => {
    const { quizId } = useParams();
    const { deleteQuizQuestion } = useCoursesContext();

    const [selectedItem, setSelectedItem] = useState(null);

    const handleDeleteItem = (item) => {
        setSelectedItem(item)
    }

    const onDelete = async () => {
        await deleteQuizQuestion(quizId, selectedItem.id)
    }

    const onClose = () => setSelectedItem(null)

    return (
        <div>
            {questions?.map(question => <QuestionItem key={question.id} question={question} onDelete={handleDeleteItem} />)}

            {!!selectedItem && <DeleteModal
                titles={selectedItem.titles}
                title={TITLE_TYPES.QUESTION}
                active={!!selectedItem}
                close={onClose}
                onDelete={onDelete}
            />}
        </div>
    );
};

export default QuestionList;