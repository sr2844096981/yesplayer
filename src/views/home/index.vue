<template>
  <div class="home">
    <h2 class="page-title">Home</h2>
    <!-- 推荐歌单 -->
    <div class="rec-songlist">
      <GroupTitle
        :componentInfo="recommendedSonglistInfo"
        @clickGroupTitleBtn="replaceSonglist"
      />
      <div class="rec-s-wrap">
          <div class="res-s-item" v-for="item in showRecommendedSonglist" :key="item.id" @click="goToAlbumDetailPage(item.id)">
            <AlbumCover
              :picUrl="item.picUrl"
              :playCount="item.playCount"
              :name="item.name"
            />
          </div>
      </div>
    </div>
    <div class="clearfix">
      <div class="f-l new-song">
        <!-- 推荐新歌 -->
        <GroupTitle :componentInfo="recommendedNewsongInfo" />
        <div
          class="new-song-item clearfix"
          v-for="item in recommendedNewsong"
          :key="item.id"
          @click="playsong(item.id)"
        >
          <Single
            :picUrl="item.picUrl"
            :name="item.name"
            :artists="item.song.artists"
          />
        </div>
      </div>
      <div class="f-l djprogram">
        <!-- 推荐MV -->
        <GroupTitle :componentInfo="recommendedMVInfo" />
        <div class="clearfix">
          <div
            class="djprogram-item"
            v-for="item in recommendedMV"
            :key="item.id"
            @click="goToMvPage(item.id)"
          >
            <img :src="item.picUrl + '?param=200y113'" alt="" />
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
        <!-- 推荐电台 -->
        <div class="new-song">
          <GroupTitle :componentInfo="recommendedDjprogramInfo" />
          <div
            class="new-song-item clearfix"
            v-for="item in recommendedDjprogram"
            :key="item.id"
          >
            <Single
              :picUrl="item.picUrl"
              :name="item.name"
              :copywriter="item.copywriter"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroupList from "@/components/group-list";
import GroupTitle from "@/components/group-title";
import AlbumCover from "@/components/album-cover";
import Single from "@/components/single";
import {
  getRecommendedSonglist,
  getRecommendedNewsong,
  getRecommendedDjprogram,
  getRecommendedMv,
} from "@/api/personalized";

export default {
  components: { GroupList, GroupTitle, AlbumCover, Single },
  data() {
    return {
      // 推荐歌单列表
      recommendedSonglist: [],
      // 展示的推荐歌单列表
      showRecommendedSonglist: [],
      // 推荐新音乐
      recommendedNewsong: [],
      //推荐mv
      recommendedMV: [],
      // 推荐电台
      recommendedDjprogram: [],
      // 推荐歌单组件信息
      recommendedSonglistInfo: {
        icon: "el-icon-refresh",
        title: "推荐歌单",
      },
      // 推荐音乐组件信息
      recommendedNewsongInfo: {
        title: "推荐新音乐",
      },
      // 推荐电台组件信息
      recommendedDjprogramInfo: {
        title: "推荐电台",
      },
      // 推荐MV组件信息
      recommendedMVInfo: {
        title: "推荐MV",
      },
      // 刷新推荐歌单
      replaceNum: 1,
    };
  },
  created() {
    this.getRecommendedSonglist(0, 5);
    this.getRecommendedNewsong();
    this.getRecommendedDjprogram();
    this.getRecommendedMv();
  },
  methods: {
    // 获取推荐歌单
    async getRecommendedSonglist(start, end) {
      const res = await getRecommendedSonglist();
      this.recommendedSonglist = res.result;
      this.showRecommendedSonglist = res.result.slice(start, end);
    },
    // 更换推荐歌单
    replaceSonglist() {
      this.showRecommendedSonglist = this.recommendedSonglist.slice(
        this.replaceNum * 5,
        this.replaceNum * 5 + 5
      );
      if (this.replaceNum >= 3) {
        this.replaceNum = 0;
      } else {
        this.replaceNum++;
      }
    },
    // 获取推荐新音乐
    async getRecommendedNewsong() {
      const res = await getRecommendedNewsong();
      this.recommendedNewsong = res.result;
    },
    // 获取推荐电台
    async getRecommendedDjprogram() {
      const res = await getRecommendedDjprogram();
      this.recommendedDjprogram = res.result;
    },
    // 获取推荐MV
    async getRecommendedMv() {
      const res = await getRecommendedMv();
      this.recommendedMV = res.result;
    },
    // 播放单曲
    playsong(id) {
      this.$store.commit("player/setSongId", id);
      this.$store.dispatch("player/getSongUrl", id);
      this.$store.dispatch("player/getSongDetail", id);
    },
    // 跳转到歌单详情页
    goToAlbumDetailPage(id) {
      this.$router.push({
        path: `/album_detail/${id}`,
      });
    },
 // 跳转mv播放页
    goToMvPage(id) {
      this.$router.push({
        path: `/mv/${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.rec-songlist {
  margin-bottom: 60px;
}
.rec-s-wrap{
  display: flex;
  .res-s-item{
    margin-right: 40px;
  }
}
.djprogram {
  // background-color: pink;
  margin-left: 40px;
  width: 440px;
  .djprogram-item {
    position: relative;
    float: left;
    width: 200px;
    height: 113px;
    margin: 0 20px 20px 0;
    cursor: pointer;
    img {
      border-radius: 10px;
    }
    .name {
      position: absolute;
      bottom: 13px;
      left: 20px;
      // font-size: 12px;
      font-weight: 600;
      color: #fff;
      width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .new-song {
    margin-top: 30px;
  }
  .new-song-item {
    width: 440px;
  }
}
</style>
