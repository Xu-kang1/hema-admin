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
      <el-button class="search" @click="search" slot="append" type="primary">搜索</el-button>
    </div>
    <div class="selectCity">
      <span>代办状态：</span>
      <el-select v-model="value1" clearable slot="prepend" placeholder="请选择">
        <el-option
        v-for="item in option2"
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
      <span>代办人：</span>
      <el-select v-model="value2" clearable slot="prepend" placeholder="请选择">
        <el-option
        v-for="item in option"
        :key="item.agentName"
        :label="item.agentName"
        :value="item.id">
        </el-option>
      </el-select>
    </div>
    <table-List :tableData="tableData"></table-List>
    <div class="block" v-if="iCanSee">
      <el-pagination
        @current-change="changePage"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total= total>
      </el-pagination>
    </div>
    <!-- <diaLog show-diaLog="showDialog"></diaLog> -->

  </div>
</template>
<script>
import TableList from './table/tableList'
// import diaLog from './dialog/dialog'
import axios from '../../../config/http'
export default {
  components: {
    TableList
    // diaLog
  },
  data () {
    return {
      input: '',
      iCanSee: false,
      options: [{value: '姓名', label: '姓名'}, {value: '手机号', label: '手机号'}],
      // 初始化
      option2: [{value: 0, label: '待指派'}, {value: 1, label: '待接单'}, {value: 2, label: '已接单'}, {value: 3, label: '已拒单'}, {value: 4, label: '已取消'}, {value: 5, label: '办理审核中'}, {value: 6, label: '办理未通过'}, {value: 7, label: '待支付'}, {value: 8, label: '已完成'}],
      tableData: null,
      // agenct: null,
      options_: [],
      selectedOptions: null,
      option: [],
      value1: '',
      value2: '',
      value: '姓名',
      select: '',
      currentPage: 1,
      // userinfo
      token: sessionStorage.getItem('token'),
      uid: sessionStorage.getItem('id')
    }
  },
  mounted () {
    this.getAllCity()
    this.search()
    // this.openPrompt()
  },
  methods: {
    search () {
      // let token = sessionStorage.getItem('token')
      // let uid = sessionStorage.getItem('id')
      this.currentPage = 1
      if (this.selectedOptions === null) {
        this.selectedOptions = []
      }
      let config = ''
      if (this.value === '姓名') {
        config = 'userName'
      } else {
        config = 'phone'
      }
      this.getData(config, 0, 10)
      // axios.post('/agency/admin/searchAgencyAppoInfo', {
      //   phone: '',
      //   status: '',
      //   cityCode: this.selectedOptions[1],
      //   agentUserId: '',
      //   size: 20
      // }, {
      //   headers: {
      //     'uId': this.uid,
      //     'token': this.token
      //   }
      // }).then(res => {
      //   this.tableData = res.data.data.list
      //   // console.log(res)
      // })
    },
    getData (config, start, size) {
      let token = sessionStorage.getItem('token')
      let uid = sessionStorage.getItem('id')
      var data_ = {config: this.input, status: this.value1, cityCode: this.cityCode, agentUserId: this.value2, start: start, size: size}
      let dataa = JSON.stringify(data_).replace('config', config)
      // console.log(config, this.input, this.cityCode, dataa)
      axios({
        method: 'POST',
        url: '/agency/admin/searchAgencyAppoInfo',
        data: dataa,
        headers: {
          'uId': uid,
          'token': token
        }
      }).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
        console.log(this.total)
        if (this.tableData) {
          this.iCanSee = true
        }
      })
    },
    searchAgent () {
      axios.post('/user/queryAgentByCity', {
        cityCode: this.selectedOptions[1]
      }, {
        headers: {
          uId: this.uid,
          token: this.token
        }
      }).then(res => {
        this.option = res.data.data
        // this.agenct = this.option
        // console.log(res.data, 1)
      })
    },
    handleChange () {
      this.searchAgent()
    },
    getAllCity () {
      // let token = sessionStorage.getItem('token')
      this.$nextTick(function () {
        axios({
          method: 'POST',
          url: '/common/queryProvinceCity',
          headers: {
            'token': this.token
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
    // 分页切换
    changePage (currentPage) {
      let config = ''
      if (this.value === '姓名') {
        config = 'userName'
      } else {
        config = 'phone'
      }
      console.log(this.total)
      this.getData(config, (currentPage - 1) * 10, 10)
    },
    openPrompt () {
      this.$prompt('请输入拒绝原因', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '拒单原因: ' + value
        })
      })
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
