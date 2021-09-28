<template>
  <div>
    <h2 class="page-title">Albums</h2>
    <!-- 分类列表 -->
    <div class="category">
      <el-button type="primary" plain size="small" @click="clickTags('全部')">全部</el-button>
      <el-button
        :type="activeTag===item.name?'primary':''"
        size="small"
        v-for="item in highqualityTags"
        :key="item.id"
        @click="clickTags(item.name)"
        >{{ item.name }}</el-button
      >
    </div>
    <div class="al-cover">
      <div class="item" v-for="item in album" :key="item.id" @click="goToAlbumDetailPage(item.id)">
        <AlCover
          :coverImgUrl="item.coverImgUrl"
          :name="item.name"
          :time="item.trackUpdateTime"
          :playCount="item.playCount"
          :copywriter="item.copywriter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AlCover from "@/components/al-cover";
import {
  getAlCatlist,
  getHighquality,
  getAlCatlistHot,
  getHighqualityPlaylist,
} from "@/api/album";
export default {
  components: { AlCover },
  data() {
    return {
      // 精品分类标签
      highqualityTags: [],
      // 选中的分类标签
      tags: [],
      // 歌单
      album: [],
      // 选中的tag
      activeTag:""
    };
  },
  mounted() {
    this.getHighquality();
    this.getHighqualityPlaylist("华语", 30);
  },
  methods: {
    // 获取歌单分类 tag
    async getAlCatlist() {
      const res = await getAlCatlist();
      console.log(res);
    },
    // 精品歌单 tag
    async getHighquality() {
      const res = await getHighquality();
      this.highqualityTags = res.tags;
      console.log(res);
    },
    // 热门歌单分类 tag
    async getAlCatlistHot() {
      const res = await getAlCatlistHot();
      console.log(res);
    },
    // 选择分类标签
    clickTags(tag) {
      this.getHighqualityPlaylist(tag, 30);
      this.activeTag = tag
    },
    // 获取精品歌单
    async getHighqualityPlaylist(tag, limit) {
      const res = await getHighqualityPlaylist(tag, limit);
      console.log(res.playlists);
      this.album = res.playlists;
    },
    // 跳转歌单详情
    goToAlbumDetailPage(id){
      console.log(id);
      this.$router.push({
        path: `/album_detail/${id}`,
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  .tag {
  }
}
.al-cover {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  .item {
    margin-right: 30px;
    margin-bottom: 30px;
  }
}
.el-button {
  margin: 5px;
}
</style>
