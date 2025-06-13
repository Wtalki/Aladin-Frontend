import axios from '@/libs/axios'

export const fetchTwodBetHistories = async (date, time, token) => {
    const params = {}
    if (date) params.date = date
    if (time && time !== 'all') params.time = time

    const response = await axios.get('/auth/twod-betting-history', {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
