import HTTPService from "./HTTPService";

import {baseUrl} from "../api/baseUrl";

import {responseToJSONHandler} from "../utils/responseUtil";

export default class SubscriptionsService {
    /**
     * Создать новый урок курса
     *
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async addSubscription(data) {
        return await HTTPService.post(`${baseUrl}payment/`, data, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Создать новый урок курса
     *
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async getSubscription(id) {
        return await HTTPService.get(`${baseUrl}payment/${id}`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Создать новый урок курса
     *
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async getSubscriptions() {
        return await HTTPService.get(`${baseUrl}payment/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Обновить урок курса
     *
     * @param {string} subscriptionId - ID quiz
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async editSubscription(subscriptionId, data) {
        return await HTTPService.patch(`${baseUrl}payment/${subscriptionId}/`, JSON.stringify(data), { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Удалить тему курса по ID курса и ID темы
     *
     * @param {string} id - ID квиза
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией об удаленной теме курса
     */
    static async deleteSubscription(id) {
        return await HTTPService.delete(`${baseUrl}payment/${id}/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error)
    }
}