import Vue from 'vue'
import Vuex from 'vuex'
import { User } from '@/interfaces/user'
import userService from '@/services/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        isAppLoaded: false
    },
    mutations: {
        setUser(state: any, user: User) {
            state.user = user
        },
        setAppLoaded(state: any, isAppLoaded: boolean = false) {
            state.isAppLoaded = isAppLoaded
        },
        setBalance(state: any, balance) {
            state.user.balance = balance
        },
        setOverDraft(state: any, overdraft) {
            state.user.overdraft = overdraft
        }
    },
    actions: {
        async getUser({ commit }) {
            try {
                const response = await userService.show()

                if (response && response.status === 200) {
                    commit('setUser', response.data)
                    commit('setAppLoaded', true)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async updateUser({ commit, getters }) {
            try {
                const response = await userService.update(getters.getUser)

                if (response && response.status === 200) {
                    commit('setUser', response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    getters: {
        getUser: state => state.user,
        isAppLoaded: state => state.isAppLoaded
    }
})
