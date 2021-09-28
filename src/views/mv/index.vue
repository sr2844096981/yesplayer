<template>
  <div>
    <h2 class="page-title">MV</h2>
    <video
      :src="url"
      :poster="mvInfo.cover"
      @play="play"
      @pause="pause"
      width="960"
      height="540"
      controls="controls"
    >
      您的浏览器不支持 video 标签。
    </video>
    <h2>{{ mvInfo.artistName + " - " + mvInfo.name }}</h2>
    <p>
      {{ mvInfo.playCount | formatNumber }} Views ·
      {{ mvInfo.publishTime | formatDate }}
    </p>
    <h4>更多视频</h4>

    <div class="clearfix">
      <div
        class="simi-item"
        v-for="item in simiMvInfo"
        :key="item.id"
        @click="goToMvPage(item.id)"
      >
        <img :src="item.cover + '?param=176y99'" alt="" />
        <h5 class="name text-overflow">{{ item.name }}</h5>
        <span class="ar">{{ item.artistName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mvUrl, mvDetail, simiMv, commentMV } from "@/api/mv";
export default {
  data() {
    return {
      url: "",
      mvInfo: "",
      simiMvInfo: [],
      // 弹幕
      barrage: [],
      barrageInterval: "",
      barrageIndex: 0,
    };
  },
  mounted() {
    this.getMvUrl(this.$route.params.id);
    this.getMvDetail(this.$route.params.id);
    this.getSimiMvl(this.$route.params.id);
    this.getCommentMV(this.$route.params.id);
  },
  methods: {
    //   获取mvUrl
    async getMvUrl(id) {
      const res = await mvUrl({ id });
      this.url = res.data.url;
    },
    // mv详情
    async getMvDetail(id) {
      const res = await mvDetail(id);
      this.mvInfo = res.data;
    },
    // 相似mv
    async getSimiMvl(id) {
      const res = await simiMv(id);
      this.simiMvInfo = res.mvs;
    },
    // 跳转mv播放页
    goToMvPage(id) {
      this.$router.push({
        path: `/mv/${id}`,
      });
    },
    // 播放mv
    play() {
      console.log(this.barrage);
      this.setBarrageInterval();
    },
    // 暂停mv
    pause() {
      this.clearTime();
    },
    // 设置定时器
    setBarrageInterval() {
      this.barrageInterval = setInterval(() => {
        this.openBarrage(this.barrage[this.barrageIndex]);
        // 如果评论显示完毕，重新播放评论
        if (this.barrageIndex >= this.barrage.length - 1) {
          this.barrageIndex = 0;
        } else {
          this.barrageIndex++;
        }
      }, 2000);
    },
    //清除定时器
    clearTime() {
      clearInterval(this.barrageInterval);
    },
    // 获取mv评论
    async getCommentMV(id) {
      const res = await commentMV(id);
      this.barrage.push(...res.hotComments, ...res.comments);
      console.log(res);
    },
    // 弹幕
    openBarrage(content) {
      this.$notify({
        dangerouslyUseHTMLString: true,
        message: `
        <div>
          <div>
            <img src="${content.user.avatarUrl}?param=60y60" style="border-radius:100px;vertical-align:middle; margin-right:10px" width="36" height="36">
            <strong >${content.user.nickname}</strong>
          </div>
          <p style="font-size:12px;text-indent:2em;margin-top:10px">${content.content}</p>
       </div>`,
        showClose: false,
        duration: 8400,
        position: "top-right",
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.getMvUrl(to.params.id);
    this.getMvDetail(to.params.id);
    this.getSimiMvl(to.params.id);
    this.getCommentMV(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 12px;
}
p {
  font-size: 12px;
  opacity: 0.68;
  margin-top: 12px;
}
h4 {
  margin: 40px 0 12px;
}
.simi-item {
  float: left;
  margin-right: 20px;
  cursor: pointer;
  .name {
    width: 176px;
  }
  img {
    width: 176px;
    height: 99px;
  }
  .ar {
    opacity: 0.68;
    font-size: 12px;
  }
}
</style>