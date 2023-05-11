import HTTPService from "./HTTPService";

import {baseFileUrl, baseUrl} from "../api/baseUrl";

import {responseToJSONHandler} from "../utils/responseUtil";

export default class LessonsService {
    /**
     * Создать новый урок курса
     *
     * @param {string} lessonId - ID урока
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async getLesson(lessonId) {
        return await HTTPService.get(`${baseUrl}lesson/${lessonId}`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Создать новый урок курса
     *
     * @param {string} topicId - ID темы
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async addTopicLesson(topicId, data) {
        return await HTTPService.post(`${baseUrl}topic/${topicId}/lesson/`, data, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Обновить урок курса
     *
     * @param {string} lessonId - ID урока
     * @param {Object} data - Данные нового урока курса
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией о новой теме курса
     */
    static async editTopicLesson(lessonId, data) {
        return await HTTPService.patch(`${baseUrl}lesson/${lessonId}/`, JSON.stringify(data), { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    /**
     * Удалить тему курса по ID курса и ID темы
     *
     * @param {string} id - ID lesson
     * @returns {Promise} Промис, который разрешается в JSON-данные с информацией об удаленной теме курса
     */
    static async deleteLesson(id) {
        return await HTTPService.delete(`${baseUrl}lesson/${id}/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error)
    }

    static async addLessonPart(lessonId, data) {
        return await HTTPService.post(`${baseUrl}lesson/${lessonId}/lesson_part/`, data, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    static async editLessonPart(id, data) {
        return await HTTPService.patch(`${baseUrl}lesson_part/${id}/`, JSON.stringify(data),{ "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    static async deleteLessonPart(id) {
        return await HTTPService.delete(`${baseUrl}lesson_part/${id}/`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    static async getFile(fileName) {
        return await HTTPService.get(`${baseFileUrl}${fileName}`, { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(res => res.blob())
            .then(blob => URL.createObjectURL(blob))
            .catch(console.error)
    }

    static async addFile(fileName, file) {
        return await HTTPService.post(`${baseUrl}upload_lesson_part_media/${fileName}/`, file, {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}`
        })
            .then(responseToJSONHandler)
            .catch(console.error)
    }
}