<template>
  <div class="clearfix">
    <!-- 封面 -->
    <div class="block f-l cover-wrap">
      <img class="cover" :src="artist.cover+'?param=500y406'" />
      <span class="name">{{artist.name}}</span>
    </div>
    <div class="f-l" style="width: 560px;  margin-left: 50px">
      <!-- 信息 -->
      <el-descriptions >
        <el-descriptions-item label="单曲">{{
          artist.musicSize
        }}</el-descriptions-item>
        <el-descriptions-item label="专辑">{{
          artist.albumSize
        }}</el-descriptions-item>
        <el-descriptions-item label="MV">{{
          artist.mvSize
        }}</el-descriptions-item>
        <el-descriptions-item label="身份">
          <el-tag
            size="small"
            type="danger"
            effect="plain"
            v-for="item in secondaryExpertIdentiy"
            :key="item.expertIdentiyId"
            style="margin-right: 10px"
            >{{ item.expertIdentiyName }}</el-tag
          >
        </el-descriptions-item>
      </el-descriptions>
      <!-- 简介 -->
      <el-collapse>
        <el-collapse-item :title="artist.briefDesc">
          <div>
            {{ artist.briefDesc }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artist: {
      typeof: Array,
      default: () => {},
    },
    secondaryExpertIdentiy: {
      typeof: Array,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>

.cover-wrap {
  width: 500px;
  height: 200px;
  overflow: hidden;
  position: relative;
  border-radius: 16px;
  .cover {
    width: 500px;
    position: absolute;
    animation: moveCover 38s infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }
  .name{
    position: absolute;
    bottom: 0;
    right: 20px;
    color: #fff;
    font-weight: 800;
    font-size: 56px;
  }
}
@keyframes moveCover {
  from {
    top: 0;
  }
  to {
    top: -206px;
  }
}
</style>