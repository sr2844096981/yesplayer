<template>
  <div>
    <div class="grouping-title clearfix">
      <p>{{componentInfo.title}}</p>
      <el-button
      v-if="componentInfo.icon"
        :icon="componentInfo.icon"
        size="medium"
        circle
        @click="clickBtn"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    componentInfo:{
      typeof:Object,
      default:()=>{}
    }
  },
  data() {
    return {};
  },
  methods: {
    clickBtn(){
      this.$emit("clickGroupTitleBtn")
      console.log(this.componentInfo);
    }
  },
};
</script>

<style lang="scss" scoped>
.grouping-title {
    p {
        float: left;
        font-size: 22px;
        color: #3e3e42;
        margin-bottom: 36px;
    }
    .el-button {
        float: right;
        margin-right: 160px;
    }
}
</style>