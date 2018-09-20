<template>
  <div>
    <div style="margin-top: 15px;text-align:left;">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="value" slot="prepend" placeholder="请选择">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
           </el-option>
        </el-select>
      </el-input>
      <el-button @click="search" slot="append" type="primary">搜索</el-button>
    </div>
    <div class="selectCity">
      <span>认证状态：</span>
      <el-select v-model="value1" clearable slot="prepend" placeholder="请选择">
          <el-option
          v-for="item in option"
          :key="item.value"
          :label="item.label"
          :value="item.value">
           </el-option>
        </el-select>
        <span>所在城市：</span>
         <el-cascader
          :options="options_"
          clearable
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
    </div>
    <Table :tableData="tableData"></Table>
    <div class="block" v-if="iCanSee">
      <el-pagination
        @current-change="changePage"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total= total>
      </el-pagination>
    </div>
    <!-- <Tab :is="currentTab"></Tab> -->
  </div>
</template>
<script>
import Table from './table/table'
import axios from '../../../config/http'
export default {
  components: {
    Table
  },
  data () {
    return {
      currentTab: 'tab',
      option: [{value: 0, label: '未认证'}, {value: 1, label: '待审核'}, {value: 2, label: '认证成功'}, {value: 3, label: '审核失败'}],
      options: [{value: '用户名', label: '用户名'}, {value: '手机号', label: '手机号'}, {value: '店铺名', label: '店铺名'}],
      options_: [],
      input: '',
      value: '用户名',
      value1: '',
      selectedOptions: [],
      show: false,
      cityCode: '',
      lists: [],
      tableData: null,
      total: null,
      currentPage: 1,
      iCanSee: false
    }
  },
  beforeCreate () {
    let token = sessionStorage.getItem('token')
    let user = sessionStorage.getItem('id')
    if (token === null && user === null) {
      console.log('未登录')
      this.$router.replace({path: '/login'})
      return false
    }
  },
  mounted () {
    this.getAllCity()
    this.search()
  },
  methods: {
    search () {
      let config = ''
      this.currentPage = 1
      if (this.value === '用户名') {
        config = 'userName'
      } else if (this.value === '手机号') {
        config = 'phone'
      } else {
        config = 'shopName'
      }
      // 处理空值
      // if (this.input === '') {
      //   this.input = null
      // }
      // if (this.cityCode === '') {
      //   this.cityCode = null
      // }
      this.getData(config, 0, 10)
    },
    getAllCity () {
      let token = sessionStorage.getItem('token')
      this.$nextTick(function () {
        axios({
          method: 'POST',
          url: '/common/queryProvinceCity',
          headers: {
            'token': token
          }
        }).then(res => {
          let arr = []
          res.data.data.forEach((element, index) => {
            let arrB = []
            element.cityList.forEach((element, index_) => {
              arrB.push({value: element.cityCode, label: element.city})
            })
            arr.push({value: element.province, label: element.province, children: arrB})
          })
          this.options_ = arr
          // console.log(this.options_)
        })
      })
    },
    getData (config, start, size) {
      let token = sessionStorage.getItem('token')
      let uid = sessionStorage.getItem('id')
      var data_ = {config: this.input, cityCode: this.cityCode, auditStatus: this.value1, start: start, size: size}
      let dataa = JSON.stringify(data_).replace('config', config)
      // console.log(config, this.input, this.cityCode, dataa)
      axios({
        method: 'POST',
        url: '/user/admin/searchUser',
        data: dataa,
        headers: {
          'uId': uid,
          'token': token
        }
      }).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
        // console.log(this.total)
        if (this.tableData) {
          this.iCanSee = true
        }
      })
    },
    // 切换页数
    changePage (currentPage) {
      let config = ''
      if (this.value === '用户名') {
        config = 'userName'
      } else if (this.value === '手机号') {
        config = 'phone'
      } else {
        config = 'shopName'
      }
      console.log(this.total)
      this.getData(config, (currentPage - 1) * 10, 10)
    },
    handleChange (value) {
      this.cityCode = value[1]
      // console.log(this.cityCode)
    }
  }
}
</script>
<style lang="less" scoped>
.el-select{
  min-width: 105px;
}
// .search{
//   margin-left:-4px;
// }
.selectCity{
  margin-top:10px;
  margin-bottom:10px;
  text-align: left;
}
.input-with-select{
  width:572px;
}
.el-pagination{
  text-align: right;
}
</style>
