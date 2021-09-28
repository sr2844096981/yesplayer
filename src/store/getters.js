const getters = {
    songId: state => state.player.songId,
    songList: state => state.player.songList,
    songUrl: state => state.player.songUrl,
    songDetail: state => state.player.songDetail,
    currentTime: state => state.player.currentTime,

}
export default getters