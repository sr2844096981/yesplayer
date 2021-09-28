<template>
  <div class="clearfix single">
    <img v-if="picUrl" :src="picUrl+'?param=90y90'" class="cover f-l" />
    <div class="info f-l">
      <div class="name">{{ name }}</div>
      <span v-if="copywriter" class="ar">
        {{ copywriter }}
      </span>
      <span v-else class="ar" v-for="(v, i) in artists" :key="v.id"
        >{{ v.name }}{{ i === artists.length - 1 ? "" : ", " }}</span
      >
    </div>
    <i class="el-icon-caret-right f-r"></i>
  </div>
</template>

<script>
export default {
  props: ["picUrl", "name", "artists", "copywriter"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.single {
  padding: 8px 20px;
  width: auto;
  border-radius: 6px;
  transition: all 0.6s;
  cursor: pointer;
  .cover {
    width: 50px;
    height: 50px;
  }
  .info {
    margin-left: 20px;
    margin-top: 10px;
    width: 260px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .name {
      font-weight: 600;
      font-size: 14px;
    }
    .ar {
      font-size: 12px;
      color: #6d7d8f;
    }
  }
  i {
    font-size: 20px;
    margin-top: 15px;
  }
  &:hover {
    background-color: #ececf3;
  }
}
</style>