import axios from '@/libs/axios'

export const getWinners = async (token) => {
    const response = await axios.get('/auth/twod-winners', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
