import request from "@/utils/request";

// 获取 歌曲url
export function getSongUrl(id) {
    return request({
        url: `/song/url?id=${id}`,
        method: "get",
    });
}

// 获取歌曲详情
export function getSongDetail(id) {
    return request({
        url: `/song/detail?ids=${id}`,
        method: "get",
    });
}

// 音乐是否可用
// 说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }

export function checkSong(id) {
    return request({
        url: `/check/music?id=${id}`,
        method: "get",
    });
}