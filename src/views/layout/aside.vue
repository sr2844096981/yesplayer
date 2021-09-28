<template>
  <div>
    <el-menu
      router
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      text-color="#222"
      active-text-color="#FD2D55"
    >
      <el-menu-item
        v-for="item in menuList"
        :key="item.index"
        :index="item.path"
        @click="setDefaultActive(item.path)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 导航菜单
      menuList: [
        {
          id: 1,
          icon: "",
          title: "LIBRARY",
          path: "",
        },
        {
          id: 2,
          icon: "el-icon-s-home",
          title: "推荐",
          path: "/home",
        },
        {
          id: 3,
          icon: "el-icon-s-finance",
          title: "歌单",
          path: "/albums",
        },
        {
          id: 4,
          icon: "el-icon-user-solid",
          title: "歌手",
          path: "/artists",
        },
        {
          id: 5,
          icon: "el-icon-s-data",
          title: "榜单",
          path: "/ranking",
        },
      ],
      // 当前激活菜单项
      activeMenu:
        window.sessionStorage.getItem("activeMenu") === null
          ? "/home"
          : window.sessionStorage.getItem("activeMenu"),
    };
  },
  computed: {},
  created() {
  },
  methods: {
    // 保存激活菜单项
    setDefaultActive(activeMenu) {
      window.sessionStorage.setItem("activeMenu", activeMenu);
    },

  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
  background-color: inherit;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: inherit;
}
</style>