<template>
  <div class="clearfix">
    <h2 class="page-title">{{ keyword }}</h2>

    <el-row>
      <el-col :span="9">
        <div class="songlist">
          <!-- 单曲 -->
          <GroupTitle :componentInfo="recommendedSongInfo" />
          <div v-for="item in single" :key="item.id" @click="playsong(item.id)">
            <Single :name="item.name" :artists="item.artists" />
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <!-- 艺人 -->
        <GroupTitle :componentInfo="recommendedArInfo" />
        <GroupList :showArtists="artists" />
        <!-- 专辑 -->
        <GroupTitle :componentInfo="recommendedAlInfo" />
        <div class="al-cover">
          <div class="al-cover-item" v-for="item in al" :key="item.id">
            <AlCover
              :coverImgUrl="item.picUrl"
              :name="item.name"
              :time="item.publishTime"
            />
          </div>
        </div>
        <!-- 歌单 -->
        <GroupTitle :componentInfo="recommendedAlbumInfo" />
        <div class="al-cover">
          <div class="al-cover-item" v-for="item in album" :key="item.id">
            <AlbumCover
              :picUrl="item.coverImgUrl"
              :playCount="item.playCount"
              :name="item.name"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSearchRes } from "@/api/search";
import GroupList from "@/components/group-list";
import GroupTitle from "@/components/group-title";
import AlCover from "@/components/al-cover";
import Single from "@/components/single";
import AlbumCover from "@/components/album-cover";

export default {
  components: { GroupList, GroupTitle, AlCover, Single, AlbumCover },
  data() {
    return {
      // 搜索关键词
      keyword: this.$route.params.keyword,
      // 单曲标题组件
      recommendedSongInfo: {
        title: "单曲",
        icon: "el-icon-arrow-right",
      },
      // 艺人标题组件
      recommendedArInfo: {
        title: "艺人",
        icon: "el-icon-arrow-right",
      },
      // 专辑标题组件信息
      recommendedAlInfo: {
        title: "专辑",
        icon: "el-icon-arrow-right",
      },
      // 歌单标题组件信息
      recommendedAlbumInfo: {
        title: "歌单",
        icon: "el-icon-arrow-right",
      },
      // 歌手
      artists: [],
      // 专辑
      al: [],
      // 单曲
      single: [],
      // 歌单
      album: [],
    };
  },
  created() {
    this.getSearchAr(this.keyword, 3);
    this.getSearchSong(this.keyword, 14);
    this.getSearchAl(this.keyword, 3);
    this.getSearchAlbum(this.keyword, 3);
  },
  methods: {
    /* 
     type: 搜索类型；, 
     1: 单曲, 
     10: 专辑, 
     100: 歌手, 
     1000: 歌单, 
     1002: 用户, 
     1004: MV, 
     1006: 歌词, 
     1009: 电台, 
     1014: 视频, 
     1018:综合
*/
    // 歌手
    async getSearchAr(keyword, limit) {
      const res = await getSearchRes(keyword, 100, limit);
      this.artists = res.result.artists;
    },
    // 专辑
    async getSearchAl(keyword, limit) {
      const res = await getSearchRes(keyword, 10, limit);
      this.al = res.result.albums;
    },
    // 单曲
    async getSearchSong(keyword, limit) {
      const res = await getSearchRes(keyword, 1, limit);
      this.single = res.result.songs;
    },
    //  歌单
    async getSearchAlbum(keyword, limit) {
      const res = await getSearchRes(keyword, 1000, limit);
      this.album = res.result.playlists;
    },
    // 播放单曲
    playsong(id) {
      this.$store.commit("player/setSongId", id);
      this.$store.dispatch("player/getSongUrl", id);
      this.$store.dispatch("player/getSongDetail", id);
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.keyword = to.params.keyword;
    this.getSearchAr(this.keyword, 3);
    this.getSearchSong(this.keyword, 10);
    this.getSearchAl(this.keyword, 3);
    this.getSearchAlbum(this.keyword, 10);
  },
};
</script>

<style lang="scss" scoped>
.songlist {
  width: 360px;
  margin-right: 50px;
}
.al-cover {
  display: flex;
  margin-bottom: 60px;
  .al-cover-item {
    margin-right: 30px;
  }
}
</style>
