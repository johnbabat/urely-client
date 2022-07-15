import { useDataLayerValue } from "../context/userContext"

const apiURI = process.env.NEXT_PUBLIC_API_URL

export const validateAccess = async () => {
    const response = await fetch(`${apiURI}/auth/validate`, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    })
    .catch(() => {})

    if (response && response.status == 200) {
        const data = await response.json()
        localStorage.setItem('urrlUser', JSON.stringify(data))
        return {
            success: true,
            data: data
        }
    }
    localStorage.removeItem('urrlUser')
    return {
        success: false
    }
}