import request from "@/utils/request";

// 获取 热门歌手
export function hotArtist() {
    return request({
        url: "/top/artists?offset=0&limit=30",
        method: "get",
    });
}

// 获取歌手分类列表
/* 
type 取值: -1:全部  1:男歌手  2:女歌手  3:乐队
area 取值: -1:全部  7华语  96欧美  8:日本  16韩国  0:其他
name 字段开头为 b 或者拼音开头为 b 为顺序排列, 
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 
*/
export function artistClassification(type, area, initial, limit, offset) {
    if (limit === undefined) {
        limit = 30
    }
    if (offset === undefined) {
        offset = 0
    }
    return request({
        url: `/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`,
        method: "get",
    });
}

// 获取歌手描述
/* 
说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
*/
export function getArtistDesc(id) {
    return request({
        url: `/artist/desc?id=${id}`,
        method: "get",
    });
}

// 获取歌手详情
/* 
说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
 */
export function getArtistDetail(id) {
    return request({
        url: `/artist/detail?id=${id}`,
        method: "get",
    });
}

// 获取歌手全部歌曲
/* 
说明 : 调用此接口,可获取歌手全部歌曲 
必选参数 : id : 歌手 id
可选参数 : order : hot ,time 按照热门或者时间排序
limit: 取出歌单数量 , 默认为 50
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值 */

export function getSongsByArtist(id, order, offset) {
    if (offset === undefined) {
        offset = 0
    }
    if (order === "最新") {
        order = "time"
    } else {
        order = "hot"
    }
    return request({
        url: `/artist/songs?id=${id}&order=${order}&limit=20&offset=${offset}`,
        method: "get",
    });
}