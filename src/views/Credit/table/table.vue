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
          <el-form-item label="授信状态：">
            <el-select v-model="stateValue" placeholder="请选择">
              <el-option
                v-for="item in creditState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授信等级：">
            <el-select v-model="levalValue" placeholder="请选择">
              <el-option
                v-for="item in creditLeval"
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
      <el-table :data='tableData' highlight-current-row @row-click="handleCurrentChange" border
                style='width: 100%;text-align: center'>
        <el-table-column prop='id' type="index" label='序号' width='50' align="center">
        </el-table-column>
        <el-table-column prop='userName' label='姓名' align="center">
        </el-table-column>
        <el-table-column prop='phone' label='手机号' width="110" align="center">
        </el-table-column>
        <el-table-column prop='sex' label='性别' align="center">
        </el-table-column>
        <el-table-column prop='idCardNo' label='身份证号' align="center">
        </el-table-column>
        <!-- <el-table-column
          prop='state'
          label='售价(万元)'>
        </el-table-column> -->
        <el-table-column prop='shopName' label='店铺名' align="center">
        </el-table-column>
        <el-table-column min-width='100' prop='level,levelText' align="center" label='授信等级'>
          <template slot-scope="scope">
            <div @click="dialogTableVisible = true">
              <el-tag :type="scope.row.level == '1' ? 'primary' : 'success'" disable-transitions>{{scope.row.levelText}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width='100' prop='statusText,status' align="center" label='授信状态'>
          <template slot-scope="scope">
            <div @click="dialogTableVisible = true">
              <el-tag :type="scope.row.status == '1' ? 'success' : 'primary'" disable-transitions
                      @click="dialogTableVisible = true">
                {{scope.row.statusText}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop='gmtCreate' label='申请时间' align="center" width="110">
          <template slot-scope="scope">
            <p>{{scope.row.gmtCreate[0]}}</p>
            <p>{{scope.row.gmtCreate[1]}}</p>
          </template>
        </el-table-column>
        <el-table-column prop='authUserName,status' label='操作人' align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.status == 1" style="color: #67C23A">{{scope.row.authUserName}}</span>
            <span v-show="scope.row.status != 1">暂无</span>
          </template>
        </el-table-column>
        <el-table-column prop='status,remark' label='操作' fixed="right" width='155' align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click.stop="handleEdit(scope.$index, scope.row)"
                       v-show="scope.row.status==0">通过
            </el-button>
            <el-button size="mini" type="danger" @click.stop="handleDelete(scope.$index, scope.row)"
                       v-show="scope.row.status==0">拒绝
            </el-button>
            <span v-show="scope.row.status==1" style="color: #67C23A">已通过</span>
            <span v-show="scope.row.status==2">{{scope.row.remark}}</span>
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
    <el-dialog :visible.sync="dialogTableVisible" width="50%">
      <div id="detail" style="margin-top: 2rem">
        <el-tabs type="border-card">
          <el-tab-pane label="个人征信">
            <el-row :gutter="10">
              <el-col :span="12" v-for="item in creditCertUrl" :key="item">
                <img :src="item" alt="" style="width: 100%"/>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="银行流水">
            <el-row :gutter="10">
              <el-col :span="8" v-for="item in payWaterUrl" :key="item">
                <img :src="item" alt="" style="width: 100%"/>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="房产证明">
            <el-row :gutter="10">
              <el-col :span="8" v-for="item in shopCertUrl" :key="item">
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
                prop="operUserName"
                label="用户名">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="操作事件">
              </el-table-column>
              <el-table-column
                prop="gmtCreate"
                label="操作时间"
                width="110">
                <template slot-scope="scope">
                  <p>{{scope.row.gmtCreate[0]}}</p>
                  <p>{{scope.row.gmtCreate[1]}}</p>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogTableVisibleSucc" width="40%" :before-close="handleClose">
      <span>请输入授信额度</span>
      <el-input
        placeholder="请输入授信额度"
        v-model="inputNum"
        clearabl style="margin-top: 0.5rem" type="number">
        <template slot="append">万元</template>
      </el-input>
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
      total: null, // 总列条数
      currentPage: 1,
      pageSize: 5,
      loanId: null,
      tableData: [], // 授信列表
      dialogTableVisible: false, // 授信信息开关
      dialogTableVisibleSucc: false, // 通过弹窗开关
      dialogTableVisibleDefe: false, // 拒绝弹窗开关
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
        value: '审核中',
        label: '审核中'
      }, {
        value: '审核成功',
        label: '审核成功'
      }, {
        value: '审核失败',
        label: '审核失败'
      }],
      stateValue: '',
      creditLeval: [{
        value: '请选择',
        label: '请选择'
      }, {
        value: '白银等级',
        label: '白银等级'
      }, {
        value: '黄金等级',
        label: '黄金等级'
      }],
      levalValue: '', // 授信等级
      currentRow: null, // 授信选中列表
      eventRow: null, // 操作事件的Row
      creditCertUrl: null, // 个人征信
      payWaterUrl: null, // 银行流水
      shopCertUrl: null, // 房产证明
      userEventData: [], // 操作记录信息
      inputNum: null, // 授信额度
      desc: null // 不通过说明
    }
  },
  created () {
    var that = this
    axios.post('/fin/admin/searchCreditApplication', {
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
        console.log(res.data.data.list[idx].level)
        if (res.data.data.list[idx].sex === 'm') {
          res.data.data.list[idx].sex = '男'
        } else {
          res.data.data.list[idx].sex = '女'
        }
        if (res.data.data.list[idx].level === 1) {
          res.data.data.list[idx].levelText = '白银等级'
        } else {
          res.data.data.list[idx].levelText = '黄金等级'
        }
        if (res.data.data.list[idx].status === 0) {
          res.data.data.list[idx].statusText = '待审核'
        } else if (res.data.data.list[idx].status === 1) {
          res.data.data.list[idx].statusText = '审核通过'
        } else {
          res.data.data.list[idx].statusText = '审核失败'
        }
        res.data.data.list[idx].gmtCreate = res.data.data.list[idx].gmtCreate.split(' ')
      })
      that.tableData = res.data.data.list
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    handleCurrentPageChange () {
      this.liveSearch(true, this.currentPage)
    },
    // 封装搜索模块
    liveSearch (isPage, page) {
      console.log(this.typeValue)
      var level, status, phone, userName, shopName, start
      if (this.typeValue === '姓名' && this.inputIcon !== '') {
        userName = this.inputIcon
      } else if (this.typeValue === '手机号' && this.inputIcon !== '') {
        phone = this.inputIcon
      } else if (this.typeValue === '店铺名' && this.inputIcon !== '') {
        shopName = this.inputIcon
      }
      switch (this.stateValue) {
        case '审核中' :
          status = 0
          break
        case '审核成功' :
          status = 1
          break
        case '审核失败' :
          status = 2
          break
      }
      if (this.levalValue === '白银等级') {
        level = 1
      } else if (this.levalValue === '黄金等级') {
        level = 2
      }
      if (isPage) {
        start = (page - 1) * this.pageSize
      } else {
        start = 0
        this.currentPage = 1
      }
      var prams = {
        level: level,
        status: status,
        phone: phone,
        userName: userName,
        shopName: shopName,
        start: start,
        size: this.pageSize
      }
      var th = this
      axios.post('/fin/admin/searchCreditApplication', prams, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        th.total = res.data.data.total
        res.data.data.list.forEach(function (val, idx) {
          console.log(res.data.data.list[idx].level)
          if (res.data.data.list[idx].sex === 'm') {
            res.data.data.list[idx].sex = '男'
          } else {
            res.data.data.list[idx].sex = '女'
          }
          if (res.data.data.list[idx].level === 1) {
            res.data.data.list[idx].levelText = '白银等级'
          } else {
            res.data.data.list[idx].levelText = '黄金等级'
          }
          if (res.data.data.list[idx].status === 0) {
            res.data.data.list[idx].statusText = '待审核'
          } else if (res.data.data.list[idx].status === 1) {
            res.data.data.list[idx].statusText = '审核通过'
          } else {
            res.data.data.list[idx].statusText = '审核失败'
          }
          console.log(res.data.data.list[idx].level)
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
      this.dialogTableVisibleSucc = true
      console.log('通过开始...')
      this.loanId = row.id
      this.eventRow = index
    },
    handleDelete (index, row) {
      this.dialogTableVisibleDefe = true
      console.log('拒绝开始...')
      this.loanId = row.id
      this.eventRow = index
    },
    success () {
      this.dialogTableVisibleSucc = false
      axios.post('/fin/admin/auditCreditApplication', {
        id: this.loanId,
        passed: true,
        creditValue: this.inputNum
      }, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.flag === true) {
          this.tableData.splice(this.eventRow, 1)
          this.$alert('操作成功', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `已成功，请前往认证成功查看`
              })
            }
          })
          this.inputNum = ''
        } else {
          alert(res.data.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    refuse () {
      this.dialogTableVisibleDefe = false
      axios.post('/fin/admin/auditCreditApplication', {
        id: this.loanId,
        passed: false,
        remark: this.desc
      }, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.flag === true) {
          this.tableData.splice(this.eventRow, 1)
          this.$alert('操作成功', '拒绝', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `已拒绝，请前往认证失败查看`
              })
            }
          })
          this.desc = ''
        } else {
          alert(res.data.msg)
        }
      }).catch(error => {
        console.log(error)
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
    },
    handleCurrentChange (val) {
      this.dialogTableVisible = true
      this.currentRow = val
      var that = this
      that.creditCertUrl = []
      that.payWaterUrl = []
      that.shopCertUrl = []
      console.log(val)
      axios.post('/fin/admin/queryLoanOperRecord', {
        loanId: val.id,
        start: 0,
        size: 20
      }, {
        headers: {'token': sessionStorage.getItem('token')}
      }).then(res => {
        // that.userEventData = res.data.data
      }).catch(error => {
        console.log(error)
      })
      axios.post('/fin/admin/queryUserCreditOperRecord', {
        userId: val.userId,
        start: 0,
        size: 20
      }, {
        headers: {'token': sessionStorage.getItem('token')}
      }).then(res => {
        res.data.data.forEach((val, idx) => {
          res.data.data[idx].gmtCreate = res.data.data[idx].gmtCreate.split(' ')
        })
        that.userEventData = res.data.data
      }).catch(error => {
        console.log(error)
      })
      axios.post('/fin/admin/searchCreditApplication', {
        phone: val.phone,
        userName: val.userName,
        // id: val.id,
        start: 0,
        size: 20
      }, {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then(res => {
        res.data.data.list.forEach((value, idx) => {
          // console.log(res.data.data.list[idx].id, val.id)
          if (res.data.data.list[idx].id === val.id) {
            that.creditCertUrl = res.data.data.list[idx].creditCertUrl.split(',')
            that.payWaterUrl = res.data.data.list[idx].payWaterUrl.split(',')
            that.shopCertUrl = res.data.data.list[idx].shopCertUrl.split(',')
          }
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
