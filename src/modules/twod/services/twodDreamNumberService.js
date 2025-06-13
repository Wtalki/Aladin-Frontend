export const fetchTwodDreamNumbers = async (page = 1) => {
    const response = await fetch(`https://api.2dboss.com/api/v2/v1/threed/book?page=${page}`)
    if (!response.ok) throw new Error('Failed to fetch dream numbers')
    return response.json()
  }