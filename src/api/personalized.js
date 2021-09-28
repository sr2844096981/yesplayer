import request from "@/utils/request";

/* 推荐歌单 */
export function getRecommendedSonglist() {
    return request({
        url: "/personalized?limit=20",
        method: "get",
    });
}

/* 推荐新音乐 */
// 可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)

export function getRecommendedNewsong() {
    return request({
        url: "/personalized/newsong?limit=12",
        method: "get",
    });
}

/* 推荐电台 */
export function getRecommendedDjprogram() {
    return request({
        url: "/personalized/djprogram",
        method: "get",
    });
}

/* 推荐 mv */
export function getRecommendedMv() {
    return request({
        url: "/personalized/mv",
        method: "get",
    });
}