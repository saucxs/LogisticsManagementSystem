<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: 'App',
    computed: {
      ...mapGetters(["userInfo"])
    },
    data(){
      return {

      }
    },
    mounted() {

    },
    methods:{
      ...mapActions([
        "getUserInfo",
      ])
    }
  }
</script>
<style>
  html{
    height: 100%;
  }
  body {
    width: 100%;
    height: 100%;
    background-color: #eee !important;
    margin: 0;
    padding: 0;
    /*overflow-y: hidden;*/
  }
  #app {
    height: 100%;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  .a-style{
    padding: 0px 30px;
  }
  .el-dialog .el-dialog__body{
    padding-bottom: 0px !important;
  }
  .el-dialog .el-dialog__footer{
    padding: 10px 20px !important;
  }
  /*header*/
  .el-dropdown-menu__item{
    width: 120px !important;
  }
  .el-tag{
    margin: 5px;
  }
  .el-submenu .el-menu-item{
    min-width: 146px !important;
    padding-left: 50px !important;
  }
  .menu .el-menu{
    overflow: hidden !important;
  }
  .el-menu-item, .el-submenu__title{
    line-height: 55px !important;
  }

  .el-menu-item > a{
    display: block;
    color: #ccc;
  }
  .el-menu .is-active{
    outline: 0;
    background-color: rgb(67, 74, 80) !important;
  }
  .el-menu .is-active a{
    color: #fff !important;
  }
  .menu .is-active:before{
    position: absolute;
    bottom: 0px;
    left: 0;
    display: block;
    width: 4px;
    height: 56px;
    background-color: #3a79ff;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    content: "";
  }
  .menu .is-active:after{
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-right: 3px solid #3a79ff;
    transform: scaleY(.0001);
    opacity: 0;
    transition: transform .15s cubic-bezier(.215,.61,.355,1),opacity .15s cubic-bezier(.215,.61,.355,1);
  }
  .el-submenu .is-active:before {
    position: absolute;
    bottom: 0px;
    left: 0;
    display: block;
    width: 4px;
    height: 50px;
    background-color: #3a79ff;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    content: "";
  }
  .el-submenu .is-active:after{
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-right: 3px solid #3a79ff;
    transform: scaleY(.0001);
    opacity: 0;
    transition: transform .15s cubic-bezier(.215,.61,.355,1),opacity .15s cubic-bezier(.215,.61,.355,1);
  }
  /*重写弹窗样式*/
  .el-dialog {
  & .el-dialog__header{
      padding: 9px 20px;
      border-bottom: 2px solid #3a79ff;
      text-align: left;
      line-height: 0;
    }
  & .el-dialog__body{
      padding: 20px;
    }
  & .el-dialog__footer{
      padding: 0 20px 20px;
      border-top: 0;
    }
  & .el-dialog__headerbtn{
      top: 14px;
    }
  }
  /*输入框*/
  *::placeholder {
    font-size: 12px;
  }

  /*分页插件*/
  .pagination-box{
    text-align: right;
    margin: 10px 0px;
  }

  /*提醒小字*/
  .tip-p{
    font-size: 12px;
    color: #cccccc;
  }

  .loginHeader h1{
    text-align: center;
  }

  .success-color{
    color: #67C23A;
  }
  .warning-color{
    color: #E6A23C;
  }
  .danger-color{
    color: #F56C6C;
  }
  .info-color{
    color: #909399;
  }
  .common-color{
    color: #409EFF;
  }
  .icon {
    width: 1.5em; height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .header-box-left{
    display: flex;
    align-items: center;
    float: left;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
  }
  .header-logo{
    margin-left: 4px;
    letter-spacing: 10px;
  }

</style>
