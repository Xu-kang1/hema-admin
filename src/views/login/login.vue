<template>
  <div class="bg-login">
    <div class="container">
      <div class="title">登录</div>
      <div>
        <span>手机号:</span>
        <el-input type="text" v-model.lazy="userName" placeholder="请输入手机号"></el-input>
      </div>
      <div>
        密码:
        <el-input type="password" v-model.lazy="pw" placeholder="请输入密码"></el-input>
      </div>
      <div class="button">
        <div class="transition"></div>
          <button @click="clickA">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../../../config/http'
import {Message} from 'element-ui'
export default {
  data () {
    return {
      userName: null,
      pw: null
    }
  },
  methods: {
    clickA () {
      axios.post('/user/admin/adminLogin', {
        phone: this.userName,
        pwd: this.pw
      }).then(res => {
        console.log(res.data.flag)
        if (res.data.flag === true) {
          console.log(111)
          sessionStorage.setItem('token', res.data.data.token)
          sessionStorage.setItem('id', res.data.data.id)
          sessionStorage.setItem('name', res.data.data.name)
          this.$router.push({path: '/main/cardealer'})
        } else if (res.data.flag === false) {
          Message({
            message: '账号或密码错误',
            type: 'error',
            duration: 3000,
            center: true
          })
        }
      }).catch(error => {
        console.log(error)
        Message({
          message: '网络错误',
          type: 'error',
          duration: 3000,
          center: true
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.bg-login{
  height:100%;
  // position: relative;
  background: url('../../assets/img/bg-01.jpg') repeat-y;
  background-size: 100% 100%;
  .el-input{
    margin: 5px 0;
  }
}
.container{
  text-align: left;
  width: 500px;
  height:400px;
  background: #fff;
  border-radius: 10px;
  padding:55px;
  // overflow: hidden;
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin:auto;
  .title{
    font-size: 39px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
    margin-bottom:50px;
  }
  .button{
    width:350px;
    height:50px;
    display: block;
    position: relative;
    z-index: 1;
    border-radius: 25px;
    overflow: hidden;
    margin: 0 auto;
    margin-top:100px;
    .transition{
      position: absolute;
      z-index: -1;
      width: 300%;
      height: 100%;
      background: -webkit-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff);
      top: 0;
      left: -100%;
      transition: all 0.4s;
    }
    &:hover{
      .transition{
        left:0;
      }
    }
    button{
      font-family: Poppins-Medium;
      font-size: 16px;
      color: #fff;
      line-height: 1.2;
      text-transform: uppercase;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      width: 100%;
      height: 50px;
      outline: none !important;
      border: none;
      background: transparent;
      cursor: pointer;
    }
  }
}
</style>
