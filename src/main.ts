import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCompositionAPI, { getCurrentInstance, onBeforeMount } from '@vue/composition-api'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

new Vue({
    setup() {
        onBeforeMount(async () => {
            const { proxy } = getCurrentInstance() as any
            await proxy.$store.dispatch('getUser')
        })
    },
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
