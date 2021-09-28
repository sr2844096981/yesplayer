<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="bg-purple">
          <img
            :src="playlist.coverImgUrl+'?param=720y720'"
          />
        </div>
      </el-col>
      <el-col :span="18"
        ><div class="bg-purple-light">
          <el-descriptions :title="playlist.name">
            <el-descriptions-item label="创建于">{{
              playlist.createTime | formatDate
            }}</el-descriptions-item>
            <el-descriptions-item label="最近更新时间">{{
              playlist.trackUpdateTime | formatDate
            }}</el-descriptions-item>
          </el-descriptions>
          <div>
            标签：
            <el-tag
              style="margin: 5px 6px 5px"
              v-for="(v, i) in playlist.tags"
              :key="i"
              >{{ v }}
            </el-tag>
          </div>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                歌单介绍 <i class="header-icon el-icon-info"></i>
              </template>
              <div>
                {{ playlist.description }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div></el-col
      >
    </el-row>
    <SongTable :tableData="playlist.tracks" />
  </div>
</template>

<script>
import SongTable from "@/components/songs-table";
import { getPlaylistDetail } from "@/api/album";
export default {
  components: { SongTable },
  data() {
    return {
      playlist: [],
    };
  },
  mounted() {
    this.getPlaylistDetail(this.$route.params.id);
  },
  methods: {
    // 获取歌单详情
    async getPlaylistDetail(id) {
      const res = await getPlaylistDetail(id);
      this.playlist = res.playlist;
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-purple {
  img {
    width: 228px;
    height: 228px;
    border-radius: 10px;
  }
}
</style>