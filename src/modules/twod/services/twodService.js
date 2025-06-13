export async function fetchTwodResults() {
    try {
        const response = await fetch(`https://luke.2dboss.com/api/luke/twod-result-live`);
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error('Error fetching 2D results:', error);
        return null;
    }
}
