<template>
 <el-row class="tac">
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>车商列表</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <router-link :to="links[index]"
        v-for="(item, index) in list"
        :key="item.id">
        <el-menu-item
        :index="String(index)"
        @click.native="getDetail(tabs[index])">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item ,index}}</span>
        </el-menu-item>
      </router-link>
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">车辆列表</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">借贷列表</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">代办列表</span>
      </el-menu-item> -->
    </el-menu>
</el-row>
</template>
<script>
export default {
  data () {
    return {
      // , '车源列表', 'carList', '/main/carList'
      list: ['车商列表', '车源列表', '授信列表', '借贷列表', '代办列表', '查询列表'],
      // list: ['车商列表', '授信'],
      tabs: ['dealer', 'carList', 'credit', 'deload', 'agency', 'search'],
      // tabs: ['dealer', 'credit'],
      links: ['/main/cardealer', '/main/carList', '/main/credit', '/main/deload', '/main/agency', '/main/query']
      // links: ['/main/cardealer', '/main/credit']
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    getDetail (index) {
      console.log(index)
    }
  }
}
</script>
<style lang="less" scoped>
  .el-menu{
    border-right:0;
  }
</style>
