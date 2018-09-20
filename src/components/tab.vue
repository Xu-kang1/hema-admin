<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="个人信息" name="first">
      <div class="info">
        <div>
          <div class="margin">
          <span>姓名：</span>
          <el-input
            placeholder="请输入内容"
            :clearable="CanChange"
            :disabled="disabled">
          </el-input>
          <span>性别：</span>
          <span>身份证号：</span>
           <el-input
            placeholder="请输入内容"
            :clearable="CanChange"
            :disabled="disabled">
          </el-input>
          <span>手机号：</span>
          <el-input
            placeholder="请输入内容"
            :clearable="CanChange"
            :disabled="disabled">
          </el-input>
          </div>
        </div>
        <div>
          <div class="margin">
          <span>店铺名：</span>
          <el-input
            placeholder="请输入内容"
            :clearable="CanChange"
            :disabled="disabled">
          </el-input>
          <span>所属车商：</span>
          <el-input
            placeholder="请输入内容"
            :clearable="CanChange"
            value="111"
            :disabled="disabled">
          </el-input>
          </div>
        </div>
        <div>
          <span>店铺地址：</span>
          <el-input
            placeholder="请输入内容"
            :clearable="CanChange"
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
              <img src="../assets/img/one.png" class="image">
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
          <el-button type="primary">通过</el-button>
          <el-button>不通过</el-button>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane label="登陆信息" name="third">
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="设备型号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="系统版本"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="登录时间">
    </el-table-column>
    </el-table>
    </el-tab-pane>
    <el-tab-pane label="操作记录" name="fourth">
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="操作事件"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作时间">
    </el-table-column>
    </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import List from '../components/list'
export default {
  components: {
    List
  },
  data () {
    return {
      tableData: [],
      activeName: 'first',
      CanChange: true,
      disabled: false
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
</style>
