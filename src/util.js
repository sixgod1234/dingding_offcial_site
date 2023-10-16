export const localParse = (name) => {
    try {
        const data = localStorage.getItem(name)
        if (data === 'undefined') {
            return undefined
        }
        if (data === 'null') {
            return null
        }
        return JSON.parse(localStorage.getItem(name))
    } catch (err) {
        return undefined
    }
}