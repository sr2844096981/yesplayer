<template>
  <div>
    <h2 class="page-title">Artist list</h2>
    <div class="mod-tag">
      <!-- 按首字母索引 -->
      <div class="hot">
        <el-button
          size="small"
          :type="activeInitial === item.id ? 'primary' : ''"
          v-for="item in A_Z"
          :key="item.id"
          @click="clickA_Z(item.id)"
          >{{ item.title }}</el-button
        >
      </div>
      <!-- 按类型 -->
      <div>
        <el-button
          size="small"
          :type="activeType === item.id ? 'primary' : ''"
          v-for="item in type"
          :key="item.id"
          @click="clickType(item.id)"
          >{{ item.title }}</el-button
        >
      </div>
      <!-- 按地区 -->
      <div>
        <el-button
          size="small"
          :type="activeArea === item.id ? 'primary' : ''"
          v-for="item in area"
          :key="item.id"
          @click="clickArea(item.id)"
          >{{ item.title }}</el-button
        >
      </div>
    </div>
    <GroupList :showArtists="showArtistsPic" />
    <el-button v-for="item in showArtistsName" :key="item.id" @click="goToArtistDetailPage(item.id)">{{
      item.name
    }}</el-button>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
import { artistClassification } from "@/api/artist";
import GroupList from "@/components/group-list";
export default {
  components: { GroupList },
  data() {
    return {
      // 字母 A-Z-#
      A_Z: this.createA_Z(),
      // 按类型  type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队
      type: [
        {
          id: -1,
          title: "全部",
        },
        {
          id: 1,
          title: "男歌手",
        },
        {
          id: 2,
          title: "女歌手",
        },
        {
          id: 3,
          title: "乐队",
        },
      ],
      // 按地区 -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
      area: [
        {
          id: -1,
          title: "全部",
        },
        {
          id: 7,
          title: "华语",
        },
        {
          id: 96,
          title: "欧美",
        },
        {
          id: 8,
          title: "日本",
        },
        {
          id: 16,
          title: "韩国",
        },
        {
          id: 0,
          title: "其他",
        },
      ],
      // 选择的 类型
      activeType: -1,
      // 选择的 地区
      activeArea: -1,
      // 选择的 字母
      activeInitial: -1,
      // 展示歌手图片列表
      showArtistsPic: [],
      // 展示歌手姓名列表
      showArtistsName: [],
      // 返回数量 , 默认为 30
      limit: 40,
      // 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
      offset: 0,
    };
  },
  mounted() {
    this.getArtistClassification();
  },
  methods: {
    // 生成 字母 A-Z-#
    createA_Z() {
      let str = [];
      str.push({ id: -1, title: "热门" });
      for (let i = 97; i < 123; i++) {
        var letter = {};
        letter.id = String.fromCharCode(i);
        letter.title = String.fromCharCode(i - 32);
        str.push(letter);
      }
      str.push({ id: "0", title: "#" });
      return str;
    },
    // 获取歌手分类列表
    async getArtistClassification() {
      const res = await artistClassification(
        this.activeType,
        this.activeArea,
        this.activeInitial,
        this.limit,
        this.offset
      );
      this.showArtistsPic = res.artists.slice(0, 5);
      this.showArtistsName = res.artists.slice(6, res.artists.length);
    },
    // 选择字母
    clickA_Z(val) {
      this.activeInitial = val;
      this.getArtistClassification();
    },
    // 选择类型
    clickType(val) {
      this.activeType = val;
      this.getArtistClassification();
    },
    // 选择地区
    clickArea(val) {
      this.activeArea = val;
      this.getArtistClassification();
    },
    // 页码改变时触发
    handleCurrentChange(val) {
      this.offset = val*30;
      this.getArtistClassification();
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
.mod-tag {
  margin: 30px 0;
  div {
    margin-bottom: 10px;
  }
}
.el-button {
  border: none !important;
}
.hot {
  .el-button + .el-button {
    margin: 0;
  }
}
.group-wrap {
  margin-bottom: 30px;
}
.el-pagination {
  margin: 30px 0;
}
</style>