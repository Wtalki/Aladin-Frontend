import { defineStore } from "pinia";
import { fetchTwodHolidays } from "@/modules/twod/services/twodHolidayService";

export const useTwodHolidayStore = defineStore("twodHoliday", {
    state: () => ({
        holidays: {},
        loading: false
    }),
    actions: {
        async loadHolidays() {
            this.loading = true;
            this.holidays = await fetchTwodHolidays();
            this.loading = false;
        }
    }
});
