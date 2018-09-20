<template>
  <div>
    <el-dialog
    :visible.sync="visible"
    :show="show"
    width="60%"
    :before-close="close"
    @open="open">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="个人信息" name="first">
          <div class="info">
            <div>
              <div class="margin">
                <span>姓名：</span>
                <el-input
                  placeholder="请输入内容"
                  :clearable="CanChange"
                  :value="userInfo.userName"
                  :disabled="disabled">
                </el-input>
                <span>手机号：</span>
                <el-input
                  placeholder="请输入内容"
                  :clearable="CanChange"
                  :value="userInfo.phone"
                  :disabled="disabled">
                </el-input>
              </div>
            </div>
            <div>
              <div class="margin">
                <!-- <span>身份证号：</span>
                <el-input
                  placeholder="请输入内容"
                  :clearable="CanChange"
                  :value="idNum"
                  :disabled="disabled">
                </el-input> -->
                <!-- <span>性别：{{sex}}</span> -->
              </div>
            </div>
          <div>
            <div class="margin">
            <!-- <span>店铺名：</span>
            <el-input
              placeholder="请输入内容"
              :clearable="CanChange"
              :value="shopName"
              :disabled="disabled">
            </el-input> -->
            <span>代办人：</span>
            <el-input
              placeholder="请输入内容"
              :clearable="CanChange"
              :value="userInfo.agentUserName"
              :disabled="disabled">
            </el-input>
            </div>
          </div>
          <!-- <div>
            <span>店铺地址：</span>
            <el-input
              placeholder="请输入内容"
              :clearable="CanChange"
              :value="shopAdress"
              :disabled="disabled">
            </el-input>
          </div> -->
        </div>
        </el-tab-pane>
        <el-tab-pane label="行驶证照" name="second">
          <img :src="userInfo.drivingLicense" alt="">
        </el-tab-pane>
        <el-tab-pane label="登记证照" name="third">
          <!-- <div class="idCard"> -->
            <img :src="userInfo.registrationCertUrl" alt="">
        <!-- </div> -->
        </el-tab-pane>
        <el-tab-pane label="操作记录" name="fourth">
          <el-table
          :data="infoList"
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
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click.stop="dialogFormVisible">取 消</el-button>
        <el-button type="primary" @click.stop="dialogFormVisible">确 定</el-button>
      </div> -->
    </el-dialog>
    <!-- <div>{{message}}</div> -->
  </div>
</template>
<script>
import axios from '../../../../config/http'
export default {
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
      activeName: 'first',
      visible: this.show,
      tableData: [],
      disabled: false,
      // 个人信息
      userName: '',
      phone: '',
      have: false,
      CanChange: true,
      infoList: []
    }
  },
  watch: {
    show () {
      this.visible = this.show
    }
  },
  methods: {
    // dialog () {
    //   this.dialogFormVisible = true
    //   console.log(this.dialogFormVisible)
    //   this.activeName = 'first'
    //   this.phone = this.userInfo.phone
    // },
    open () {
      this.getRecords()
    },
    getRecords () {
      let user = sessionStorage.getItem('id')
      let token = sessionStorage.getItem('token')
      axios.post('/agency/admin/queryAgencyOperRecord', {
        appoId: this.userInfo.id,
        size: 5
      }, {
        headers: {
          uId: user,
          token: token
        }
      }).then(res => {
        this.infoList = res.data.data
        console.log(res)
      })
    },
    close () {
      this.activeName = 'first'
      this.$emit('update:show', false)
    },
    dialogFormVisible () {
      this.activeName = 'first'
      this.$emit('update:show', false)
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
  .el-row{
    display: flex;
    justify-content: space-around;
  }
  .info div span{
    min-width:70px;
  }
  .el-tab-pane img{
    width:100%;
  }
</style>
