import { ref, onMounted } from "vue";
import { fetchTwodHolidays } from "@/modules/twod/services/twodHolidayService";

export function useTwodHoliday() {
    const holidays = ref({});
    const loading = ref(false);

    const fetchData = async () => {
        loading.value = true;
        holidays.value = await fetchTwodHolidays();
        loading.value = false;
    };

    onMounted(fetchData);

    return { holidays, loading };
}
