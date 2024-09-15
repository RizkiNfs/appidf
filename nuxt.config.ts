import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  vue: {
    propsDestructure: true,
  },
  compatibilityDate: '2024-08-21',
  runtimeConfig: {
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
  },
  css: [
    '@/assets/css/editor.css',
  ],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'radix-vue/nuxt',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
  ],
  googleFonts: {
    families: {
      'Lato': [400, 700],
      'Nunito Sans': [400, 700],
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})
