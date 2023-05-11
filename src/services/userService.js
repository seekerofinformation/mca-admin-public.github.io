import HTTPService from "./HTTPService";

import {baseUrl} from "../api/baseUrl";

import {responseToJSONHandler} from "../utils/responseUtil";

export default class UserService {
    static async login(data) {
        return await HTTPService.post(`${baseUrl}login/`, data)
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    static async logout() {
        return await HTTPService.post(`${baseUrl}logout/`, "", { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    static async update(userId, data) {
        return await HTTPService.patch(`${baseUrl}admin/${userId}/`, JSON.stringify(data), { "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}` })
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    static async emailSend(data) {
        return await HTTPService.post(`${baseUrl}change_password/`, data)
            .then(responseToJSONHandler)
            .catch(console.error);
    }

    static async passwordChange(data) {
        return await HTTPService.patch(`${baseUrl}change_password/`, JSON.stringify(data))
            .then(responseToJSONHandler)
            .catch(console.error);
    }

}