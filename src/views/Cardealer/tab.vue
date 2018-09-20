<template>
<div class="tab_c">
  <el-dialog title=""
    :visible.sync="visible"
    :show="show"
    :before-close="close"
    @open="open">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人信息" name="first">
        <div class="info">
          <div>
            <div class="margin">
              <span>姓名：</span>
              <el-input
                placeholder="请输入内容"
                :clearable="CanChange"
                :value="userName"
                :disabled="disabled">
              </el-input>
              <span>手机号：</span>
              <el-input
                placeholder="请输入内容"
                :clearable="CanChange"
                :value="phone"
                :disabled="disabled">
              </el-input>
            </div>
          </div>
          <div>
            <div class="margin">
              <span>身份证号：</span>
              <el-input
                placeholder="请输入内容"
                :clearable="CanChange"
                :value="idNum"
                :disabled="disabled">
              </el-input>
              <!-- <span>性别：{{sex}}</span> -->
            </div>
          </div>
          <div>
            <div class="margin">
            <span>店铺名：</span>
            <el-input
              placeholder="请输入内容"
              :clearable="CanChange"
              :value="shopName"
              :disabled="disabled">
            </el-input>
            <span>所属车商：</span>
            <el-input
              placeholder="请输入内容"
              :clearable="CanChange"
              :value="orderShoper"
              :disabled="disabled">
            </el-input>
            </div>
          </div>
          <div>
            <span>店铺地址：</span>
            <el-input
              placeholder="请输入内容"
              :clearable="CanChange"
              :value="shopAdress"
              :disabled="disabled">
            </el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="身份证照" name="second">
        <div class="idCard">
          <el-row>
            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <img v-if="index==0" :src="frontIdCardUrl" class="image">
                <img v-else :src="backIdCardUrl" class="image">
                <div style="padding: 14px;">
                  <span v-if="index==0">身份证正面照</span>
                  <span v-else>身份证反面照</span>
                  <!-- <div class="bottom clearfix">
                    <time class="time"></time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div> -->
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div v-show="iSee" class="btn_">
            <el-button @click.stop="passCheck" type="primary">通过</el-button>
            <el-button @click.stop="showInner">不通过</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="最近登录" name="third">
      <el-table
      :data="infoList"
      border
      style="width: 100%">
      <el-table-column
        prop="deviceModel"
        label="设备型号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sysVersion"
        label="系统版本"
        width="180">
      </el-table-column>
      <el-table-column
        prop="loginTime"
        label="登录时间">
      </el-table-column>
      </el-table>
      </el-tab-pane>
      <el-tab-pane label="操作记录" name="fourth">
      <el-table
      :data="recordes"
      border
      style="width: 100%">
      <el-table-column
        prop="operUserName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="操作事件"
        width="380">
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="操作时间">
      </el-table-column>
      </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      width="30%"
      title="不通过原因"
      :visible.sync="innerVisible"
      append-to-body>
      <el-input
      :clearable="CanChange"
      v-model="notice"
      :disabled="disabled"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click.stop="unPass">确 定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</div>
</template>
<script>
// import List from '@/components/list'
import axios from '../../../config/http'
import {Message} from 'element-ui'
export default {
  // components: {
  //   List
  // },
  props: {
    show: {
      type: Boolean,
      defalut: false
    },
    userInfo: {
      type: Object
    }
  },
  data () {
    return {
      innerVisible: false,
      notice: '',
      tableData: [],
      infoList: [],
      recordes: [],
      activeName: 'first',
      visible: this.show,
      CanChange: true,
      disabled: false,
      // 变量数据
      userName: '',
      sex: '',
      idNum: null,
      phone: null,
      shopName: '',
      shopAdress: '',
      orderShoper: '',
      frontIdCardUrl: '',
      backIdCardUrl: '',
      iSee: false
    }
  },
  watch: {
    show () {
      this.visible = this.show
    }
  },
  mounted () {
  },
  methods: {
    open () {
      this.disabled = true
      this.iSee = false
      if (this.userInfo.auditStatus === 1 && this.userInfo.userType === 1) {
        console.log(this.iSee)
        this.iSee = true
      }
      console.log(this.userInfo)
      this.userName = this.userInfo.name
      this.sex = this.userInfo.sex
      this.idNum = this.userInfo.idCardNo
      this.phone = this.userInfo.phone
      if (this.userInfo.shopInfo) {
        this.shopName = this.userInfo.shopInfo.shopName
        this.orderShoper = this.userInfo.shopInfo.userName
        this.shopAdress = this.userInfo.shopInfo.addr
      }
      this.frontIdCardUrl = this.userInfo.frontIdCardUrl
      this.backIdCardUrl = this.userInfo.backIdCardUrl
      // console.log(this.userInfo, this.userName, '打开dialog')
      this.getInfo()
      this.getRecords()
    },
    close () {
      this.activeName = 'first'
      this.$emit('update:show', false)
    },
    passCheck () {
      let token = sessionStorage.getItem('token')
      let id_ = sessionStorage.getItem('id')
      axios.post('/user/admin/auditUser', {
        userId: this.userInfo.id,
        passed: true
      }, {
        headers: {
          token: token,
          uId: id_
        }
      }).then(res => {
        console.log(res.data)
        this.$emit('update:show', false)
        if (res.data.flag === true) {
          this.iSee = false
          Message({
            message: '通过成功',
            type: 'success',
            duration: 3000,
            center: true
          })
        } else {
          Message({
            message: res.data.msg,
            type: 'error',
            duration: 3000,
            center: true
          })
        }
      })
    },
    showInner () {
      this.innerVisible = true
      this.disabled = false
    },
    unPass () {
      // console.log(typeof this.userInfo.id)
      let token = sessionStorage.getItem('token')
      let id_ = sessionStorage.getItem('id')
      axios.post('/user/admin/auditUser', {
        'userId': this.userInfo.id,
        'passed': false,
        'remark': this.notice
      }, {
        headers: {
          token: token,
          uId: id_
        }
      }).then(res => {
        this.$emit('update:show', false)
        if (res.data.flag === true) {
          Message({
            message: '处理成功',
            type: 'success',
            duration: 3000,
            center: true
          })
          this.iSee = false
          // this.innerVisible = false
        } else {
          Message({
            message: res.data.msg,
            type: 'error',
            duration: 3000,
            center: true
          })
          // this.innerVisible = false
        }
        this.innerVisible = false
      })
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    getInfo () {
      let user = sessionStorage.getItem('id')
      let token = sessionStorage.getItem('token')
      axios.post('/user/admin/queryUserLoginRecord', {
        userId: this.userInfo.id,
        userType: this.userInfo.userType,
        size: 5
      }, {
        headers: {
          uId: user,
          token: token
        }
      }).then(res => {
        this.infoList = res.data.data.list
        console.log(res)
      })
    },
    getRecords () {
      let user = sessionStorage.getItem('id')
      let token = sessionStorage.getItem('token')
      axios.post('/user/admin/queryUserInfoOperRecord', {
        userId: this.userInfo.id,
        size: 5
      }, {
        headers: {
          uId: user,
          token: token
        }
      }).then(res => {
        this.recordes = res.data.data
        // console.log(this.recordes)
        this.recordes.forEach(element => {
          if (element.operUserType === 1) {
            element.operUserName = '车商'
            // console.log(this.recordes)
            return this.recordes
          }
        })
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .info{
    text-align: left;
    div{
      display: flex;
      align-items: center;
      text-align: center;
      .margin{
        margin-bottom:20px;
      }
      span{
        display: inline-block;
        min-width: 100px;
      }
    }
  }
  #app{
    &/deep/.el-dialog{
      width:70%;
    }
  }
  .el-row{
    display: flex;
    justify-content: space-around;
  }
  .el-col-8{
    width:48%;
  }
  .el-col-offset-2{
    margin-left:0;
  }
  .image{
    width:100%;
  }
  .btn_{
    margin-top:30px;
  }
  // .el-table_2_column_11{
  //   text-align: left;
  // }
</style>
