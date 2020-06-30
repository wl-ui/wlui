<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <el-row :gutter="20">
      <el-col :span="6">
        <h3>下拉框</h3>
        <wl-select class="width-240"></wl-select>
      </el-col>
      <el-col :span="6">
        <h3>树下拉框</h3>
        <wl-select-tree width="240px"></wl-select-tree>
      </el-col>
      <el-col :span="6">
        <h3>三级地址</h3>
        <wl-address class="width-240"></wl-address>
      </el-col>
      <el-col :span="6">
        <h3>校验框</h3>
        <wl-input class="width-240"></wl-input>
      </el-col>
      <el-col :span="9">
        <h3>树穿梭框</h3>
        <wl-transfer-tree class="width-460"></wl-transfer-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 25px 0;
  padding: 20px;

  .width-240 {
    width: 240px;
  }
  .width-440 {
    width: 440px;
  }
}
</style>
