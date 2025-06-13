import { defineStore } from "pinia";
import homeService from './homeService'

export const useHome = defineStore("home",{
    state:() => ({
        categories:[],
    }),
    actions:{
        async getCategory(){
            const res = await homeService.getCategories()
            console.log(res);
        }
    }
})