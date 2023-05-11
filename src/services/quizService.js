import HTTPService from "./HTTPService";

import {baseUrl} from "../api/baseUrl";

import {responseToJSONHandler} from "../utils/responseUtil";

export default class QuizService {
    /**
     * Создать новый урок курса
     *
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async addQuiz(data) {
        return await HTTPService.post(`${baseUrl}quiz/`, data, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Создать новый урок курса
     *
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async getQuiz(quizId) {
        return await HTTPService.get(`${baseUrl}quiz/${quizId}`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Обновить урок курса
     *
     * @param {string} quizId - ID quiz
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async editQuiz(quizId, data) {
        return await HTTPService.patch(`${baseUrl}quiz/${quizId}/`, JSON.stringify(data), { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Удалить тему курса по ID курса и ID темы
     *
     * @param {string} id - ID квиза
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией об удаленной теме курса
     */
    static async deleteQuiz(id) {
        return await HTTPService.delete(`${baseUrl}quiz/${id}/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error)
    }

    /**
     * Создать новый урок курса
     *
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async addQuestion(quizId, data) {
        return await HTTPService.post(`${baseUrl}quiz/${quizId}/question/`, data, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Обновить урок курса
     *
     * @param {string} quizId - ID quiz
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async editQuestion(quizId, questionId, data) {
        return await HTTPService.patch(`${baseUrl}quiz/question/${questionId}/`, JSON.stringify(data), { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Обновить урок курса
     *
     * @param {string} questionId - ID quest
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async deleteQuestion(questionId) {
        return await HTTPService.delete(`${baseUrl}quiz/question/${questionId}/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }
}