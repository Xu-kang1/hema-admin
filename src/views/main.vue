<template>
  <div class="app-wrapper">
      <Sidemune></Sidemune>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item> -->
          <div class="title">河马车商宝后台管理系统</div>
          <div class="login">
            <span>{{userName}}</span>
            <span @click="loginOut" style="margin-left:20px;cursor: pointer;">退出</span>
          </div>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <!-- <Table></Table> -->
        <!-- <Tab></Tab> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>

import Sidemune from '../components/sidemenu'
import Table from '../components/table'
export default {
  components: {
    Sidemune,
    Table
  },
  data () {
    return {
      userName: ''
    }
  },
  mounted () {
    this.$router.push('/main/cardealer')
    this.getLeader()
  },
  methods: {
    getLeader () {
      this.userName = sessionStorage.getItem('name')
    },
    loginOut () {
      sessionStorage.clear()
      this.$router.replace({path: '/login'})
    }
  }
}
</script>

<style lang="less" scoped>
// .el-breadcrumb{
//   display: flex;
//   justify-content:flex-end;
// }
.title{
  display: inline-block;
  line-height:60px;
  float:left;
  font-size: 20px;
  font-weight:bold;
}
  .login{
    height:60px;
    display: inline-flex;
    align-items: center;
    margin-right:20px;
  }
  .tac {
    background:#1f2d3d!important;
  }
 .el-select/deep/.el-input {
    min-width: 130px;
  }
.app-wrapper{
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
}
@bg01: rgb(48, 65, 86);
@hover: rgb(38,52,69);
.el-aside{
    background: @bg01;
    color:#fff;
    height:100%;
    &:hover{
      background: @hover
    }
}
.el-header{
  width:100%;
  line-height: 60px;
  background: #EAF6FF;
  text-align: right;
}
#app/deep/.el-menu {
  height:100% !important;
}
</style>
