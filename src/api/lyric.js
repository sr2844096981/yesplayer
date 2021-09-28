import request from "@/utils/request";

// 获取歌词
export function getLyric(id) {
    return request({
        url: `/lyric?id=${id}`,
        method: "get",
    });
}