const search = {
    namespaced: true,
    state () {
        return {
            //英语车列表
            search: []
        }
    },
    getters: {
        searchData(state) {
            return state.search
        }
    },
    mutations: {
        insert (state,payload) {
            let isAppend = true
            state.search.forEach(item => {
                if(item === payload) {
                    isAppend = false
                }
            })
            if(isAppend) {
                if(state.search.length === 6) {
                    state.search.splice(5,1)
                }
                state.search.splice(0,0,payload)
            }
        },
        insertDel (state) {
            state.search = []
        }
    },
    actions: {
        insert (context,payload) {
            context.commit('insert', payload)
        }
    }
}

export default search
