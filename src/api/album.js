import request from "@/utils/request";

// 获取 歌单分类 tag
export function getAlCatlist() {
    return request({
        url: "/playlist/catlist",
        method: "get",
    });
}

// 精品歌单标签列表 tag
export function getHighquality() {
    return request({
        url: "/playlist/highquality/tags",
        method: "get",
    });
}

// 热门歌单分类 tag
export function getAlCatlistHot() {
    return request({
        url: "/playlist/hot",
        method: "get",
    });
}

// 获取精品歌单
/*
说明 : 调用此接口 , 可获取精品歌单
可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
limit: 取出歌单数量 , 默认为 20
before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
*/

export function getHighqualityPlaylist(tag, limit) {
    return request({
        url: `/top/playlist/highquality?cat=${tag}&limit=${limit}`,
        method: "get",
    });
}


// 获取歌单详情
// 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
export function getPlaylistDetail(id) {
    return request({
        url: `/playlist/detail?id=${id}`,
        method: "get",
    });
}


// 获取所有榜单 
export function getToplist() {
    return request({
        url: "/toplist",
        method: "get",
    });
}