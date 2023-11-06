import { createApp } from 'vue'
const app = createApp(App)

import { VueQueryPlugin } from '@tanstack/vue-query'
app.use(VueQueryPlugin)

import vue3GoogleLogin from 'vue3-google-login'
app.use(vue3GoogleLogin, {
  clientId:
    '3463389808-908bqc6ofbc7eu9lrs14k3sni46akauu.apps.googleusercontent.com',
})

import router from './router'
app.use(router)

import App from './App.vue'
app.mount('#app')
