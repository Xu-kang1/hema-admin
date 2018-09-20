<template>
  <el-table
  ref='singleTable'
  :data='tableData'
  highlight-current-row
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
    width='120'>
  </el-table-column>
   <el-table-column
    prop='phone'
    label='手机号'>
  </el-table-column>
  <el-table-column
    prop='sex'
    label='性别'>
  </el-table-column>
  <el-table-column
    prop='idCode'
    label='身份证号'>
  </el-table-column>
  <!-- <el-table-column
    prop='state'
    label='认证状态'>
  </el-table-column> -->
    <el-table-column prop="state" label="认证状态" width="100" :filters="[{ text: '未认证', value: '未认证' }, { text: '认证中', value: '认证中' }, { text: '认证车商', value: '认证车商' }, { text: '认证经纪人', value: '认证经纪人' }]"
     :filter-method="filterTag" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag :type="scope.row.state === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.state}}</el-tag>
      </template>
    </el-table-column>
  <el-table-column
    prop='state'
    label='所属车商'>
  </el-table-column>
  <el-table-column
    prop='shopName'
    label='店铺名'>
  </el-table-column>
   <el-table-column
    prop='city'
    label='所在城市'>
  </el-table-column>
  <el-table-column
    prop='shopAdress'
    label='店铺地址'>
  </el-table-column>
  <el-table-column
    prop='registerTime'
    label='注册时间'>
  </el-table-column>
  </el-table>
  <!-- <div style='margin-top: 20px'>
  <el-button @click='setCurrent(tableData[1])'>选中第二行</el-button>
  <el-button @click='setCurrent()'>取消选择</el-button>
  </div> -->
</template>
<script>
import axios from '../../config/http'
export default {
  data () {
    return {
      // 'tableData': [{
      //   'name': '王大虎',
      //   'phone': 13098812341,
      //   'sex': '男',
      //   'idCode': 420902199807131200,
      //   'shopName': '北京奔驰4S（知春路）店',
      //   'carDealer': '北京华顺奔驰行',
      //   'state': '未认证',
      //   'city': '北京',
      //   'shopAdress': '北京市海淀区知春路68号',
      //   'registerTime': '2016-03-10'
      // },
      // {
      //   'name': '王大虎',
      //   'phone': 13098812341,
      //   'sex': '男',
      //   'idCode': 420902199807131200,
      //   'shopName': '北京奔驰4S（知春路）店',
      //   'carDealer': '北京华顺奔驰行',
      //   'state': '认证中',
      //   'city': '北京',
      //   'shopAdress': '北京市海淀区知春路68号',
      //   'registerTime': '2016-03-10'
      // },
      // {
      //   'name': '王大虎',
      //   'phone': 13098812341,
      //   'sex': '男',
      //   'idCode': 420902199807131200,
      //   'shopName': '北京奔驰4S（知春路）店',
      //   'carDealer': '北京华顺奔驰行',
      //   'state': '认证车商',
      //   'city': '北京',
      //   'shopAdress': '北京市海淀区知春路68号',
      //   'registerTime': '2016-03-10'
      // },
      // {
      //   'name': '王大虎',
      //   'phone': 13098812341,
      //   'sex': '男',
      //   'idCode': 420902199807131200,
      //   'shopName': '北京奔驰4S（知春路）店',
      //   'carDealer': '北京华顺奔驰行',
      //   'state': '认证经纪人',
      //   'city': '北京',
      //   'shopAdress': '北京市海淀区知春路68号',
      //   'registerTime': '2016-03-10'
      // },
      // {
      //   'name': '王大虎',
      //   'phone': 13098812341,
      //   'sex': '男',
      //   'idCode': 420902199807131200,
      //   'shopName': '北京奔驰4S（知春路）店',
      //   'carDealer': '北京华顺奔驰行',
      //   'state': '认证经纪人',
      //   'city': '北京',
      //   'shopAdress': '北京市海淀区知春路68号',
      //   'registerTime': '2016-03-10'
      // },
      // {
      //   'name': '王大虎',
      //   'phone': 13098812341,
      //   'sex': '男',
      //   'idCode': 420902199807131200,
      //   'shopName': '北京奔驰4S（知春路）店',
      //   'carDealer': '北京华顺奔驰行',
      //   'state': '认证中',
      //   'city': '北京',
      //   'shopAdress': '北京市海淀区知春路68号',
      //   'registerTime': '2016-03-10'
      // },
      // {
      //   'name': '王大虎',
      //   'phone': 13098812341,
      //   'sex': '男',
      //   'idCode': 420902199807131200,
      //   'shopName': '北京奔驰4S（知春路）店',
      //   'carDealer': '北京华顺奔驰行',
      //   'state': '认证中',
      //   'city': '北京',
      //   'shopAdress': '北京市海淀区知春路68号',
      //   'registerTime': '2016-03-10'
      // },
      // {
      //   'name': '王大',
      //   'phone': 13098812341,
      //   'sex': '男',
      //   'idCode': 420902199807131200,
      //   'shopName': '杭州奔驰4S（转塘路）店',
      //   'carDealer': '杭州华顺奔驰行',
      //   'state': '未认证',
      //   'city': '杭州',
      //   'shopAdress': '杭州市西湖区转塘云计算产业园',
      //   'registerTime': '2018-06-10'
      // }
      // ],
      currentRow: null,
      tableData: null
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    // setCurrent (row, index) {
    //   this.$refs.singleTable.setCurrentRow(row)
    //   // console.log(row, index)
    // },
    handleCurrentChange (val, rowIndex) {
      this.currentRow = val
      // this.$router.push({path:'/'})
      console.log(this.currentRow.id)
    },
    filterTag (value, row) {
      return row.state === value
    },
    // 获取数据列表
    getlist () {
      axios.post('/getCumList').then(res => {
        this.tableData = res.data.tableData
      })
    }
  }
}
</script>
