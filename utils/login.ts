const apiURI = process.env.NEXT_PUBLIC_API_URL

export const login = async (email: string, password: string) => {
    const response = await fetch(`${apiURI}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
            })
    })
    .catch(() => {})

    return response
}