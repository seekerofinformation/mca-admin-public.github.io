export const responseToJSONHandler = (res) => {
    if (res.ok) {
        return res.json()
    } else {
        throw new Error(res.statusText)
    }
}