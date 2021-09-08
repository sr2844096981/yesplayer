<template>
  <div>demo

      <img src="http://p1.music.126.net/w_vuv9hBWq2hlJxJcmJrjg==/109951166115915081.jpg?param=136y136" crossorigin="anonymous">

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted(){
      let img = document.querySelector('img')
        console.log(this.colorfulImg(img))
  },
  methods: {
    colorfulImg(imgEl) {
      let canvas = document.createElement("canvas"),
        context = canvas.getContext && canvas.getContext("2d"),
        height,
        width,
        length,
        data,
        i = -4,
        blockSize = 5,
        count = 0,
        rgb = { r: 0, g: 0, b: 0 };

      height = canvas.height = imgEl.height;
      width = canvas.width = imgEl.width;
      context.drawImage(imgEl, 0, 0);
      data = context.getImageData(0, 0, width, height).data;
      length = data.length;
      while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data[i];
        rgb.g += data[i + 1];
        rgb.b += data[i + 2];
      }
      rgb.r = ~~(rgb.r / count);
      rgb.g = ~~(rgb.g / count);
      rgb.b = ~~(rgb.b / count);
      return rgb;
    },
  },
};
</script>

<style>
</style>