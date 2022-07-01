import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('../views/home/index.vue')
const Player = () => import('../views/player/index.vue')
const Login = () => import('../views/login/index.vue')
const Special = () => import('../views/special/index.vue')
const FromSong = () => import('../views/fromSong/index.vue')
const MV = () => import('../views/MV/index.vue')
const Station = () => import('../views/station/index.vue')
const allSinger = () => import('../views/allSinger/index.vue')
const allDvd = () => import('../views/allDvd/index.vue')
const search = () => import('../views/search/index.vue')
const specialSingle = () => import('../views/special-single/index.vue')
const singerHome = () => import('../views/singer-home/index.vue')
const albumSingle = () => import('../views/album-single/index.vue')
const videoPlayer = () => import('../views/video-player/index.vue')
// 路由规则
const routes = [
    // 一级路由布局容器
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/player/:id', component: Player },
    { path: '/login', component: Login },
    { path: '/special', component: Special },
    { path: '/fromSong', component: FromSong },
    { path: '/fromMV', component: MV },
    { path: '/fmweb', component: Station },
    { path: '/singer', component: allSinger },
    { path: '/album', component: allDvd },
    { path: '/search/:name', component: search,
        props(route) {
            return {name:route.params.name}
        }
    },
    { path: '/special/single/:singleId', component: specialSingle },
    { path: '/singer/home/:singerId', component: singerHome },
    { path: '/album/single/:albumId', component: albumSingle },
    { path: '/video/player/:playerId', component: videoPlayer }

]

const router = createRouter({
    // 使用hash的路由模式
    history: createWebHashHistory(),
    routes,

})


export default router
