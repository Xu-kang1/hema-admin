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
        <el-form :inline="true"  class="demo-form-inline" style="text-align: left;margin-top: 1rem">
          <el-form-item label="是否押车：">
            <el-select v-model="mortgageValue" placeholder="请选择">
              <el-option
                v-for="item in mortgageState"
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
        <el-form-item label="借款状态：">
          <el-select v-model="stateValue" placeholder="请选择">
            <el-option
              v-for="item in deloadState"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-form>
      </template>
    </div>
    <div id="creditTable">
      <el-table
        :data='tableData'
        highlight-current-row
        @row-click='rowClick'
        border
        style='width: 100%'>
        <el-table-column
          type='index'
          label='序号'
          width='50'
          prop="id"
          align="center">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop='userName'-->
          <!--label='姓名'>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label='手机号'-->
          <!--prop="phone">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label='店铺名'-->
          <!--prop="shopName">-->
        <!--</el-table-column>-->
        <el-table-column
          label='借贷金额（万元）'
          prop="money"
          align="center">
        </el-table-column>
        <el-table-column
          label='期望放款时间'
          prop="expectLoanTime"
          width="110"
          align="center">
          <template slot-scope="scope">
            <p>{{scope.row.expectLoanTime[0]}}</p>
            <p>{{scope.row.expectLoanTime[1]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label='押车'
          prop="mortgage"
          align="center">
        </el-table-column>
        <el-table-column
          label='银行卡号'
          prop="bankNo"
          align="center"
          width="90">
        </el-table-column>
        <el-table-column
          label='开户行'
          prop="bankOfDeposit"
          align="center">
        </el-table-column>
        <el-table-column
          min-width='100'
          prop='status,statusText' label='借贷状态'
          align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '1' ? 'success' : 'primary'" disable-transitions>{{scope.row.statusText}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label='已借天数'
          prop="loanDays"
          align="center">
        </el-table-column>
        <el-table-column
          label='剩余借贷金额（万元）'
          align="center"
          prop="remain">
        </el-table-column>
        <el-table-column
          min-width='100'
          prop='level,levelText' label='授信等级'
          align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.level === '0' ? 'primary' : 'success'" disable-transitions>{{scope.row.levelText}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label='申请时间'
          prop="gmtCreate"
          align="center"
          width="110">
        </el-table-column>
        <el-table-column
          label='门店审核'
          fixed="right"
          prop="status, shopAuthResult"
          width='148'
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click.stop="handleEditShop(scope.$index, scope.row)" v-show="scope.row.status === 0">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleDeleteShop(scope.$index, scope.row)"  v-show="scope.row.status === 0">拒绝</el-button>
            <el-tag type="success" v-show="scope.row.status!== 0&&scope.row.status !== 2">已通过</el-tag>
            <el-tag type="danger" v-show="scope.row.status === 2 && scope.row.shopAuthResult ===0">已拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label='风控审核'
          fixed="right"
          prop="status,riskAuthResult"
          width='148'
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click.stop="handleEditDanger(scope.$index, scope.row)"  v-show="scope.row.status==5">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleDeleteDanger(scope.$index, scope.row)"  v-show="scope.row.status==5">拒绝</el-button>
            <el-tag type="success" v-show="scope.row.status==1||scope.row.status==3||scope.row.status==4||scope.row.status==6">已通过</el-tag>
            <el-tag type="danger" v-show="scope.row.status === 2 && scope.row.riskAuthResult ===0">已拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label='财务审核'
          fixed="right"
          prop="status,finAuthResult"
          width='148'
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click.stop="handleEditMoney(scope.$index, scope.row)"  v-show="scope.row.status==6">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleDeleteMoney(scope.$index, scope.row)"  v-show="scope.row.status==6">拒绝</el-button>
            <el-tag type="success" v-show="scope.row.status==1||scope.row.status==3||scope.row.status==4">已通过</el-tag>
            <!--<span v-show="scope.row.status==1||scope.row.status==3||scope.row.status==4">已通过</span>-->
            <el-tag type="danger" v-show="scope.row.status === 2 && scope.row.finAuthResult ===0">已拒绝</el-tag>
          </template>
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
    <el-dialog :visible.sync="dialogTableVisible" width="60%">
      <div id="detail" style="margin-top: 2rem">
        <el-tabs type="border-card">
          <el-tab-pane label="借贷信息">
            <div style="text-align: left">
              姓&nbsp;&nbsp;&nbsp;&nbsp;名： <input type="text" class="myInput" v-model="userName"/>
              性别： <input type="text" class="myInput" v-model="sex"/>
              身份证号： <input type="text" class="myInput" style="width: 35%" v-model="idCardNo"/>
            </div>
            <div style="text-align: left;margin-top: 0.5rem">
              手机号： <input type="text" class="myInput" style="width: 25%" v-model="phone"/>
              店铺名： <input type="text" class="myInput" style="width: 30%" v-model="shopName"/>
            </div>
            <div style="text-align: left;margin-top: 0.5rem">
              押&nbsp;&nbsp;&nbsp;&nbsp;车： <input type="text" class="myInput" style="width: 10%" v-model="mortgage"/>
              期望放款时间： <input type="text" class="myInput" style="width: 25%" v-model="expectLoanTime"/>
              借贷金额： <input type="text" class="myInput" style="width: 10%" v-model="money"/> 万元
            </div>
            <div style="text-align: left;margin-top: 0.5rem">
              开户行： <input type="text" class="myInput" style="width: 25%" v-model="bankOfDeposit"/>
              银行卡号： <input type="text" class="myInput" style="width: 30%" v-model="bankNo"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="行驶证">
                <!--<img :src={{drivingLicense}} alt="" style="width: 100%"/>-->
              <div v-for="item in drivingLicense" :key="item" >
                <img :src="item" alt=""/>
              </div>
          </el-tab-pane>
          <el-tab-pane label="车辆登记证">
            <el-row :gutter="40">
              <el-col :span="12" v-for="item in carRegCert" :key="item">
                <img :src="item" alt="" style="width: 100%"/>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="操作记录">
            <el-table
              :data="userEventData"
              border
              style="width: 100%">
              <el-table-column
                label="用户名"
                prop="operUserName">
              </el-table-column>
              <el-table-column
                label="操作事件"
                prop="remark">
              </el-table-column>
              <el-table-column
                label="操作时间"
                prop="gmtCreate"
                format="yyyy-MM-dd">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogTableVisibleSucc" width="40%" :before-close="handleClose">
      <span>确定通过审核？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisibleSucc = false;inputNum=''">取 消</el-button>
        <el-button type="primary" @click="success">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogTableVisibleDefe" width="40%" :before-close="handleClose">
      <span>请填写不通过原因</span>
      <el-input type="textarea" v-model="desc" style="margin-top: 0.5rem"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisibleDefe = false;desc=''">取 消</el-button>
        <el-button type="primary" @click="refuse">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from '../../../../config/http'
export default {
  data () {
    return {
      total: null,
      currentPage: null,
      pageSize: 5,
      selectedOptions: null,
      options: [],
      tableData: null,
      loanId: null,
      userName: null,
      sex: null,
      idCardNo: null,
      phone: null,
      shopName: null,
      mortgage: null,
      expectLoanTime: null,
      money: null,
      bankOfDeposit: null,
      bankNo: null,
      drivingLicense: [],
      carRegCert: [],
      deloadState: [{
        value: '请选择',
        label: '请选择'
      }, {
        value: '待门店审核',
        label: '待门店审核'
      }, {
        value: '待风控审核',
        label: '待风控审核'
      }, {
        value: '待财务审核',
        label: '待财务审核'
      }, {
        value: '待还款',
        label: '待还款'
      }, {
        value: '已还款',
        label: '已还款'
      }, {
        value: '已逾期',
        label: '已逾期'
      }, {
        value: '审核失败',
        label: '审核失败'
      }],
      stateValue: '',
      searchType: [{
        value: '姓名',
        label: '姓名'
      }, {
        value: '手机号',
        label: '手机号'
      }],
      typeValue: '姓名',
      inputIcon: '',
      mortgageState: [{
        value: '请选择',
        label: '请选择'
      }, {
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }],
      mortgageValue: '',
      dialogTableVisible: false,
      userEventData: [],
      dialogTableVisibleSucc: false,
      dialogTableVisibleDefe: false,
      desc: null,
      status: null,
      eventRow: null
    }
  },
  created () {
    let that = this
    axios.post('/fin/admin/searchLoanInfo', {
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
        if (res.data.data.list[idx].mortgage === '0') {
          res.data.data.list[idx].mortgage = '否'
        } else {
          res.data.data.list[idx].mortgage = '是'
        }
        if (res.data.data.list[idx].level === '1') {
          res.data.data.list[idx].levelText = '白银等级'
        } else {
          res.data.data.list[idx].levelText = '黄金等级'
        }
        if (res.data.data.list[idx].status === 0) {
          res.data.data.list[idx].statusText = '待审核'
        } else if (res.data.data.list[idx].status === 1) {
          res.data.data.list[idx].statusText = '审核通过'
        } else if (res.data.data.list[idx].status === 2) {
          res.data.data.list[idx].statusText = '审核失败'
        } else if (res.data.data.list[idx].status === 3) {
          res.data.data.list[idx].statusText = '待还款'
        } else if (res.data.data.list[idx].status === 4) {
          res.data.data.list[idx].statusText = '已还款'
        } else if (res.data.data.list[idx].status === 5) {
          res.data.data.list[idx].statusText = '门店已审核'
        } else if (res.data.data.list[idx].status === 2) {
          res.data.data.list[idx].statusText = '风控已审核'
        }
        res.data.data.list[idx].expectLoanTime = res.data.data.list[idx].expectLoanTime.split(' ')
        that.tableData = res.data.data.list
      })
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
  },
  methods: {
    handleCurrentPageChange () {
      this.tableData = []
      this.liveSearch(true, this.currentPage)
    },
    handleChangeCity (value) {
      this.selectedOptions = value
      console.log(this.selectedOptions)
    },
    liveSearch (isPage, page) {
      console.log(this.typeValue)
      let status, phone, userName, start, mortgage, provinceCode, cityCode
      if (this.typeValue === '姓名' && this.inputIcon !== '') {
        userName = this.inputIcon
      } else if (this.typeValue === '手机号' && this.inputIcon !== '') {
        phone = this.inputIcon
      }
      switch (this.stateValue) {
        case '待门店审核': status = 0
          break
        case '待风控审核': status = 5
          break
        case '待财务审核': status = 6
          break
        case '审核通过': status = 1
          break
        case '审核失败': status = 2
          break
        case '待还款': status = 3
          break
        case '已还款': status = 4
          break
      }
      if (this.mortgageValue === '是') {
        mortgage = 1
      } else if (this.mortgageValue === '否') {
        mortgage = 0
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
        mortgage: mortgage,
        provinceCode: provinceCode,
        cityCode: cityCode,
        start: start,
        size: this.pageSize
      }
      let th = this
      axios.post('/fin/admin/searchLoanInfo', prams, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        console.log(res.data)
        th.total = res.data.data.total
        res.data.data.list.forEach(function (val, idx) {
          console.log(res.data.data.list[idx].level)
          if (res.data.data.list[idx].mortgage === 0) {
            res.data.data.list[idx].mortgage = '否'
          } else {
            res.data.data.list[idx].mortgage = '是'
          }
          if (res.data.data.list[idx].level === '1') {
            res.data.data.list[idx].levelText = '白银等级'
          } else {
            res.data.data.list[idx].levelText = '黄金等级'
          }
          if (res.data.data.list[idx].status === 0) {
            res.data.data.list[idx].statusText = '待审核'
          } else if (res.data.data.list[idx].status === 1) {
            res.data.data.list[idx].statusText = '审核通过'
          } else if (res.data.data.list[idx].status === 2) {
            res.data.data.list[idx].statusText = '审核失败'
          } else if (res.data.data.list[idx].status === 3) {
            res.data.data.list[idx].statusText = '待还款'
          } else if (res.data.data.list[idx].status === 4) {
            res.data.data.list[idx].statusText = '已还款'
          } else if (res.data.data.list[idx].status === 5) {
            res.data.data.list[idx].statusText = '门店已审核'
          } else if (res.data.data.list[idx].status === 2) {
            res.data.data.list[idx].statusText = '风控已审核'
          }
          console.log(res.data.data.list[idx].level)
          res.data.data.list[idx].expectLoanTime = res.data.data.list[idx].expectLoanTime.split(' ')
          th.tableData = res.data.data.list
        })
      })
      console.log(th.tableData)
    },
    search () {
      this.tableData = []
      this.liveSearch(false, this.currentPage)
    },
    handleEditShop (index, row) {
      console.log(index, row)
      this.dialogTableVisibleSucc = true
      this.status = row.status
      this.eventRow = index
      this.loanId = row.id
    },
    handleDeleteShop (index, row) {
      console.log(index)
      this.dialogTableVisibleDefe = true
      this.status = row.status
      this.eventRow = index
      this.loanId = row.id
    },
    handleEditDanger (index, row) {
      console.log(index, row)
      this.dialogTableVisibleSucc = true
      this.status = row.status
      this.eventRow = index
      this.loanId = row.id
    },
    handleDeleteDanger (index, row) {
      console.log(index)
      this.dialogTableVisibleDefe = true
      this.status = row.status
      this.eventRow = index
      this.loanId = row.id
    },
    handleEditMoney (index, row) {
      console.log(index, row)
      this.dialogTableVisibleSucc = true
      this.status = row.status
      this.eventRow = index
      this.loanId = row.id
    },
    handleDeleteMoney (index, row) {
      console.log(index)
      this.dialogTableVisibleDefe = true
      this.status = row.status
      this.eventRow = index
      this.loanId = row.id
    },
    handleClose () {
      this.dialogTableVisibleSucc = false
      this.dialogTableVisibleDefe = false
    },
    success () {
      let refuseMsg = '已成功'
      let that = this
      let type
      if (this.status === 0) {
        type = 1
      } else if (this.status === 5) {
        type = 2
      } else if (this.status === 6) {
        type = 3
      }
      axios.post('/fin/admin/auditLoanInfo', {
        loanId: this.loanId,
        type: type,
        passed: true
      }, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.flag === true) {
          if (that.status === 0) {
            that.tableData[that.eventRow].status = 5
            refuseMsg = '门店审核已通过'
          } else if (that.status === 5) {
            this.tableData[that.eventRow].status = 6
            refuseMsg = '风控审核已通过'
          } else if (that.status === 6) {
            that.tableData[that.eventRow].status = 1
            refuseMsg = '已通过，可前往待还款查看'
            that.tableData.splice(that.eventRow, 1)
          }
          that.$alert('操作成功', '通过', {
            confirmButtonText: '确定',
            callback: action => {
              that.$message({
                type: 'info',
                message: `${refuseMsg}`
              })
            }
          })
        } else {
          alert(res.data.msg)
        }
      }).catch(error => {
        console.log(error)
      })
      this.dialogTableVisibleSucc = false
    },
    refuse () {
      let refuseMsg = '已拒绝'
      let that = this
      let type
      if (this.status === 0) {
        type = 1
      } else if (this.status === 5) {
        type = 2
      } else if (this.status === 6) {
        type = 3
      }
      axios.post('/fin/admin/auditLoanInfo', {
        loanId: this.loanId,
        type: type,
        passed: false,
        remark: this.desc
      }, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.flag === true) {
          this.tableData.splice(this.eventRow, 1)
          refuseMsg = '已拒绝，可前往审核失败查看'
          that.$alert('操作成功', '拒绝', {
            confirmButtonText: '确定',
            callback: action => {
              that.$message({
                type: 'info',
                message: `${refuseMsg}`
              })
            }
          })
        } else {
          alert(res.data.msg)
        }
      })
      this.dialogTableVisibleDefe = false
    },
    rowClick (row, event, column) {
      console.log(row)
      this.dialogTableVisible = true
      this.drivingLicense = []
      this.carRegCert = []
      axios.post('/fin/admin/loanInfoDetail', {
        loanId: row.id
      }, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        let result = res.data.data
        if (result.mortgage === 1) {
          result.mortgage = '是'
        } else {
          result.mortgage = '否'
        }
        this.mortgage = result.mortgage
        this.expectLoanTime = result.expectLoanTime
        this.money = result.money
        this.bankOfDeposit = result.bankOfDeposit
        this.bankNo = result.bankNo
        this.drivingLicense.push(result.carCertInfoList[0].drivingLicense)
        this.carRegCert.push(result.carCertInfoList[0].carRegCert1)
        this.carRegCert.push(result.carCertInfoList[0].carRegCert2)
        console.log(this.carCertInfoList)
      })
      // 获取操作记录
      axios.post('/fin/admin/queryLoanOperRecord', {
        loanId: row.id,
        size: 10,
        start: 0
      }, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        this.userEventData = res.data.data
      }).catch(res => {
        console.log(res.data.msg)
      })
      // 获取用户信息
      axios.post('/user/getUserInfo', {
        uId: row.userId
      }, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        let result = res.data.data
        this.userName = result.name
        if (result.sex === 'm') {
          result.sex = '男'
        } else {
          result.sex = '女'
        }
        this.sex = result.sex
        this.idCardNo = result.idCardNo
        this.phone = result.phone
        this.shopName = result.shopName
      })
    },
    // handleCurrentChange (val, rowIndex) {
    //   this.currentRow = val
    //   console.log(this.currentRow, rowIndex)
    // },
    filterTag (value, row) {
      console.log(value, row)
      return row.rangeState === value
    },
    filterRange (value, row) {
      return row.range === value
    }
  }
}
</script>
<style lang="less" scoped>
  .myInput{
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 10%;
    margin-right: 5px;
  }
</style>
