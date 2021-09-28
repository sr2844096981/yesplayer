import { getSongUrl, getSongDetail } from "@/api/song";
import { Message } from "element-ui";

const state = {
    // 要播放歌曲的id
    songId: '',
    // 要播放的歌曲列表
    songList: [],
    // 要播放歌曲的URL
    songUrl: '',
    // 要播放歌曲的详情
    songDetail: [],
    // 歌曲播放的实时时间
    currentTime: 0,
}

const mutations = {
    setSongId(state, songId) {
        state.songId = songId
    },
    setSongList(state, songList) {
        state.songList = songList
    },
    setSongUrl(state, songUrl) {
        state.songUrl = songUrl
    },
    setSongDetail(state, songDetail) {
        state.songDetail = songDetail
    },
    setCurrentTime(state, currentTime) {
        state.currentTime = currentTime
    },

}

const actions = {
    // 获取歌曲url ,step
    async getSongUrl(context, id) {
        const res = await getSongUrl(id);
        if (res.data[0].url === null) return Message("亲爱的,暂无版权")
        context.commit('setSongUrl', res.data[0].url)
    },
    // 获取歌曲详情
    async getSongDetail(context, id) {
        const res = await getSongDetail(id);
        context.commit('setSongDetail', res.songs[0])
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}