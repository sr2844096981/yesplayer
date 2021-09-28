<template>
  <div>
    <h2 class="page-title">Play list</h2>
    <GroupTitle :componentInfo="playListComponentInfo" />
    <SongsTable :tableData="songList" />
  </div>
</template>

<script>
import SongsTable from "@/components/songs-table";
import GroupTitle from "@/components/group-title";
import { mapGetters } from "vuex";

export default {
  components: { SongsTable, GroupTitle },
  computed: {
    ...mapGetters(["songId", "songList"]),
  },
  data() {
    return {
      // 即将播放列表标题组件
      playListComponentInfo: {
        title: "即将播放",
      },
    };
  },
  methods: {},
};
</script>

<style>
</style>