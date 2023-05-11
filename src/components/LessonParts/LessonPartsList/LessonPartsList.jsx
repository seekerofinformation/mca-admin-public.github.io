import React, {useState} from 'react';

import LessonPartItem from "./LessonPartItem/LessonPartItem";
import DeleteModal from "../../common/DeleteModal/DeleteModal";

import {useCoursesContext} from "../../../context/coursesContext";

const LessonPartsList = ({ lesson }) => {
    const { deleteLessonPart } = useCoursesContext();

    const [selectedLessonPart, setSelectedLessonPart] = useState(null);

    const handleSetSelectedTopic = (lessonPart) => setSelectedLessonPart(lessonPart)

    const handleDeleteLessonPart = async () => {
        await deleteLessonPart(lesson.id, selectedLessonPart.id);
    };

    return (
        <div>
            {lesson?.lessonParts?.map((lessonPart, index) => (
                <LessonPartItem
                    key={lessonPart.id}
                    index={index}
                    lessonPart={lessonPart}
                    onDelete={() => handleSetSelectedTopic(lessonPart)}
                />
            ))}

            {!!selectedLessonPart && <DeleteModal
                active={!!selectedLessonPart}
                title={"топік"}
                titles={selectedLessonPart?.titles}
                close={() => setSelectedLessonPart(null)}
                onDelete={() => handleDeleteLessonPart(selectedLessonPart.id)}
            />}
        </div>
    );
};

export default LessonPartsList;