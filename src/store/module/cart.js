const cart = {
    namespaced: true,
    state () {
        return {
            //英语车列表
            list: []
        }


    },
    getters: {
        listData(state) {
            return state.list
        }
    },
    mutations: {
        insert (state,payload) {
            let isAppend = true
            state.list.forEach((item,index) => {
                if(JSON.stringify(item) === JSON.stringify(payload)) {
                    state.list.splice(index,1)
                }
            })
            window.localStorage.setItem('music-list','true')
            state.list.splice(0,0,payload)
        },
        insertDel (state) {
            state.list = []
        },
        list (state,payload) {
            let list = state.list[payload]

            state.list.splice(payload,1)
            state.list.splice(0,0,list)

        },
        upList (state,payload) {
            state.list.forEach((item,index) => {
                if(JSON.stringify(item) === payload) {
                    let list = state.list[index]
                    state.list.splice(index,1)
                    state.list.splice(0,0,list)
                }
            })

        }
    },
    actions: {
        insert (context,payload) {
            context.commit('insert', payload)
        },
        list (context,payload) {
            context.commit('list',payload)
        },
        upList (context,payload) {
            context.commit('upList',payload)
        }
    }
}

export default cart
