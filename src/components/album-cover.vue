<template>
  <div>
    <div class="album-cover">
      <img class="picUrl" :src="picUrl + '?param=140y140'" />
      <i class="el-icon-headset play-count">{{ playCount | formatNumber }}</i>
      <div class="name">{{ name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:["picUrl","playCount","name"],
  data() {
    return {};
  },
  created(){

  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.album-cover {
  cursor: pointer;
  .picUrl {
    border-radius: 8px;
  }
  .name {
    font-size: 14px;
    font-weight: 600;
    width: 140px;
  }
  .play-count {
    display: block;
    margin: 10px 0 4px;
    font-weight: 600;
    opacity: 0.58;
    font-size: 12px;
  }
}
</style>