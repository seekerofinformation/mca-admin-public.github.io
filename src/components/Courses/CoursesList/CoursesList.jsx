import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

import CourseItem from "./CourseItem/CourseItem";
import DeleteModal from "../../common/DeleteModal/DeleteModal";

import {useCoursesContext} from "../../../context/coursesContext";

const CoursesList = () => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();

    const { courses, deleteCourse } = useCoursesContext();

    const handleCourseDelete = () => {
        deleteCourse(selectedCourse.id)
    }

    const handleSelectCourse = (course) => setSelectedCourse(course);
    const handleDeleteModalToggle = () => setDeleteModal(!deleteModal);
    const handleDeleteModalClose = () => setDeleteModal(false);

    const handleDeleteIconClick = (course) => {
        handleSelectCourse(course)
        handleDeleteModalToggle()
    }

    const handleEditIconClick = (courseId) => navigate(`/dashboard/courses/${courseId}/theme`)
    return (
        <div>
            {!!courses?.length && courses?.map(course => (
                <CourseItem
                    key={course.id}
                    onEdit={handleEditIconClick}
                    onDelete={handleDeleteIconClick}
                    {...course}
                />
            ))}

            {deleteModal && (
                <DeleteModal
                    active={deleteModal}
                    close={handleDeleteModalClose}
                    onDelete={handleCourseDelete}
                    title="курс"
                    titles={selectedCourse ? selectedCourse.titles : null}
                />
            )}
        </div>
    );
};

export default CoursesList;