<template>
  <div>
    <div class="header">
      <!-- 歌手信息 -->
      <HeaderInfoCol
        class="header-info-col"
        :artist="artist"
        :secondaryExpertIdentiy="secondaryExpertIdentiy"
      />
      <!-- 功能区 -->
      <div class="btn-wrap">
        <el-button type="danger" icon="el-icon-caret-right" @click="playAll">
          播放全部</el-button
        >
        <el-radio-group
          v-model="radio"
          fill="#F56C6C"
          style="margin: 0 20px"
          @change="changeOrder"
        >
          <el-radio-button label="最热"></el-radio-button>
          <el-radio-button label="最新"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 歌手歌曲 -->
    <SongsTable :tableData="tableData" />
  </div>
</template>

<script>
import HeaderInfoCol from "@/components/headerInfoCol";
import SongsTable from "@/components/songs-table";
import { getArtistDetail, getSongsByArtist } from "@/api/artist";
export default {
  components: { HeaderInfoCol, SongsTable },
  data() {
    return {
      id: this.$route.params.id,
      //   歌手详情
      artist: [],
      //   身份信息
      secondaryExpertIdentiy: [],
      // 歌曲列表
      tableData: [],
      // 最新 最热
      radio: "最热",
      // 歌曲总条数
      total: 0,
    };
  },
  mounted() {
    this.getArtistDetail();
    this.getSongsByArtist(this.id, "最热", 0);
  },
  methods: {
    // 获取歌手详情信息
    async getArtistDetail() {
      const res = await getArtistDetail(this.id);
      this.secondaryExpertIdentiy = res.data.secondaryExpertIdentiy;
      this.artist = res.data.artist;
    },
    // 获取歌手全部歌曲
    async getSongsByArtist(id, order, offset) {
      const res = await getSongsByArtist(id, order, offset);
      this.tableData = res.songs;
      this.total = res.total;
    },
    // 分页
    handleCurrentChange(val) {
      this.getSongsByArtist(this.id, this.radio, (val-1)*20);
    },
    // 修改 最新最热
    changeOrder(val) {
      this.getSongsByArtist(this.id, val);
    },
    // 播放全部歌曲
    playAll(){
      this.$store.commit("player/setSongList",this.tableData)
      this.$store.commit("player/setSongId",this.tableData[0].id)
      this.$store.dispatch("player/getSongUrl",this.tableData[0].id)
      this.$store.dispatch("player/getSongDetail",this.tableData[0].id)
    }
  },
};
</script>

<style lang="scss" scoped>
.el-descriptions-item__content {
  font-size: 22px;
}
.header {
  position: relative;
  height: 200px;
  width: 1130px;
  .header-info-col {
    position: absolute;
    top: 0;
    left: 0;
  }
  .btn-wrap {
    position: absolute;
    top: 110px;
    left: 550px;
    width: 560px;
    margin: 20px 0;
  }
}

.el-pagination {
  float: right;
  margin: 30px 20px;
}
</style>