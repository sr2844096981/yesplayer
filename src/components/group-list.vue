<template>
  <div>
    <div class="group-list">
      <div class="group-col" v-for="(item, index) in showArtists" :key="index">
        <div class="group-wrap" @click="clickGroupItem(item.id)">
          <div class="group-item">
            <el-image
              :src="item.picUrl + '?param=136y136'"
              class="group-item-pic"
              fit="cover"
              lazy
            ></el-image>
            <p class="name">{{ item.name }}</p>
            <p class="alias">{{ item.alias[0] }}</p>
          </div>
          <div class="group-item-bg">
            <el-image class="bg" :src="item.picUrl + '?param=136y136'" lazy></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showArtists: {
      typeof: Array,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    clickGroupItem(id) {
      this.$emit("goToArtistDetailPage", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.group-list {
  width: 100%;
  margin-bottom: 60px;
  display: flex;
  .group-col {
    margin-right: 40px;
  }
}
.group-wrap {
  position: relative;
  width: 136px;
  height: 192px;
  transition: all 0.6s;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 9px 15px 5px rgb(0 0 0 / 20%);
  }
  .group-item {
    position: absolute;
    width: 136px;
    height: 192px;
    border-radius: 8px;
    z-index: 1;
    overflow: hidden;
  }
  .group-item-bg {
    position: absolute;
    top: 0;
    width: 136px;
    height: 192px;
    border-radius: 8px;
    overflow: hidden;
    .bg {
      width: 100%;
      height: 100%;
      filter: blur(16px);
    }
  }
}
.group-item {
  text-align: center;
  color: #fff;
  white-space: nowrap;
  .name {
    font-weight: 600;
    margin-top: 10px;
    line-height: 22px;
  }
  .alias {
    font-size: 12px;
  }
}
</style>