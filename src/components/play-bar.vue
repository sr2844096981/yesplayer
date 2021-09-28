<template>
  <div class="player-wrap">
    <div class="box">
      <div class="songinfo-wrap" @click="goToLyricPage">
        <el-avatar
          class="cover"
          shape="square"
          :size="46"
          :src="songAl.picUrl"
        ></el-avatar>
        <div class="songInfo">
          <p class="songName">
            {{ songDetail.name ? songDetail.name : "暂无音乐" }}
          </p>
          <p class="songer">
            <span v-for="(v, i) in songAr" :key="v.id"
              >{{ v.name }}{{ i === songAr.length - 1 ? "" : ", " }}</span
            >
          </p>
        </div>
      </div>
      <div class="cut-btn">
        <i class="prev" @click="playPrev"></i>
        <i :class="isPlay ? 'stop' : 'play'" @click="handlePlay"></i>
        <i class="next" @click="playNext"></i>
      </div>
      <div class="slider">
        <el-slider
          v-model="sliderVal"
          @change="changeCurrentTime"
          @input="changeShowCurrentTime"
          :show-tooltip="false"
        ></el-slider>
      </div>
      <div class="duration">
        {{ currentTime | timeFormat }} / {{ duration | timeFormat }}
      </div>
      <div>
        <i class="play-list-btn" @click="goToPlayListPage"></i>
      </div>
      <div>
        <i
          :class="loopflag === 0 ? 'dqloop' : 'lbloop'"
          @click="changeLoop"
        ></i>
      </div>
    </div>
    <audio
      :src="songUrl"
      ref="audio"
      @play="isPlay = true"
      @pause="isPlay = false"
      @ended="overAudio"
      @canplay="getDuration"
      @timeupdate="getCurrentTime"
    ></audio>
    <transition name="el-zoom-in-bottom">
      <Lyric v-show="showLyric" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Lyric from "@/components/lyric";
export default {
  components: { Lyric },
  computed: {
    ...mapGetters(["songId", "songList", "songUrl", "songDetail"]),
  },
  watch: {
    songUrl() {
      setTimeout(() => {
        this.handlePlay();
      }, 500);
    },
    songDetail() {
      this.songAr = this.songDetail.ar;
      this.songAl = this.songDetail.al;
    },
  },
  data() {
    return {
      // 进度条
      sliderVal: 0,
      // 歌手
      songAr: [],
      // 歌曲封面
      songAl: [],
      // 播放状态
      isPlay: false,
      // 歌曲总时长 秒
      duration: 0,
      // 当前播放时长 秒
      currentTime: 0,
      // 控制显示歌词
      showLyric: false,
      // 标记循环播放
      loopflag: true,
    };
  },
  mounted() {},
  methods: {
    //   切换 播放 暂停
    handlePlay() {
      if (this.songUrl === "") return false;
      this.$refs.audio.paused
        ? this.$refs.audio.play()
        : this.$refs.audio.pause();
    },
    // 获取总时长
    getDuration() {
      const duration = this.$refs.audio.duration;
      this.duration = duration;
    },
    // 获取当前播放时长
    getCurrentTime() {
      if (!this.$refs.audio) return;
      const currentTime = this.$refs.audio.currentTime;
      this.currentTime = currentTime;
      this.$store.commit("player/setCurrentTime", currentTime);
      // 实时修改进度条进度
      this.sliderVal = (this.currentTime / this.duration) * 100;
    },
    // 通过进度条改变播放进度
    changeCurrentTime(val) {
      this.$refs.audio.currentTime = (val / 100) * this.duration;
    },
    // 拖动进度条是，时间实时变化
    changeShowCurrentTime(val) {
      this.currentTime = (val / 100) * this.duration;
    },
    // 跳转至播放列表页
    goToPlayListPage() {
      if (this.$router.history.current.path === "/play_list") {
        this.$router.go(-1);
      }
      // 关闭歌词
      this.showLyric = false;
      this.$router.push("/play_list");
    },
    // 切歌时 修改 store
    updateStore(songid) {
      this.$store.commit("player/setSongId", songid);
      this.$store.dispatch("player/getSongUrl", songid);
      this.$store.dispatch("player/getSongDetail", songid);
    },
    // 下一首
    playNext() {
      if (this.songList.length === 0)
        return this.$message.warning("播放列表为空");
      // 获取当前播放歌曲在播放列表的索引
      const currentIndex = this.songList.findIndex(
        (item) => item.id === this.songId
      );
      // currentIndex === -1 未找到，播放第一首
      if (currentIndex === -1 && this.songList.length > 0) {
        return this.updateStore(this.songList[0].id);
      }
      // 当前播放歌曲是最后一首，播放第一首
      if (currentIndex === this.songList.length - 1) {
        return this.updateStore(this.songList[0].id);
      }
      // currentIndex !== -1 播放列表下一首
      if (currentIndex !== -1 && currentIndex < this.songList.length - 1) {
        return this.updateStore(this.songList[currentIndex + 1].id);
      }
      return false;
    },
    // 上一首
    playPrev() {
      if (this.songList.length === 0)
        return this.$message.warning("播放列表为空");
      // 获取当前播放歌曲在播放列表的索引
      const currentIndex = this.songList.findIndex(
        (item) => item.id === this.songId
      );
      // currentIndex === -1 未找到，播放第一首
      if (currentIndex === -1 && this.songList.length > 0) {
        return this.updateStore(this.songList[0].id);
      }
      // 当前播放歌曲是第一首，播放最后一首
      if (currentIndex === 0) {
        return this.updateStore(this.songList[this.songList.length - 1].id);
      }
      // currentIndex !== -1 播放列表上一首
      if (currentIndex !== -1 && currentIndex < this.songList.length) {
        return this.updateStore(this.songList[currentIndex - 1].id);
      }
      return false;
    },
    // 播放结束
    overAudio() {
      // 不是单曲循环 且 播放列表不为空
      if (!this.$refs.audio.loop && this.songList.length > 0) {
        this.playNext();
      } else {
        this.handlePlay()
        this.$refs.audio.loop = true;
      }
    },
    // 切换循环播放
    changeLoop() {
      // console.log(this.$refs.audio.loop);
      if (!this.$refs.audio.loop) {
        this.playNext();
      }
      this.loopflag = !this.loopflag
      this.$refs.audio.loop = !this.$refs.audio.loop;
    },
    // 跳转到歌词页
    goToLyricPage() {
      this.showLyric = !this.showLyric;
      // this.$router.push("/lyric");
    },
  },
};
</script>

<style lang="scss" >
.player-wrap {
  position: relative;
  height: 100%;
  color: #fff;
  // backdrop-filter:saturate(180%) blur(30px);

  .box {
    opacity: 0.86;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    .songinfo-wrap {
      display: flex;
      align-items: center;
    }
    i {
      display: block;
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
      cursor: pointer;
    }
  }
}
.player-wrap {
  .cover {
    margin-left: 30px;
    cursor: pointer;
    box-shadow: 0 0 4px 0 rgba($color: #fff, $alpha: 0.5);
  }

  .songInfo {
    margin-left: 30px;
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .songer {
      font-size: 12px;
      opacity: 0.7;
    }
  }

  .cut-btn {
    margin-left: 20px;
    display: flex;
    i {
      margin: 0 5px;
    }
    .prev {
      background-image: url(~@/assets/icon/pre.png);
    }
    .next {
      background-image: url(~@/assets/icon/next.png);
    }
    .stop {
      background-image: url(~@/assets/icon/stop.png);
    }
    .play {
      background-image: url(~@/assets/icon/play.png);
    }
  }

  .slider {
    margin-left: 60px;
    .el-slider {
      width: 720px;
    }
    .el-slider__runway {
      height: 2px;
    }
    .el-slider__bar {
      height: 2px;
      background-color: #fff;
    }
    .el-slider__button {
      border: 1px solid #fff;
      height: 12px;
      width: 12px;
    }
  }

  .duration {
    width: 80px;
    margin-left: 20px;
    font-size: 12px;
  }

  .play-list-btn {
    margin-left: 40px;
    background-image: url(~@/assets/icon/playlist.png);
  }
  // 音量
  .horn {
    margin-left: 30px;
    background-image: url(~@/assets/icon/yinliang.png);
    opacity: 0.7;
  }
  // 循环
  .dqloop {
    margin-left: 30px;
    background-image: url(~@/assets/icon/dqloop.png);
    opacity: 0.7;
  }
  .lbloop {
    margin-left: 30px;
    background-image: url(~@/assets/icon/lbloop.png);
    opacity: 0.7;
  }
}
</style>