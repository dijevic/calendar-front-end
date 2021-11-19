const baseUrl = process.env.REACT_APP_API_URL

export const fetchWithNotToken = (data, method = 'GET', endPoind) => {
    const url = `${baseUrl}${endPoind}`
    console.log(url)
    if (method === 'GET') {
        return fetch(url)
    }

    return fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}
export const fetchWithToken = (data, method = 'GET', endPoind) => {
    const url = `${baseUrl}${endPoind}`
    const token = localStorage.getItem('token') || ''
    if (method === 'GET') {
        return fetch(url, {
            headers: {
                'x-token': token
            }
        })
    }

    return fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', 'x-token': token }
    })
}