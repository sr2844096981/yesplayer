<template>
  <div class="artists">
    <h2 class="page-title">Artists</h2>
    <!-- 热门 -->
    <GroupTitle
      @clickGroupTitleBtn="replaceHotArtist"
      :componentInfo="remenComponentInfo"
    />
    <GroupList
      :showArtists="showRemenArtists"
      @goToArtistDetailPage="goToArtistDetailPage"
    />
    <!-- 华语 -->
    <GroupTitle
      @clickGroupTitleBtn="goToArtistPage"
      :componentInfo="huayuComponentInfo"
    />
    <GroupList
      :showArtists="showHuayuArtists"
      @goToArtistDetailPage="goToArtistDetailPage"
    />
    <!-- 欧美 -->
    <GroupTitle
      @clickGroupTitleBtn="goToArtistPage"
      :componentInfo="oumeiComponentInfo"
    />
    <GroupList
      :showArtists="showOumeiArtists"
      @goToArtistDetailPage="goToArtistDetailPage"
    />
    <!-- 日本 -->
    <GroupTitle
      @clickGroupTitleBtn="goToArtistPage"
      :componentInfo="ribenComponentInfo"
    />
    <GroupList
      :showArtists="showRibenArtists"
      @goToArtistDetailPage="goToArtistDetailPage"
    />
    <!-- 韩国 -->
    <GroupTitle
      @clickGroupTitleBtn="goToArtistPage"
      :componentInfo="hanguoComponentInfo"
    />
    <GroupList
      :showArtists="showHanguoArtists"
      @goToArtistDetailPage="goToArtistDetailPage"
    />
    <!-- 其他 -->
    <GroupTitle
      @clickGroupTitleBtn="goToArtistPage"
      :componentInfo="qitaComponentInfo"
    />
    <GroupList
      :showArtists="showQitaArtists"
      @goToArtistDetailPage="goToArtistDetailPage"
    />
  </div>
</template>

<script>
import { hotArtist, artistClassification } from "@/api/artist";
import GroupList from "@/components/group-list";
import GroupTitle from "@/components/group-title";
export default {
  components: { GroupList, GroupTitle },
  data() {
    return {
      // 歌手信息
      artists: [],
      // 展示的热门歌手信息
      showRemenArtists: [],
      // 展示的华语歌手信息
      showHuayuArtists: [],
      // 展示的欧美歌手信息
      showOumeiArtists: [],
      // 展示的日本歌手信息
      showRibenArtists: [],
      // 展示的韩国歌手信息
      showHanguoArtists: [],
      // 展示的其他歌手信息
      showQitaArtists: [],
      // 更换热门歌手次数
      replaceNum: 1,
      // 热门组件信息
      remenComponentInfo: {
        icon: "el-icon-refresh",
        title: "热门",
      },
      // 华语组件信息
      huayuComponentInfo: {
        icon: "el-icon-arrow-right",
        title: "华语",
      },
      // 欧美组件信息
      oumeiComponentInfo: {
        icon: "el-icon-arrow-right",
        title: "欧美",
      },
      // 日本组件信息
      ribenComponentInfo: {
        icon: "el-icon-arrow-right",
        title: "日本",
      },
      // 韩国组件信息
      hanguoComponentInfo: {
        icon: "el-icon-arrow-right",
        title: "韩国",
      },
      // 其他组件信息
      qitaComponentInfo: {
        icon: "el-icon-arrow-right",
        title: "其他",
      },
    };
  },
  created() {
    this.getHotArtist(0, 5);
    // 全部 华语  z开头
    this.getArtistClassification(-1, 7, "z").then((res) => {
      this.showHuayuArtists = res.slice(0, 5);
    });
    // 全部 欧美  热门
    this.getArtistClassification(-1, 96, "").then((res) => {
      this.showOumeiArtists = res.slice(0, 5);
    });
    // 全部 日本  热门
    this.getArtistClassification(-1, 8, "").then((res) => {
      this.showRibenArtists = res.slice(0, 5);
    });
    // 全部 韩国  热门
    this.getArtistClassification(-1, 16, "").then((res) => {
      this.showHanguoArtists = res.slice(0, 5);
    });
    // 全部 其他  热门
    this.getArtistClassification(-1, 0, "").then((res) => {
      this.showQitaArtists = res.slice(0, 5);
    });
  },
  methods: {
    // 获取热门歌手
    async getHotArtist(start, end) {
      const res = await hotArtist();
      this.artists = res.artists;
      this.showRemenArtists = res.artists.slice(start, end);
      console.log(res);
    },
    // 获取歌手分类列表
    async getArtistClassification(type, area, initial) {
      const res = await artistClassification(type, area, initial);
      return res.artists;
    },
    // 更换热门歌手
    replaceHotArtist() {
      this.showRemenArtists = this.artists.slice(
        this.replaceNum * 5,
        this.replaceNum * 5 + 5
      );
      if (this.replaceNum >= 5) {
        this.replaceNum = 0;
      }
      this.replaceNum++;
    },
    // 跳转到歌手分类页
    goToArtistPage() {
      this.$router.push("/artist_list");
    },
    // 跳转至歌手详情页
    goToArtistDetailPage(id) {
      this.$router.push({
        path: `/artist_detail/${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>