<template>
  <div class="lyric">
    <div class="lyric-main clearfix">
      <div class="cover-box f-l">
        <img class="cover" :src="cover" ref="cover" />
        <div class="song-operate">
          <!-- MV -->
          <i class="el-icon-video-camera"></i>
          <!-- 收藏 -->
          <i class="el-icon-folder-add"></i>
          <!-- 分享 -->
          <i class="el-icon-position"></i>
          <!-- 下载 -->
          <i class="el-icon-download"></i>
          <!-- 评论 -->
          <i class="el-icon-chat-line-round" @click="drawer = true"></i>
        </div>
      </div>
      <div class="lyric-box f-l">
        <div class="roll-lyric">
          <div class="lyric-wrap">
            <div
              :class="key === currentKey ? 'active-lyric' : ''"
              v-for="(value, key) in lyric"
              :key="key"
              class="lyric-text"
            >
              {{ value }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论抽屉 -->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getLyric } from "@/api/lyric";
import { randomNum } from "@/utils/randomNum";
import { imgMainColor } from "@/utils/imgMainColor";
export default {
  computed: {
    ...mapGetters(["songId", "songDetail", "currentTime", "songUrl"]),
  },
  data() {
    return {
      cover: "",
      //   歌词
      lyric: null,
      // 专辑信息
      songAl: [],
      // 当前播放歌词的key
      currentKey: 0,
      // 控制评论抽屉的显示隐藏
      drawer: false,
    };
  },
  watch: {
    songId() {
      this.getLyric(this.songId);
    },
    songDetail() {
      this.cover = this.songDetail.al.picUrl;
      console.log(this.songDetail);
    },
    currentTime() {
      this.scrollLrc();
    },
    currentKey() {
      if (document.querySelector(".active-lyric") === null) return false;
      // console.log(document.querySelector(".active-lyric").offsetTop);
      document.querySelector(".lyric-wrap").style.transform =
        "translateY(-" +
        document.querySelector(".active-lyric").offsetTop +
        "px)";
    },
  },
  mounted() {
    setTimeout(() => {
      this.getLyric(this.songId);
      this.cover = this.songDetail.al.picUrl;
    }, 500);
  },

  methods: {
    // 获取歌词
    async getLyric(id) {
      if (id === "") return;
      const res = await getLyric(id);
      const newLrc = this.analysisLrc(res.lrc.lyric);
      this.lyric = newLrc;
      // 修改背景
      if (document.querySelector(".lyric") === null) return false;
       let bgcArr = [
        "#5B3C35",
        "#433745",
        "#4F3F3C",
        "#979202",
        "#44343C",
        "#3C4549",
        "#4A4A3A",
        "#2E3851",
        "#643455",
        "#444A4C",
        "#32354A",
        "#354165",
        "#432824",
        "#3A3C3E",
        "#353C72",
        "#4C4C8C",
        "#567A79",
        "#8E0B45",
        "#06070B",
        "#121287",
        "#6C3E34",
        "#900909",
      ];
      const bgc = bgcArr[randomNum(0, bgcArr.length - 1)];
      document.querySelector(".lyric").style.backgroundColor = bgc;
      document.querySelector(".el-footer").style.backgroundColor = bgc; 
      // console.log(imgMainColor(this.$refs.cover));
    },
    // 解析歌词
    analysisLrc(firsthandLyric) {
      let newLrc = {};
      //  将每句歌词分开
      let filterLrc = firsthandLyric.split("\n");
      // 过滤  [00:26.270]
      let reg = /\[\d*:\d*(\.|:)\d*]/g;
      for (let i = 0; i < filterLrc.length; i++) {
        //  timeRegArr起始歌词时间
        let timeRegArr = filterLrc[i].match(reg);
        //  跳过null
        if (!timeRegArr) continue;
        //  获取每句歌词对应的时间
        let t = timeRegArr[0];
        let time = this.fetchTime(t);
        // 获取歌词内容
        //  replace 替换方法
        let lyricContent = filterLrc[i].replace(timeRegArr, "");
        //  将当前时间对应的歌词,以对象的形式存到lrc中
        // 77.822: "回忆是抓不到的月光握紧就变黑暗"
        newLrc[time] = lyricContent;
      }
      return newLrc;
    },
    // 提取时间 [01:38.852] => 98.852
    fetchTime(t) {
      let min = parseInt(t.match(/\[\d*/i).toString().slice(1));
      let s = parseInt(t.match(/\:\d*/i).toString().slice(1));
      let ms = parseFloat("0" + t.match(/\.\d*/i));
      return min * 60 + s + ms;
    },
    //  歌词滚动
    scrollLrc() {
      if (this.lyric === undefined || this.lyric === null) return false;
      Object.keys(this.lyric).forEach((item, index) => {
        if (this.currentTime >= item) {
          this.currentKey = item;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.lyric {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
  .lyric-main {
    width: 1000px;
    margin: 0 auto;
  }
  .cover-box {
    .cover {
      width: 350px;
      height: 350px;
      border: 5px;
      margin-top: 80px;
      border-radius: 8px;
      box-shadow: 0px 32px 36px -32px rgb(255 255 255 / 60%);
    }
    .song-operate {
      width: 350px;
      margin-left: 30px;
      margin-top: 50px;
      font-size: 22px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    }
  }
  .lyric-box {
    width: 400px;
    height: 550px;
    margin-left: 100px;
    margin-top: 30px;
    overflow: hidden;
    .roll-lyric {
      margin-top: 150px;
    }
    .lyric-text {
      padding: 6px;
      width: 400px;
      padding: 18px;
      border-radius: 12px;
      opacity: 0.28;
      font-size: 28px;
      font-weight: 600;
      color: #fff;
      font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
        Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif,
        microsoft uighur;
      word-break: break-word;
      transition: 0.8s;
      &:hover {
        background: hsla(0, 0%, 100%, 0.18);
      }
    }
  }
}

.active-lyric {
  opacity: 1 !important;
}
</style>