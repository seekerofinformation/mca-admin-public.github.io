import React, {useState} from 'react';

import ThemeItem from "./ThemeItem/ThemeItem";
import DeleteModal from "../../common/DeleteModal/DeleteModal";

import {useCoursesContext} from "../../../context/coursesContext";

import styles from "../../../pages/TopicsPage/ThemeCourse.module.scss";

const ThemeList = () => {
    const { singleCourse: course, deleteCourseTopic } = useCoursesContext();

    const [selectedTopic, setSelectedTopic] = useState(null);

    const handleSetSelectedTopic = (topic) => setSelectedTopic(topic)

    const handleDeleteTheme = async () => {
        await deleteCourseTopic(course.id, selectedTopic.id);
    };

    return (
        <div className={styles.theme}>
            {course.topics?.map((topic) => (
                <ThemeItem
                    key={topic.id}
                    topic={topic}
                    onDelete={() => handleSetSelectedTopic(topic)}
                />
            ))}

            {!!selectedTopic && <DeleteModal
                active={!!selectedTopic}
                title={"тему"}
                titles={selectedTopic?.titles}
                close={() => setSelectedTopic(null)}
                onDelete={() => handleDeleteTheme(selectedTopic.id)}
            />}
        </div>
    );
};

export default ThemeList;