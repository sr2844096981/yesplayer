<template>
  <div class="songs-table">
    <!-- highlight-current-row -->
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      @row-dblclick="handleClickRow"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" width="220" class="name"> </el-table-column>
      <el-table-column prop="al.name" width="260"></el-table-column>
      <el-table-column width="160">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.ar" :key="item.id">{{
            item.name
          }}{{ index === scope.row.ar.length - 1 ? "" : ", " }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="alia[0]" width="220"> </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-link type="danger" v-if="scope.row.mv !== 0" @click="goToMvPage(scope.row.mv)">MV</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["songId"]),
  },
  props: {
    tableData: {
      typeof: Array,
      default: () => {
      },
    },
  },
  data() {
    return {};
  },
  created(){
  },
  methods: {
    // 点击歌曲所在行 切歌
    handleClickRow(row, column, event) {
      this.$store.commit("player/setSongId", row.id);
      this.$store.dispatch("player/getSongUrl", row.id);
      this.$store.dispatch("player/getSongDetail", row.id);
    },
    // 正在播放的歌曲所在行高亮
    tableRowClassName({ row, rowIndex }) {
      if (row.id === this.songId) {
        return "nowPlay-row";
      }
      return "";
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

<style lang="scss">
.songs-table {
  .el-table .nowPlay-row {
    background-color: #fef0f0;
  }
  .el-table td.el-table__cell {
    border: none;
  }
  .el-table .cell {
    color: #000;
    font-weight: 600;
  }
}
</style>