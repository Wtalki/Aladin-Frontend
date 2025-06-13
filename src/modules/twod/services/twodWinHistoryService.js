import axios from '@/libs/axios'

export const getTwodWinHistory = async (token) => {
    const response = await axios.get('/auth/twod-win-history', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
