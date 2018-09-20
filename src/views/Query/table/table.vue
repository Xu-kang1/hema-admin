<template>
  <div>
    <div id="creditSearch">
      <template>
        <el-row>
          <el-col :span="4">
            <el-select v-model="typeValue" placeholder="请选择">
              <el-option
                v-for="item in searchType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-input
              placeholder="请输入内容"
              v-model="inputIcon"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="search">搜索</el-button>
          </el-col>
        </el-row>
        <el-form :inline="true" v-model="formInline" class="demo-form-inline" style="text-align: left;margin-top: 1rem">
          <el-form-item label="查询状态：">
            <el-select v-model="stateValue" placeholder="请选择">
              <el-option
                v-for="item in creditState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在城市：">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              @change="handleChangeCity">
            </el-cascader>
          </el-form-item>
        </el-form>
      </template>
    </div>
    <div id="creditTable">
      <el-table :data='tableData' highlight-current-row  border
                style='width: 100%;text-align: center'>
        <el-table-column prop='id' type="index" label='序号' width='50'  align="center">
        </el-table-column>
        <el-table-column prop='userName' label='姓名' align="center">
        </el-table-column>
        <el-table-column prop='phone' label='手机号' align="center">
        </el-table-column>
        <!--<el-table-column prop='idCardNo' label='身份证号' align="center">-->
        <!--</el-table-column>-->
        <!-- <el-table-column
          prop='state'
          label='售价(万元)'>
        </el-table-column> -->
        <el-table-column prop='shopName' label='店铺名' align="center">
        </el-table-column>
        <el-table-column prop='vin' label='VPN码' align="center">
        </el-table-column>
        <el-table-column prop='carBrand' label='品牌' align="center">
        </el-table-column>
        <el-table-column min-width='100' prop='statusText,status' align="center" label='查询状态'>
          <template slot-scope="scope">
            <div>
              <el-tag :type="scope.row.status == '3' ? 'success' : 'primary'" disable-transitions>
                {{scope.row.statusText}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop='gmtCreate' label='查询时间' align="center" width="110">
          <template slot-scope="scope">
            <p>{{scope.row.gmtCreate[0]}}</p>
            <p>{{scope.row.gmtCreate[1]}}</p>
          </template>
        </el-table-column>
        <el-table-column prop='status,remark,statusText' label='操作' fixed="right" width='155' align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click.stop="handleEdit(scope.$index, scope.row)" v-show="scope.row.status === 3">查看详情
            </el-button>
            <span v-show="scope.row.status !== 3">{{scope.row.statusText}}</span>
          </template>
          =
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="float: right">
      <el-pagination
        layout="total,  prev, pager, next, jumper"
        :total="total"
        :page-size="pageSize"
        @current-change="handleCurrentPageChange"
        :current-page.sync="currentPage">
      </el-pagination>
    </div>
    <!--<div class="block">-->
      <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage4"-->
        <!--:page-sizes="[100, 200, 300, 400]"-->
        <!--:page-size="100"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="400">-->
      <!--</el-pagination>-->
    <!--</div>-->
    <el-dialog :visible.sync="dialogTableVisible" width="50%">
      <div id="detail" style="margin: 2rem 0">
        <div v-show="this.listData.length === 0" style="color: #bbb;font-size: 16px">暂无详细信息</div>
        <!--<ul v-show="this.listData.length !== 0">-->
          <!--<li v-for="(value, key) in listData" :key="key" style="margin: 0 0 0.8rem 2rem;text-align: left">{{value}}</li>-->
        <!--</ul>-->
        <div style="margin: 1.5rem;font-size: 20px">{{listData.carBrand}}</div>
        <ul>
          <li class="agn-left">
            <div style="float: left">最后入店时间</div>
            <div class="agn-right">{{listData.lastTimeToShop}}</div>
          </li>
          <li class="agn-left">
            <div style="float: left">最后入店里程</div>
            <div class="agn-right">{{listData.totalMileage}} Km</div>
          </li>
          <li class="agn-left">
            <div style="float: left">事故次数</div>
            <div class="agn-right">{{listData.numberOfAccidents}} 次</div>
          </li>
          <li class="agn-left">
            <div style="float: left">报告生成时间</div>
            <div class="agn-right">{{listData.gmtCreate}}</div>
          </li>
          <hr>
          <li class="agn-left">
            <div style="float: left">结构部件</div>
            <div class="agn-right">{{listData.desc1}}</div>
          </li>
          <li class="agn-left">
            <div style="float: left">发动机</div>
            <div class="agn-right">{{listData.desc1}}</div>
          </li>
          <li class="agn-left">
            <div style="float: left">里程数</div>
            <div class="agn-right">{{listData.desc1}}</div>
          </li>
          <li class="agn-left">
            <div style="float: left">安全气囊</div>
            <div class="agn-right">{{listData.desc1}}</div>
          </li>
        </ul>
        <p style="margin: 15px 0;font-size: 20px">全部记录</p>
        <hr>
        <ul class="allRe">
          <li v-for="(val, key) in userEventData" :key="key">
            <div class="reTop">
              <p>{{val.date.split(' ')[0]}}</p>
              <p>{{val.kilm}}公里</p>
              <p>{{val.remark}}</p>
            </div>
            <div class="reX">
              <span>项目：</span>
              <div>{{val.detail}}</div>
            </div>
            <div class="reC">
              <span>材料：</span>
              <div>{{val.cailiao}}</div>
            </div>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from '../../../../config/http'
export default {
  data () {
    return {
      selectedOptions: null,
      options: [],
      listData: [], // 详情信息
      inputVPN: null,
      total: null, // 总列条数
      currentPage: 1,
      pageSize: 5,
      userId: null,
      tableData: [], // 查询列表
      dialogTableVisible: false, // 查询信息开关
      //
      formInline: '',
      searchType: [{
        value: '姓名',
        label: '姓名'
      }, {
        value: '手机号',
        label: '手机号'
      }, {
        value: '店铺名',
        label: '店铺名'
      }],
      typeValue: '姓名',
      inputIcon: '',
      creditState: [{
        value: '请选择',
        label: '请选择'
      }, {
        value: '可查询',
        label: '可查询'
      }, {
        value: '下单成功',
        label: '下单成功'
      }, {
        value: '下单失败',
        label: '下单失败'
      }, {
        value: '查询成功',
        label: '查询成功'
      }, {
        value: '查询失败',
        label: '查询失败'
      }],
      stateValue: '请选择',
      currentRow: null, // 查询选中列表
      eventRow: null, // 操作事件的Row
      userEventData: [] // 操作记录信息
    }
  },
  created () {
    // this.dialogTableVisible = true
    var that = this
    axios.post('/car/admin/search4SRecord', {
      // status: 0,
      start: 0,
      size: this.pageSize

    }, {
      headers: {
        'token': sessionStorage.getItem('token')
      }
    }).then(res => {
      console.log(res.data)
      that.total = res.data.data.total
      res.data.data.list.forEach(function (val, idx) {
        switch (res.data.data.list[idx].status) {
          case 0: res.data.data.list[idx].statusText = '可查询'
            break
          case 1: res.data.data.list[idx].statusText = '下单成功'
            break
          case 2: res.data.data.list[idx].statusText = '下单失败'
            break
          case 3: res.data.data.list[idx].statusText = '查询成功'
            break
          case 4: res.data.data.list[idx].statusText = '查询失败'
            break
        }
        if (!res.data.data.list[idx].carBrand) {
          res.data.data.list[idx].carBrand = '未知'
        }
        res.data.data.list[idx].gmtCreate = res.data.data.list[idx].gmtCreate.split(' ')
      })
      that.tableData = res.data.data.list
    }).catch(error => {
      console.log(error)
    })
    let th = this
    axios.post('/common/queryProvinceCity', {}, {
      headers: {
        'token': sessionStorage.getItem('token')
      }
    }).then(res => {
      let cityMsg = res.data.data
      for (let key in cityMsg) {
        th.options.push({
          value: cityMsg[key].provinceCode,
          label: cityMsg[key].province,
          children: []
        })
        for (let key_ in cityMsg[key].cityList) {
          th.options[key].children.push({
            value: cityMsg[key].cityList[key_].cityCode,
            label: cityMsg[key].cityList[key_].city
          })
        }
      }
      th.options.unshift({
        value: '请选择',
        label: '请选择'
      })
    }).catch(error => {
      console.log(error)
    })
    // axios.post('/car/admin/fourSRecordDetail', {
    //   id: 238
    // }, {
    //   headers: {
    //     'token': sessionStorage.getItem('token')
    //   }
    // }).then(res => {
    // })
  },
  methods: {
    handleChangeCity (value) {
      this.selectedOptions = value
      console.log(this.selectedOptions)
    },
    handleCurrentPageChange () {
      this.liveSearch(true, this.currentPage)
    },
    // 封装搜索模块
    liveSearch (isPage, page) {
      console.log(page)
      let status, phone, userName, shopName, start, cityCode, provinceCode
      if (this.typeValue === '姓名' && this.inputIcon !== '') {
        userName = this.inputIcon
      } else if (this.typeValue === '手机号' && this.inputIcon !== '') {
        phone = this.inputIcon
      } else if (this.typeValue === '店铺名' && this.inputIcon !== '') {
        shopName = this.inputIcon
      }
      switch (this.stateValue) {
        case '可查询' :
          status = 0
          break
        case '下单成功' :
          status = 1
          break
        case '下单失败' :
          status = 2
          break
        case '查询成功' :
          status = 3
          break
        case '查询失败' :
          status = 4
          break
      }
      if (isPage) {
        start = (page - 1) * this.pageSize
      } else {
        start = 0
        this.currentPage = 1
      }
      if (this.selectedOptions) {
        if (this.selectedOptions[0] === '请选择') {

        } else {
          provinceCode = this.selectedOptions[0]
          cityCode = this.selectedOptions[1]
        }
      }
      let prams = {
        status: status,
        phone: phone,
        userName: userName,
        shopName: shopName,
        start: start,
        size: this.pageSize,
        provinceCode: provinceCode,
        cityCode: cityCode
      }
      console.log(prams)
      let th = this
      axios.post('/car/admin/search4SRecord', prams, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        console.log(res.data)
        th.total = res.data.data.total
        res.data.data.list.forEach(function (val, idx) {
          switch (res.data.data.list[idx].status) {
            case 0: res.data.data.list[idx].statusText = '可查询'
              break
            case 1: res.data.data.list[idx].statusText = '下单成功'
              break
            case 2: res.data.data.list[idx].statusText = '下单失败'
              break
            case 3: res.data.data.list[idx].statusText = '查询成功'
              break
            case 4: res.data.data.list[idx].statusText = '查询失败'
              break
            default: res.data.data.list[idx].statusText = '请选择'
          }
          if (!res.data.data.list[idx].carBrand) {
            res.data.data.list[idx].carBrand = '未知'
          }
          res.data.data.list[idx].gmtCreate = res.data.data.list[idx].gmtCreate.split(' ')
        })
        th.tableData = res.data.data.list
      })
      console.log(this.tableData)
    },
    search () {
      this.liveSearch(false, this.currentPage)
    },
    handleEdit (index, row) {
      this.dialogTableVisible = true
      console.log('查看开始...')
      this.userId = row.id
      this.eventRow = index
      var su = this
      axios.post('/car/admin/fourSRecordDetail', {
        id: row.id
      }, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        res.data.data.carStatus = JSON.parse(res.data.data.carStatus)
        res.data.data.desc1 = res.data.data.carStatus[0].desc
        res.data.data.desc2 = res.data.data.carStatus[1].desc
        res.data.data.desc3 = res.data.data.carStatus[2].desc
        res.data.data.desc4 = res.data.data.carStatus[3].desc
        console.log(res.data.data)
        su.listData = res.data.data
        su.userEventData = res.data.data.list
      })
    },
    handleClose (value, row) {
    },
    rowClick (row, event, column) {
      console.log(row)
    },
    filterTag (value, row) {
      console.log(value, row)
      return row.statusText === value
    },
    filterRange (value, row) {
      return row.levelText === value
    }
  }
}
</script>
<style lang="less" scoped>
  .allRe{
    li{
      text-align: left;
      margin-top: 15px;
      padding-bottom: 30px;
      border-bottom: 1px solid #bbb;
      .reTop{
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        color: #00B8FF;
        /*font-size: 12px;*/
        p{
          float: left;
          margin-right: 100px;
        }
        p:last-child{
          float: right;
          margin: 0;
        }
      }
      .reX{
        span{
          display: inline-block;
          width: 12%;
        }
        div{
          display: inline-block;
          width: 85%;
          vertical-align: text-top;
        }
        margin: 20px 0;
      }
      .reC{
        span{
          display: inline-block;
          width: 12%;
        }
        div{
          display: inline-block;
          width: 85%;
          vertical-align: text-top;
        }
      }
    }
  }
  .agn-left{
    text-align: left;
    overflow: hidden;
    margin: 10px 15px;
  }
  .agn-right{
    text-align: right;
    float: right;
  }
</style>
