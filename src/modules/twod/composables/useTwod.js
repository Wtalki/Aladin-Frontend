import { ref, onMounted, onUnmounted } from "vue";
import { fetchTwodResults } from "@/modules/twod/services/twodService";

export function useTwod() {
    const value = ref(null);
    const showAlert = ref(false);
    let interval = null;

    const fetchData = async () => {
        value.value = await fetchTwodResults();
    };

    const timeFormat = (time) => {
        const formatMap = {
            1100: "11:00 AM",
            1200: "12:01 PM",
            300: "03:00 PM",
            430: "04:30 PM"
        };
        return formatMap[time] || time;
    };

    onMounted(() => {
        fetchData();
        interval = setInterval(fetchData, 2000);
    });

    onUnmounted(() => {
        clearInterval(interval);
    });

    return {
        value,
        showAlert,
        timeFormat
    };
}