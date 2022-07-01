export default {
    namespaced: true,
    state() {
        return {
            profile: {
                token: '',
                cookie: '',
                nickname: '',
                userId: '',
                id: ''
            }
        }
    },
    mutations: {
        insert(state,payload) {
            state.profile = payload
        }
    },
    actions: {
        insert(context,payload) {
            context.commit('insert',payload)

        }
    }
}
