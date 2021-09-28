// 格式化时间  => 02：32
export function timeFormat(time) {
    let minute = Math.floor((time % 3600) / 60);
    let second = Math.floor(time % 60);
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return `${minute}:${second}`;
}

// 格式化数zi  3848146 => 384.8万
export function formatNumber(n) {
    let num = Number(n);
    if (num > 0 && num < 10000) {
        return num + '';
    } else {
        return (num / 10000).toFixed(1) + '万';
    }
}

// 格式化日期 
export function formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    // return YY + MM + DD + " " + hh + mm + ss;
    return YY + MM + DD;
}