import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './module/cart'
import user from './module/user'
import search from './module/search'

export default createStore({
    modules: {
        user,
        cart,
        search
    },
    // 配置插件
    plugins: [
        // 默认存储在localStorage
        createPersistedState({
            // 本地存储名字
            key: 'music',
            // 指定需要存储的模块
            paths: ['user', 'cart','search']
        })
    ]
})
