<template>
  <div>
    <h2 class="page-title">Ranking</h2>
    <el-row>
      <el-col :span="10">
        <div class="purple hot">
          <div class="title">
            <div class="aname">热歌榜</div>
            <div class="updateFrequency">刚刚更新</div>
          </div>
          <ul>
            <li
              v-for="(item, index) in hotTopSonglist"
              :key="item.id"
              @click="playSong(item.id)"
            >
              <span class="index">{{ index + 1 }}</span>
              <span class="sname">{{ item.name }}</span>
              <i class="el-icon-caret-right"></i>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="14">
        <!-- 飙升榜 -->
        <div class="purple soar clearfix">
          <div class="title f-l">
            <div class="aname">飙升榜</div>
            <div class="updateFrequency">刚刚更新</div>
          </div>
          <ul class="f-r">
            <li
              v-for="(item, index) in soarTopSonglist"
              :key="item.id"
              @click="playSong(item.id)"
            >
              <span class="index">{{ index + 1 }}</span>
              <span class="sname">{{ item.name }}</span>
              <i class="el-icon-caret-right"></i>
            </li>
          </ul>
        </div>
        <!-- 新歌榜 -->
        <div class="purple new clearfix">
          <div class="title f-l">
            <div class="aname">新歌榜</div>
            <div class="updateFrequency">刚刚更新</div>
          </div>
          <ul class="f-r">
            <li
              v-for="(item, index) in newTopSonglist"
              :key="item.id"
              @click="playSong(item.id)"
            >
              <span class="index">{{ index + 1 }}</span>
              <span class="sname">{{ item.name }}</span>
              <i class="el-icon-caret-right"></i>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <i class="el-icon-lollipop more" @click="drawer = true"></i>
    <el-drawer
      title="全部榜单"
      direction="ttb"
      :visible.sync="drawer"
      :with-header="false"
      size="70%"
    >
      <div
        class="al-cover"
        v-for="item in toplist"
        :key="item.id"
        @click="goToAlbumDetailPage(item.id)"
      >
        <AlCover
          :coverImgUrl="item.coverImgUrl"
          :name="item.name"
          :time="item.updateFrequency"
          :copywriter="item.description"
        />
      </div>
      <!-- "coverImgUrl","name","time","playCount","copywriter" -->
    </el-drawer>
  </div>
</template>

<script>
import AlCover from "@/components/al-cover";
import { getToplist, getPlaylistDetail } from "@/api/album";
export default {
  components: { AlCover },
  data() {
    return {
      // toplist榜单列表
      toplist: [],
      // 热歌榜
      hotToplist: [],
      hotTopSonglist: [],
      //   飙升榜
      soarToplist: [],
      soarTopSonglist: [],
      //   新歌榜
      newToplist: [],
      newTopSonglist: [],
      // 控制折叠面板
      drawer: false,
    };
  },
  created() {
    this.getToplist();
    // 热歌榜
    this.getPlaylistDetail(3778678).then((rege) => {
      // this.hotToplist = rege;
      this.hotTopSonglist = rege.tracks.slice(0, 8);
    });

    // 飙升榜
    this.getPlaylistDetail(19723756).then((biaosheng) => {
      // this.soarToplist = biaosheng;
      this.soarTopSonglist = biaosheng.tracks.slice(0, 4);
    });
    // 新歌榜
    this.getPlaylistDetail(3779629).then((xinge) => {
      // this.newToplist = xinge;
      this.newTopSonglist = xinge.tracks.slice(0, 4);
    });
  },
  methods: {
    //   获取所有榜单
    async getToplist() {
      const res = await getToplist();
      console.log(res);
      this.toplist = res.list;
    },
    // 获取榜单详情
    async getPlaylistDetail(id) {
      const res = await getPlaylistDetail(id);
      return res.playlist;
    },
    // 播放
    playSong(id) {
      this.$store.commit("player/setSongId", id);
      this.$store.dispatch("player/getSongUrl", id);
      this.$store.dispatch("player/getSongDetail", id);
    },
    // 跳转到榜单详情页
    goToAlbumDetailPage(id) {
      this.$router.push({
        path: `/album_detail/${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.more {
  position: fixed;
  bottom: 80px;
  right: 80px;
  color: #fd2d55;
  font-size: 24px;
  cursor: pointer;
}
.al-cover {
  margin-top: 20px;
  margin-left: 40px;
  float: left;
}
.el-row {
  margin-top: 30px;
}
.hot {
  width: 400px;
  background-image: linear-gradient(#5050ac, #24366b);
}
.soar {
  width: 550px;
  background-image: linear-gradient(#4c5150, #303f45);
}
.new {
  margin-top: 55px;
  width: 550px;
  background-image: linear-gradient(#78b5cb, #43869a);
}
.purple {
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  padding: 20px;
  li {
    cursor: pointer;
    opacity: 0.8;
    list-style: none;
    line-height: 3em;
    border-bottom: 1px solid rgba($color: #fff, $alpha: 0.28);
    transition: all 0.2s;
    .index {
      margin-left: 5px;
      margin-right: 15px;
    }
    .sname {
      display: inline-block;
      width: 300px;
    }
    i {
      float: right;
      margin-top: 1em;
      margin-right: 10px;
    }
    &:hover {
      background-color: #fff;
      border-radius: 8px;
      color: #fd2d55;
    }
  }
  .title {
    padding: 20px 0;
    width: 100px;
    .aname {
      font-size: 32px;
      font-weight: 600;
    }
    .updateFrequency {
      font-size: 12px;
    }
  }
}
</style>