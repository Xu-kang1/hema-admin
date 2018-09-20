<template>
  <div>
    <el-dialog
    :visible.sync="visible"
    :show="show"
    width="60%"
    :before-close="close"
    @open="open">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="车辆信息" name="first">
          <div class="info">
            <div>
              <div class="margin l_1">
                <span>品牌：</span>
                <el-input
                  placeholder=""
                  :clearable="CanChange"
                  :value="userInfo.brandName"
                  :disabled="disabled">
                </el-input>
                <span>车系：</span>
                <el-input
                  placeholder=""
                  :clearable="CanChange"
                  :value="userInfo.seriesName"
                  :disabled="disabled">
                </el-input>
                <span>车型：</span>
                <el-input
                  class="carModel"
                  placeholder=""
                  :clearable="CanChange"
                  :value="userInfo.modelName"
                  :disabled="disabled">
                </el-input>
              </div>
            </div>
            <div>
              <div class="margin l_1">
                <span>售价：</span>
                <el-input
                  placeholder=""
                  :clearable="CanChange"
                  :value="userInfo.sellPrice"
                  :disabled="disabled">
                </el-input><span>万元</span>
                <span>首付：</span>
                <el-input
                  placeholder=""
                  :clearable="CanChange"
                  :value="userInfo.downPayment"
                  :disabled="disabled">
                </el-input><span>万元</span>
                 <span>新车价：</span>
                <el-input
                  placeholder=""
                  :clearable="CanChange"
                  :value="userInfo.newCarPrice"
                  :disabled="disabled">
                </el-input><span>万元</span>
              </div>
            </div>
          <!-- <div>
            <div class="margin l_1">
            </div>
          </div> -->
          <div>
            <div class="margin l_1">
              <span>颜色：</span>
              <el-input
                placeholder=""
                :clearable="CanChange"
                :value="userInfo.color"
                :disabled="disabled">
              </el-input>
              <span>所在地：</span>
              <el-input
                placeholder=""
                :clearable="CanChange"
                :value="userInfo.city"
                :disabled="disabled">
              </el-input>
              <span>亮点：</span>
              <el-input
                class="carModel"
                placeholder=""
                :clearable="CanChange"
                :value="userInfo.tagNames"
                :disabled="disabled">
              </el-input>
            </div>
          </div>
          <div>
            <div class="margin l_2">
              <span>上牌时间：</span>
              <el-input
                placeholder=""
                :clearable="CanChange"
                :value="userInfo.licenseTime"
                :disabled="disabled">
              </el-input>&nbsp;&nbsp;
                <span>所属店铺：</span>
                <el-input
                class="width2"
                  placeholder=""
                  :clearable="CanChange"
                  :value="userInfo.shopName"
                  :disabled="disabled">
                </el-input>&nbsp;&nbsp;
                <span>行驶里程：</span>
                <el-input
                  style="width:13%;"
                  placeholder=""
                  :clearable="CanChange"
                  :value="userInfo.mileage"
                  :disabled="disabled">
                </el-input><span>万公里</span>
            </div>
          </div>
          <div>
            <div class="margin" style="width:100%">
              <span>车辆描述：</span>
              <el-input
                placeholder=""
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                :clearable="CanChange"
                :value="userInfo.remark"
                :disabled="disabled">
              </el-input>
            </div>
          </div>
        </div>
        </el-tab-pane>
        <el-tab-pane label="车辆照片" name="second">
          <div class="idCard">
            <img v-for="list in pics" :src="list" :key="list.id" alt="">
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>

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
      disabled: true,
      clearable: false,
      // 个人信息
      userName: '',
      phone: '',
      CanChange: true,
      sellPrice: '',
      pics: []
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
    close () {
      this.activeName = 'first'
      this.$emit('update:show', false)
    },
    open () {
      this.pics = this.userInfo.picUrls.split(',')
      // console.log(this.pics)
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
    }
  }
  .info .margin .el-input + span{
    display: inline-block;
    width:30px !important;
  }
  .l_1{
    >.el-input{
      width:14%;
    }
    .carModel{
      width:35%;
    }
  }
  .l_2{
    >.el-input{
      width:17%;
    }
    .width2{
      width:28%;
    }
  }
  .el-row{
    display: flex;
    justify-content: space-around;
  }
  .info div span{
    min-width:70px;
  }
  .idCard img{
    display: inline-block;
    width: 30%;
    margin: 1%;
  }
</style>
