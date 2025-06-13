export const getTwodResults = async () => {
    const res = await fetch('https://api.2dboss.com/api/lv/bkk_twod_result')
    if (!res.ok) throw new Error('Failed to fetch 2D results')
    const json = await res.json()
    return json.data
}