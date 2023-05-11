import React, { useState } from 'react';
import {useParams} from "react-router-dom";

import {useCoursesContext} from "../../../../../context/coursesContext";

import styles from "../ThemeItem.module.scss";
import InputField from "../../../../common/InputField/InputField";

const EditThemeItem = ({ topic }) => {
    const { courseId } = useParams()

    const [uaTopicTitle] = useState()

    const { editCourseTopic } = useCoursesContext();

    const handleSave = async () => {
        await editCourseTopic(courseId, topic.id)
    }
    return (
        <div className={styles.change}>
            {/*<InputField*/}
            {/*    symbol={500}*/}
            {/*    setInputEng={setDescEng}*/}
            {/*    setInputUkr={setDescUkr}*/}
            {/*    inputUkr={descUkr}*/}
            {/*    inputEng={descEng}*/}
            {/*    description={!!topic ? topic.description : null}*/}
            {/*/>*/}
            {/*<button onClick={() => {onChange(value, item.attributes); setEdit(false)}} className={styles.change_button}>Save</button>*/}
        </div>
    );
};

export default EditThemeItem;