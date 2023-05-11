import HTTPService from "./HTTPService";

import {baseUrl} from "../api/baseUrl";

import {responseToJSONHandler} from "../utils/responseUtil";

export default class TopicsService {
    /**
     * Получить топик по ID
     *
     * @param {string} id - ID топика
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async getCourseTopic(id) {
        return await HTTPService.get(`${baseUrl}topic/${id}`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Создать новую тему курса
     *
     * @param {string} id - ID курса
     * @param {Object} data - Данные новой темы курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async addCourseTopic(id, data) {
        return await HTTPService.post(`${baseUrl}course/${id}/topic/`, data, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Изменить текущую тему курса по ID курса и ID темы
     *
     * @param {string} courseId - ID курса
     * @param {string} topicId - ID темы курса
     * @param {Object} data - Новые данные темы курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией об измененной теме курса
     */
    static async editCourseTopic(courseId, topicId, data) {
        return await HTTPService.patch(`${baseUrl}topic/${topicId}/`, JSON.stringify(data), { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Удалить тему курса по ID курса и ID темы
     *
     * @param {string} courseId - ID курса
     * @param {string} topicId - ID темы курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией об удаленной теме курса
     */
    static async deleteCourseTopic(courseId, topicId) {
        return await HTTPService.delete(`${baseUrl}topic/${topicId}`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error)
    }
}