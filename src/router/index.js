import Vue from 'vue'
import VueRouter from 'vue-router'




Vue.use(VueRouter)

const routes = [{ path: '/', redirect: '/home' }, {
        path: '/layout',
        name: 'Layout',
        component: () =>
            import ("@/views/layout"),
        children: [{
            path: '/home',
            name: 'Home',
            component: () =>
                import ("@/views/home"),
        }, {
            path: '/artists',
            name: 'Artists',
            component: () =>
                import ("@/views/artists"),
        }, {
            path: '/artist_list',
            name: 'ArtistList',
            component: () =>
                import ("@/views/artistList"),
        }, {
            path: '/artist_detail/:id',
            name: 'ArtistDetail',
            component: () =>
                import ("@/views/artistDetail"),
        }, {
            path: '/play_list',
            name: 'PlayList',
            component: () =>
                import ("@/views/playList"),
        }, {
            path: '/search/:keyword',
            name: 'Search',
            component: () =>
                import ("@/views/search"),
        }, {
            path: '/albums',
            name: 'Albums',
            component: () =>
                import ("@/views/albums"),
        }, {
            path: '/album_detail/:id',
            name: 'AlbumDetail',
            component: () =>
                import ("@/views/albumDetail"),
        }, {
            path: '/ranking',
            name: 'Ranking',
            component: () =>
                import ("@/views/ranking"),
        }, {
            path: '/mv/:id',
            name: 'Mv',
            component: () =>
                import ("@/views/mv"),
        }, {
            path: '/demo',
            name: 'Demo',
            component: () =>
                import ("@/views/demo"),
        }]
    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]


// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router