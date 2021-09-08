//返回图片主色
//必传 ：img节点
export function imgMainColor(imgEl) {
    let canvas = document.createElement('canvas');
    canvas.height = imgEl.naturalHeight;
    canvas.width = imgEl.naturalWidth;
    let context = canvas.getContext && canvas.getContext('2d');
    context.drawImage(imgEl, 0, 0);
    const data = context.getImageData(0, 0, imgEl.naturalWidth, imgEl.naturalHeight).data;

    let i = 0;
    let count = 0;
    let rgb = {
        r: 0,
        g: 0,
        b: 0
    };
    while (i < data.length) {
        rgb.r += data[i];
        rgb.g += data[i + 1];
        rgb.b += data[i + 2];
        count++;
        i += 4;
    }
    rgb.r = Math.round(rgb.r / count);
    rgb.g = Math.round(rgb.g / count);
    rgb.b = Math.round(rgb.b / count);

    return rgb;
}