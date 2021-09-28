<template>
  <div>
    <div class="album-cover">
      <img
        class="picUrl"
        :src="coverImgUrl + '?param=140y140'"
        :title="copywriter"
      />
      <div class="name">{{ name }}</div>
      <i v-if="playCount" class="el-icon-headset play-count">{{
        playCount | formatNumber
      }}</i>
      <i v-else-if="isNaN(time)" class="play-count">{{ time }}</i>
      <i v-else-if="!isNaN(time)" class="play-count">{{ time | formatDate }}</i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["coverImgUrl", "name", "time", "playCount", "copywriter"],
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.album-cover {
  width: 160px;
  border-radius: 10px;
  background: #eff4f8;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  .picUrl {
    width: 140px;
    border-radius: 8px;
    margin-bottom: 5px;
  }
  .name {
    font-size: 14px;
    font-weight: 600;
    width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .play-count {
    display: block;
    margin: 10px 0 4px;
    opacity: 0.58;
    font-size: 12px;
  }
  &:hover {
    box-shadow: -2px -2px 7px 2px #ffffff,
      3px 3px 5px 0px rgb(110 127 147 / 21%);
  }
  &:hover .name {
    background: linear-gradient(
      216deg,
      #98db9d 0%,
      #45c278 21%,
      #3b89d4 57%,
      #aa66e7 78%,
      #e96168 100%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>