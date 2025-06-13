<template>
    <Menu ref="languageMenu" :model="languageMenuItems" :popup="true" class="bg-secondary rounded-lg px-3">
        <template #item="{ item }">
            <div @click="changeLanguage(item.code)" class="my-2">
                <div class="cursor-pointer flex align-items-center">
                    <img alt="flag" :src="item.image" style="width: 1.5rem" />
                    <span class="ml-2 text-light">{{ item.label }}</span>
                </div>
            </div>
        </template>
    </Menu>
    <Button type="button" class="p-button-text h-full" @click="toggleLanguageMenu">
        <img alt="logo" :src="getFlagUrl()" style="width: 1.6rem" />
    </Button>
</template>
<script setup>
import { useLocaleStore } from '@/store/localeStore'
import { ref } from 'vue'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const localeStore = useLocaleStore()
const languageMenu = ref()
const languageMenuItems = ref([
    {
        label: 'မြန်မာ',
        image: require('@/assets/icons/mm.png'),
        code: 'mm'
    },
    {
        label: 'English',
        image: require('@/assets/icons/en.png'),
        code: 'en'
    }
])

const changeLanguage = (lang) => {
    locale.value = lang
    localeStore.setLocale(lang)
}

const getFlagUrl = () => {
    return localeStore.getLocale === 'mm' ? require('@/assets/icons/mm.png') : require('@/assets/icons/en.png')
}

const toggleLanguageMenu = (event) => {
    languageMenu.value.toggle(event)
}
</script>
