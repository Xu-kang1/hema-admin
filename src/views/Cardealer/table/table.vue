<template>
<div>
  <el-table
  ref='singleTable'
  :data='tableData'
  highlight-current-row
  @row-click='rowClick'
  @current-change='handleCurrentChange'
  border
  style='width: 100%'>
  <el-table-column
    type='index'
    label='序号'
    width='50'>
  </el-table-column>
  <el-table-column
    prop='name'
    label='用户姓名'
    width='80'>
  </el-table-column>
   <el-table-column
    prop='phone'
    label='手机号'
    width='110'>
  </el-table-column>
  <!-- <el-table-column
    prop='sex'
    label='性别'>
  </el-table-column> -->
  <el-table-column
    prop='idCardNo'
    label='身份证号'
    width='170'>
  </el-table-column>
  <!-- <el-table-column
    prop='state'
    label='认证状态'>
  </el-table-column> -->
    <el-table-column label="认证状态" width="100" filter-placement="bottom-end">
      <template slot-scope="scope">
        <p>{{getState(scope)}}</p>
      </template>
    </el-table-column>
  <el-table-column
    prop='shopInfo.userName'
    label='所属车商'>
  </el-table-column>
  <el-table-column
    prop='shopInfo.shopName'
    label='店铺名'>
  </el-table-column>
   <el-table-column
    prop='city'
    label='所在城市'>
  </el-table-column>
  <el-table-column
    prop='shopInfo.addr'
    label='店铺地址'>
  </el-table-column>
  <el-table-column
    label='注册时间'
    width='100'>
    <template slot-scope="scope">
      <p>{{ scope.row.createTime}}</p>
    </template>
  </el-table-column>
  </el-table>
  <!-- <div style='margin-top: 20px'>
  <el-button @click='setCurrent(tableData[1])'>选中第二行</el-button>
  <el-button @click='setCurrent()'>取消选择</el-button>
  </div> -->
  <Tab :show.sync="show" :userInfo="userInfo"></Tab>
</div>
</template>
<script>
// import axios from '../../../../config/http'
import Tab from '../tab'
export default {
  components: {
    Tab
  },
  props: {
    tableData: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      userState: null,
      userInfo: null,
      currentRow: null,
      show: false
    }
  },
  mounted () {
    // this.getlist()
    // this.createTime = this.createTime.substring(0, 10)
  },
  methods: {
    // setCurrent (row, index) {
    //   this.$refs.singleTable.setCurrentRow(row)
    //   // console.log(row, index)
    // },
    getState (scope) {
      // 未认证用户
      let userState = ''
      if (scope.row.userType === 1 && scope.row.auditStatus === 0) {
        userState = this.userState = '未认证'
        return userState
      }
      if (scope.row.userType === 1 && scope.row.auditStatus === 1) {
        userState = this.userState = '待审核'
        return userState
      }
      if (scope.row.userType === 1 && scope.row.auditStatus === 3) {
        userState = this.userState = '审核失败'
        return userState
      }
      if (scope.row.userType === 1 && scope.row.auditStatus === 2) {
        userState = this.userState = '认证成功'
        return userState
      }
      if (scope.row.userType === 2) {
        userState = this.userState = '认证经纪人'
        return userState
      }
      if (scope.row.userType === 3) {
        userState = this.userState = '认证车商'
        return userState
      }
      // return this.userState
    },
    rowClick (row, event, column) {
      // this.show = !this.show
      this.show = true
      this.userInfo = row
      // console.log(this.userInfo, this.show)
    },
    handleCurrentChange (val, rowIndex) {
      this.currentRow = val
      // this.$router.push({path:'/'})
      // console.log(this.currentRow, 1)
    },
    filterTag (value, row) {
      return row.state === value
    }
    // 获取数据列表
    // getlist () {
    //   axios.post('/getCumList').then(res => {
    //     this.tableData = res.data.tableData
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
</style>
