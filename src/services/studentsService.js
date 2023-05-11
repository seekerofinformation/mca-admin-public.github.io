import HTTPService from "./HTTPService";

import {baseUrl} from "../api/baseUrl";

import {responseToJSONHandler} from "../utils/responseUtil";

export default class StudentsService {
    /**
     * Создать новый урок курса
     *
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async addStudent(data) {
        return await HTTPService.post(`${baseUrl}payment/`, data, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Создать новый урок курса
     *
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async getStudent(id) {
        return await HTTPService.get(`${baseUrl}student/${id}`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Создать новый урок курса
     *
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async getStudents() {
        return await HTTPService.get(`${baseUrl}student/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Обновить урок курса
     *
     * @param {string} studentId - ID quiz
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async editStudent(studentId, data) {
        return await HTTPService.patch(`${baseUrl}payment/${studentId}/`, JSON.stringify(data), { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Удалить тему курса по ID курса и ID темы
     *
     * @param {string} id - ID квиза
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией об удаленной теме курса
     */
    static async deleteStudent(id) {
        return await HTTPService.delete(`${baseUrl}payment/${id}/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error)
    }
}