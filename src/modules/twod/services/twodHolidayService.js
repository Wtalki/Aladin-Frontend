export async function fetchTwodHolidays() {
    try {
        const response = await fetch("https://api.2dboss.com/api/lv/holiday_list");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching holiday data:", error);
        return { data: [] };
    }
}
