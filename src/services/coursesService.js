import HTTPService from "./HTTPService";

import {baseUrl} from "../api/baseUrl";

import {responseToJSONHandler} from "../utils/responseUtil";

export default class CoursesService {
    /* =========== Courses =========== */
    /**
     * Получить все курсы
     *
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о всех курсах
     */
    static async getCourses() {
        return await HTTPService.get(`${baseUrl}courses/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Получить курс по его ID
     *
     * @param {string} id - ID курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о курсе
     */
    static async getCourse(id) {
        return await HTTPService.get(`${baseUrl}course/${id}/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Создать новый курс
     *
     * @param {Object} data - Данные о курсе
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о созданном курсе
     */
    static async addCourse(data) {
        return await HTTPService.post(`${baseUrl}courses/`, data, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Обновить название курса
     *
     * @param {string} id - ID курса
     * @param {Object} data - Данные о курсе
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о созданном курсе
     */
    static async editCourse(id, data) {
        return await HTTPService.patch(`${baseUrl}course/${id}/`, JSON.stringify(data), { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Удалить курс по его ID
     *
     * @param {string} id - ID курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией об удаленном курсе
     */
    static async deleteCourse(id) {
        return await HTTPService.delete(`${baseUrl}course/${id}/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /* =========== Course Description =========== */

    /**
     * Создать новое описание курса
     *
     * @param {string} id - ID курса
     * @param {Object} data - Данные нового описания курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новом описании курса
     */
    static async addCourseDescription(id, data) {
        return await HTTPService.post(`${baseUrl}course/${id}/description/`, data, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Изменить текущее описание курса по ID курса и ID описания
     *
     * @param {string} courseId - ID курса
     * @param {string} descriptionId - ID описания курса
     * @param {Object} data - Новые данные описания курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией об измененном описании курса
     */
    static async editCourseDescription(courseId, descriptionId, data) {
        return await HTTPService.patch(`${baseUrl}course/${courseId}/description/${descriptionId}/`, JSON.stringify(data), { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }
}