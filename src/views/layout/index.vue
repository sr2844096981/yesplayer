<template>
  <div class="layout">
    <el-container>
      <el-aside style="width: 200px">
        <Aside />
        <el-input
          class="search"
          :placeholder="showKeyword"
          prefix-icon="el-icon-search"
          v-model="keyword"
          @change="handleSearch"
        >
        </el-input>
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
    <transition name="el-zoom-in-bottom">
      <el-footer v-if="songId">
        <Playbar style="z-index: 9999" />
      </el-footer>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSearchDefault } from "@/api/search"
import Aside from "./aside.vue";
import Playbar from "@/components/play-bar";
export default {
  components: { Aside, Playbar },
  computed: {
    ...mapGetters(["songId"]),
  },
  data() {
    return {
      // 搜索关键字
      keyword:"",
      // 显示关键字
      showKeyword:""
    }
  },
  created() {
    this.getSearchDefault();
  },
  methods: {
    // 获取默认搜索关键词
    async getSearchDefault() {
      const res = await getSearchDefault()
      // this.keyword = res.data.realkeyword
      this.showKeyword = res.data.showKeyword

    },
    // 搜索
    handleSearch(){
      this.$router.push({
        path: `/search/${this.keyword}`,
      })
      this.keyword = ""
    }
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}

.el-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-width: 1300px;
  z-index: 99999;
  // backdrop-filter:saturate(180%) blur(30px);
  background-color: #292756;
  color: #333;
  transition: all 0.2s;
}

.el-aside {
  position: relative;
  background-color: #eaeaf5;
  color: #333;
  .search {
    position: absolute;
    bottom: 80px;
    left: 14px;
    width: 170px;
  }
}
.el-main {
  background-color: #fefefe;
  color: #333;
  width: 1130px;
  min-width: 1100px;
  overflow-x: hidden;
}
.el-container {
  // height: calc(100vh - 60px);
  height: 100vh;
}

.main {
  padding: 20px 55px 80px;
}
</style>

