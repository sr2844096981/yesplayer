import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import layout from './modules/layout'
import player from './modules/player'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        layout,
        player
    },
    getters
})

export default store