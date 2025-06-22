const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'libs/i18n/locales',
            enableLegacy: true,
            runtimeOnly: false,
            compositionOnly: true,
            fullInstall: true
        }
    },

    pwa: {
        name: 'Aladin',
        themeColor: '#0092EF',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        manifestOptions: {
            short_name: 'Aladin',
            description: 'Myanmar Gambling Platform',
            icons: [
                {
                    src: '/icons/maskable_icon_x48.png',
                    sizes: '48x48',
                    type: 'image/png'
                },
                {
                    src: '/icons/maskable_icon_x72.png',
                    sizes: '72x72',
                    type: 'image/png'
                },
                {
                    src: '/icons/maskable_icon_x96.png',
                    sizes: '96x96',
                    type: 'image/png'
                },
                {
                    src: '/icons/maskable_icon_x128.png',
                    sizes: '128x128',
                    type: 'image/png'
                },
                {
                    src: '/icons/maskable_icon_x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: '/icons/maskable_icon_x384.png',
                    sizes: '384x384',
                    type: 'image/png'
                },
                {
                    src: '/icons/maskable_icon_x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable'
                }
            ]
        },
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true
        }
    }
})
