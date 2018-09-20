<template>
  <div>
    <el-table
    :data='tableData'
    highlight-current-row
    @row-click='rowClick'
    border
    style='width: 100%'>
    <el-table-column
      type='index'
      label='序号'
      width='50'>
    </el-table-column>
    <el-table-column
      prop='userName'
      label='姓名'>
    </el-table-column>
    <el-table-column
      prop='phone'
      label='手机号'>
    </el-table-column>
    <!-- <el-table-column
      prop='sex'
      label='性别'>
    </el-table-column> -->
    <!-- <el-table-column
      prop='idCode'
      label='身份证号'>
    </el-table-column> -->
    <el-table-column
      prop='shopName'
      label='店铺名'>
    </el-table-column>
    <el-table-column
      prop='agentUserName'
      label='代办人'>
    </el-table-column>
    <el-table-column
      label='代办状态'>
      <template slot-scope="scope">
        <p>{{getState(scope)}}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop='appoTime'
      label='预约时间'
      width='100'>
    </el-table-column>
    <el-table-column
      prop='agentUserName'
      label='操作'
      width='155'>
      <template slot-scope="scope">
        <div v-if="iSee(scope)">
          <el-popover
          placement="left-start"
          width="160"
          @show = 'init'
          title="请选择代办人："
          v-model="scope.row.flag">
          <el-radio-group v-model="radio">
            <el-radio @change="getIndex(index)" border size="mini" v-for="(item, index) in option" :key="item.id" :label="item.id">{{item.agentName}}</el-radio>
          </el-radio-group>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.flag = false">取消</el-button>
              <el-button type="primary" size="mini" @click="changeRadio(scope)">确定</el-button>
            </div>
            <el-button
              size="mini"
              type="primary"
              slot="reference"
              @click.stop="handleEdit(scope.$index, scope.row)">指派</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              slot="reference"
              @click.stop="handleDelete(scope.$index, scope.row)">拒绝</el-button> -->
            <!-- <el-button slot="reference">删除</el-button> -->
          </el-popover>
          <!-- <el-button
            size="mini"
            type="primary"
            @click.stop="handleEdit(scope.$index, scope.row)">指派</el-button>
          <el-button
              size="mini"
              type="danger"
              @click.stop="handleDelete(scope.$index, scope.row)">拒绝</el-button> -->
        </div>
        <div v-if="canSee(scope)">
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click.stop="handleSuccess(scope.$index, scope.row)">通过</el-button>
            <el-button class="btnStyle" size="mini" type="warn" @click.stop="handleDelete(scope.$index, scope.row)">不通过</el-button>
          </div>
        </div>
      </template>
    </el-table-column>
    </el-table>
    <dia-log :show.sync="show" :userInfo="userInfo"></dia-log>
  </div>
</template>
<script>
// import { MessageBox } from 'element-ui'
import DiaLog from '../dialog/dialog'
import {Message} from 'element-ui'
import axios from '../../../../config/http'
export default {
  components: {
    DiaLog
  },
  props: {
    tableData: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      userInfo: null,
      visible1: false,
      radio: null,
      token: '',
      uid: '',
      userState: null,
      visiable: false,
      currentRow: '',
      show: false,
      option: [],
      index: null,
      iCanSee: false
    }
  },
  beforeMount () {
    this.token = sessionStorage.getItem('token')
    this.uid = sessionStorage.getItem('id')
  },
  mounted () {
    // this.addStates()
  },
  methods: {
    // 代办状态
    getState (scope) {
      let userState = ''
      // console.log(scope.row)
      if (scope.row.status === 0) {
        userState = this.userState = '待指派'
        return userState
      }
      if (scope.row.status === 1) {
        userState = this.userState = '待接单'
        return userState
      }
      if (scope.row.status === 2) {
        userState = this.userState = '已接单'
        return userState
      }
      if (scope.row.status === 3) {
        userState = this.userState = '已拒单'
        return userState
      }
      if (scope.row.status === 4) {
        userState = this.userState = '已取消'
        return userState
      }
      if (scope.row.status === 5) {
        userState = this.userState = '办理审核中'
        return userState
      }
      if (scope.row.status === 6) {
        userState = this.userState = '办理未通过'
        return userState
      }
      if (scope.row.status === 7) {
        userState = this.userState = '待支付'
        return userState
      }
      if (scope.row.status === 8) {
        userState = this.userState = '已完成'
        return userState
      }
    },
    // 操作按钮状态
    iSee (scope) {
      if (scope.row.status === 0) {
        this.visiable = true
        return this.visiable
      }
    },
    canSee (scope) {
      if (scope.row.status === 5) {
        this.iCanSee = true
        return this.iCanSee
      }
    },
    // 接单
    handleEdit (index, row) {
      this.getAgent(row)
      // console.log(index, row)
      if (this.tableData) {
        this.tableData.forEach((element, index) => {
          this.$set(element, 'flag', false)
        })
        row.flag = !row.flag
      }
      console.log(this.tableData)
    },
    // 通过
    handleSuccess (index, row) {
      axios.post('/agency/admin/adminAuditProcessResult', {
        appoId: row.id,
        passed: true
      }, {
        headers: {
          'uId': this.uid,
          'token': this.token
        }
      }).then(res => {
        console.log(res)
        Message({
          message: '通过成功',
          type: 'success',
          duration: 2000,
          center: true
        })
        this.$parent.search()
      })
    },
    // 不通过
    handleDelete (index, row) {
      this.openPrompt(row)
    },
    openPrompt (row) {
      this.$prompt('请输入拒绝原因', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        axios.post('/agency/admin/adminAuditProcessResult', {
          appoId: row.id,
          passed: false,
          failReason: value
        }, {
          headers: {
            'uId': this.uid,
            'token': this.token
          }
        }).then(res => {
          console.log('ok')
        })
        this.$message({
          type: 'success',
          message: '拒单原因: ' + value
        })
        console.log(typeof value)
      }).catch(() => {
        console.log(1)
      })
    },
    init () {
      this.radio = null
    },
    // 提交更改
    changeRadio (scope) {
      if (this.radio) {
        // scope.row.agentUserName = this.option[this.index].agentName
        scope.row.flag = false
        this.$set(scope.row, 'agentUserName', this.option[this.index].agentName)
        this.$set(scope.row, 'agentUserId', this.option[this.index].id)
        // console.log(scope.row)
        axios.post('/agency/admin/assginAgency', {
          agentUserId: scope.row.agentUserId,
          appoId: scope.row.id
        }, {
          headers: {
            'uId': this.uid,
            'token': this.token
          }
        }).then(res => {
          if (res.flag === false) {
            this.$message({
              message: '指派失败',
              type: 'error'
            })
          } else {
            console.log(scope.row.agentUserId)
            this.$message({
              message: '指派成功！',
              type: 'success'
            })
            this.visiable = true
          }
        })
      }
      // console.log(scope, this.radio)
    },
    // 获取对应城市代办人
    getAgent (row) {
      // console.log(this.tableData)
      axios.post('/user/queryAgentByCity', {
        cityCode: row.cityCode
      }, {
        headers: {
          uId: this.uid,
          token: this.token
        }
      }).then(res => {
        this.option = res.data.data
        console.log(this.option)
      })
    },
    getIndex (index) {
      this.index = index
      console.log(this.index)
    },
    rowClick (row, event, column) {
      // this.show = !this.show
      this.userInfo = row
      this.show = true
      console.log(row, this.show)
    },
    filterTag (value, row) {
      // console.log(value, row)
      return row.rangeState === value
    },
    filterRange (value, row) {
      return row.range === value
    }
  }
}
</script>
<style lang="less" scoped>
.el-radio.is-bordered+.el-radio.is-bordered{
  margin-left:3px;
}
.el-radio{
  display: inline-block;
  // width:46%;
  margin: 2px 3px;
}
.btnStyle{
  margin-left:5px;
}
</style>
