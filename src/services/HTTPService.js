const httpHeaders = {
    "Content-Type": "application/json",
}

export default class HTTPService {
    static async get(url, headers) {
        return await fetch(url, {
            headers: {...httpHeaders, ...headers,},
        });
    }

    static async post(url, data, addHeaders) {
        const headers = {...httpHeaders, ...addHeaders}

        if (addHeaders["Content-Type"] === "multipart/form-data") {
            delete headers["Content-Type"]
        }

        return await fetch(url, {
            headers,
            body: headers["Content-Type"] === "application/json" ? JSON.stringify(data) : data,
            method: "POST",
        });
    }

    static async put(url, data, headers) {
        return await fetch(url, {
            headers: {...httpHeaders, ...headers},
            body: data,
            method: "PUT"
        });
    }

    static async patch(url, data, headers) {
        console.log(data)
        return await fetch(url, {
            headers: {...httpHeaders, ...headers},
            body: data,
            method: "PATCH",
        });
    }

    static async delete(url, headers) {
        return await fetch(url, {
            headers: {...httpHeaders, ...headers},
            method: "DELETE",
        });
    }
}
