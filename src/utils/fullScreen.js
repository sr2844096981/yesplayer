// 切换全屏
// el 被全屏的元素
// let el = document.querySelector(".lyric");

export function fullScreen(el) {
    var isFullscreen =
        document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen;
    if (!isFullscreen) {
        //进入全屏,多重短路表达式
        (el.requestFullscreen && el.requestFullscreen()) ||
        (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
        (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) ||
        (el.msRequestFullscreen && el.msRequestFullscreen());
    } else {
        //退出全屏,三目运算符
        document.exitFullscreen ?
            document.exitFullscreen() :
            document.mozCancelFullScreen ?
            document.mozCancelFullScreen() :
            document.webkitExitFullscreen ?
            document.webkitExitFullscreen() :
            "";
    }
}