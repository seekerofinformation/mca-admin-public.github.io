import {createContext, useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import CoursesService from "../services/coursesService";
import TopicsService from "../services/topicsService";
import LessonsService from "../services/lessonsService";
import QuizService from "../services/quizService";

export const CoursesContext = createContext(null)

const CoursesContextProvider = ({
    children
}) => {
    const [courses, setCourses] = useState([]);
    const [singleCourse, setSingleCourse] = useState(null);
    const [singleTopic, setSingleTopic] = useState(null);
    const [singleLesson, setSingleLesson] = useState(null);
    const [singleQuiz, setSingleQuiz] = useState(null);

    const location = useLocation()

    const getCourses = async () => {
        try {
            const result = await CoursesService.getCourses();

            setCourses(result)
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const getCourse = async (id) => {
        try {
            const course = await CoursesService.getCourse(id);

            setSingleCourse(course);
            return course
        } catch (e) {
            console.log(e)
        }
    }

    const addCourse = async (data) => {
        try {
            const result = await CoursesService.addCourse(data) // Массив курсов обновленный

            setCourses(result)
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const editCourse = async (id, data) => {
        try {
            const result = await CoursesService.editCourse(id, data)

            setSingleCourse(result)
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const deleteCourse = async (id) => {
        try {
            const courses = await CoursesService.deleteCourse(id);

            setCourses(courses)
            return courses
        } catch (e) {
            console.log(e)
        }
    }

    const addCourseDescription = async (id, data) => {
        try {
            const result = await CoursesService.addCourseDescription(id, data)

            setSingleCourse(result)
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const editCourseDescription = async (courseId, descriptionId, data) => {
        try {
            const result = await CoursesService.editCourseDescription(courseId, descriptionId, data)

            setSingleCourse(result)
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const getCourseTopic = async (id) => {
        try {
            const topic = await TopicsService.getCourseTopic(id)

            setSingleTopic(topic)

            return topic
        } catch (e) {
            console.log(e)
        }
    }

    const addCourseTopic = async (id, data) => {
        try {
            const course = await TopicsService.addCourseTopic(id, data);

            setSingleCourse(course)
            return course
        } catch (e) {
            console.log(e)
        }
    }

    const editCourseTopic = async (courseId, topicId, data) => {
        try {
            const course = await TopicsService.editCourseTopic(courseId, topicId, data);

            setSingleCourse(course)
            return course
        } catch (e) {
            console.log(e)
        }
    }

    const deleteCourseTopic = async (courseId, topicId) => {
        try {
            const course = await TopicsService.deleteCourseTopic(courseId, topicId);

            setSingleCourse(course)
            return course;
        } catch (e) {
            console.log(e)
        }
    }

    const getLesson = async (lessonId) => {
        try {
            const lesson = await LessonsService.getLesson(lessonId)

            setSingleLesson(lesson)
            return lesson
        } catch (e) {
            console.log(e)
        }
    }

    const addLesson = async (topicId, data) => {
        try {
            const result = await LessonsService.addTopicLesson(topicId, data);

            setSingleTopic(await getCourseTopic(topicId))

            return result;
        } catch (e) {
            console.log(e)
        }
    }

    const editLesson = async (topicId, lessonId,  data) => {
        try {
            const result = await LessonsService.editTopicLesson(lessonId, data);

            setSingleTopic(await getCourseTopic(topicId))

            return result;
        } catch (e) {
            console.log(e)
        }
    }


    const deleteLesson = async (topicId, id) => {
        try {
            await LessonsService.deleteLesson(id);

            setSingleTopic(await getCourseTopic(topicId))
        } catch (e) {
            console.log(e)
        }
    }

    const getQuiz = async (quizId) => {
        try {
            const result = await QuizService.getQuiz(quizId);

            setSingleQuiz(result)
            return result;
        } catch (e) {
            console.log(e)
        }
    }

    const addQuiz = async (topicId, data) => {
        try {
            const result = await QuizService.addQuiz(data);

            setSingleTopic(await getCourseTopic(topicId))


            return result;
        } catch (e) {
            console.log(e)
        }
    }

    const editQuiz = async (topicId, quizId,  data) => {
        try {
            const result = await QuizService.editQuiz(quizId, data);

            setSingleTopic(await getCourseTopic(topicId))

            return result;
        } catch (e) {
            console.log(e)
        }
    }

    const deleteQuiz = async (topicId, id) => {
        try {
            await QuizService.deleteQuiz(id);

            setSingleTopic(await getCourseTopic(topicId))
        } catch (e) {
            console.log(e)
        }
    }

    const addQuizQuestion = async (quizId, data) => {
        try {
            const result = await QuizService.addQuestion(quizId, data);

            setSingleQuiz(await getQuiz(quizId))
            return result;
        } catch (e) {
            console.log(e)
        }
    }

    const editQuizQuestion = async (quizId, questionId,  data) => {
        try {
            const result = await QuizService.editQuestion(quizId, questionId, data);

            setSingleQuiz(await getQuiz(quizId))
            return result;
        } catch (e) {
            console.log(e)
        }
    }

    const deleteQuizQuestion = async (quizId, questionId) => {
        try {
            const result = await QuizService.deleteQuestion(questionId);

            setSingleQuiz(await getQuiz(quizId))
            return result;
        } catch (e) {
            console.log(e)
        }
    }

    const createLessonPart = async (lessonId, data) => {
        try {
            const result = await LessonsService.addLessonPart(lessonId, data)

            setSingleLesson(await getLesson(lessonId))
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const updateLessonPart = async (lessonId, id, data) => {
        try {
            const result = await LessonsService.editLessonPart(id, data)

            setSingleLesson(await getLesson(lessonId))
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const deleteLessonPart = async (lessonId, id) => {
        try {
            const result = await LessonsService.deleteLessonPart(id)

            setSingleLesson(await getLesson(lessonId))
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const getFile = async (fileName) => {
        try {
            return await LessonsService.getFile(fileName);
        } catch (e) {
            console.log(e)
        }
    }

    const addFile = async (fileName, file) => {
        try {
            return await LessonsService.addFile(fileName, file)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSendBasicRequest = async () => {
        const path = location.pathname.split("/").at(-1)
        switch (path) {
            case path.replaceAll("/", ""):
                await getCourses()
                return

            default:
                return
        }
    }

    useEffect(() => {
        handleSendBasicRequest()
    }, []);
    return (
        <CoursesContext.Provider
            value={{
                courses,
                singleQuiz,
                singleTopic,
                singleCourse,
                singleLesson,
                getCourse,
                addCourse,
                deleteCourse,
                editCourse,
                addCourseDescription,
                editCourseDescription,
                getCourseTopic,
                addCourseTopic,
                editCourseTopic,
                deleteCourseTopic,
                getLesson,
                addLesson,
                editLesson,
                getQuiz,
                addQuiz,
                editQuiz,
                deleteQuiz,
                deleteLesson,
                addQuizQuestion,
                editQuizQuestion,
                deleteQuizQuestion,
                getFile,
                addFile,
                createLessonPart,
                updateLessonPart,
                deleteLessonPart
            }}
        >
            {children}
        </CoursesContext.Provider>
    )
}

function useCoursesContext() {
    const context = useContext(CoursesContext)
    if (context === undefined) {
        throw new Error(
            'useCoursesContext must be user within an CoursesContext Provider',
        )
    }

    return context
}

export { CoursesContextProvider, useCoursesContext }
