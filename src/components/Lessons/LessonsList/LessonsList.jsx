import React, {useState} from 'react';
import {useParams} from "react-router-dom";

import LessonItem from "./LessonItem/LessonItem";
import QuizItem from "./QuizItem/QuizItem";
import DeleteModal from "../../common/DeleteModal/DeleteModal";

import {useCoursesContext} from "../../../context/coursesContext";

export const ENTITY_TYPES = {
    LESSON: "урок",
    QUIZ: "квіз"
}

const LessonsList = ({ lessons }) => {
    const { themeId } = useParams()
    const { deleteLesson, deleteQuiz } = useCoursesContext();

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState("");

    const handleDeleteItem = (item, entity) => {
        setSelectedEntity(entity)
        setSelectedItem(item)
    }

    const onClose = () => {
        setSelectedItem(null);
        setSelectedEntity("")
    }

    const onDelete = async () => {
        selectedEntity === ENTITY_TYPES.LESSON ?
        await deleteLesson(themeId, selectedItem.id)
            :
            await deleteQuiz(themeId, selectedItem.id)
    }

    const handleLessonsRender = () => {
        const result = [];

        lessons.forEach(lesson => {
            result.push(<LessonItem key={lesson.id + ENTITY_TYPES.LESSON} lesson={lesson} onDelete={handleDeleteItem} />)
            Array.isArray(lesson?.quizes) && lesson?.quizes.forEach(quiz => result.push(<QuizItem key={quiz.id + ENTITY_TYPES.QUIZ} quiz={quiz} onDelete={handleDeleteItem} />))
        })

        return result
    }
    return (
        <div>
            {handleLessonsRender()}
            {!!selectedItem && <DeleteModal
                titles={selectedItem.titles}
                title={selectedEntity}
                active={!!selectedItem}
                close={onClose}
                onDelete={onDelete}
            />}
        </div>
    );
};

export default LessonsList;