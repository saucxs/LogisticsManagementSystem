<template>
  <div id="register">
    <div class="loginHeader">
      <div class="header-box-left" :title="systemName">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconsubmitordersdelive-black"></use>
        </svg>
        <div class="header-logo">
          {{systemName}}
        </div>
      </div>
    </div>
    <div class="login_contenter">
      <div class="content_box">
        <div class="content_box_form">
          <router-link to="/login">
            <h1 class="inactive">登录</h1>
          </router-link>
          <h1 class="active">注册</h1>
          <div class="form_content" >
            <span class="normal-word">用户名：</span>
            <input @keyup.enter.native="startRegister" minlength="6" maxlength="30" type="text" name="username" placeholder="用户名/手机/邮箱" v-model="name" />
          </div>
          <div class="form_content" >
            <span class="normal-word">密码：</span>
            <input @keyup.enter.native="startRegister" minlength="6" maxlength="16" type="password" placeholder="密码" v-model="password" />
          </div>
          <div class="form_content" >
            <span class="normal-word">邮箱：</span>
            <input @keyup.enter.native="startRegister" minlength="6" maxlength="50" type="text" placeholder="邮箱" v-model="email" />
          </div>
          <button :disabled="disabledFlag" class="loginBtn" @click="startRegister">注册</button>
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import footerBar from "../components/footer";
  import { checkEmail } from "../utils/common"
  export default {
    name: 'register',
    data() {
      return {
        name: '',
        password: '',
        email: '',
        disabledFlag: false
      };
    },
    components: {
      footerBar
    },
    computed: {
      ...mapGetters([
        'systemName'
      ])
    },
    mounted () {
      document.addEventListener('keyup', this.handleEnter);
    },
    methods: {
      ...mapActions(["register"]),
      actualRegister() {
        let params = {
          name: this.name,
          password: this.password,
          email: this.email
        }
        if (this.name !== "" && this.password !== "" && this.email !== "" && checkEmail(this.email)) {
          this.register(params).then(res => {
            if (res) {
              if (res.success) {
                //弹窗
                this.$alert(res.message, '提示', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: () => {
                    this.$router.push("/login");
                  }
                });
              } else {
                this.$message.warning(res.message|| '服务开小差');
              }
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('服务器出错啦');
          })
        } else {
          if (this.name === "") {this.$message.warning("请输入用户名") }
          if (this.password === "") { this.$message.warning("请输入密码") }
          if (this.email === "") { this.$message.warning("请输入邮箱") }
          if (!checkEmail(this.email)) { this.$message.warning("请输入正确的邮箱") }
        }
      },
      startRegister() {
        this.disabledFlag = true;
        this.actualRegister()
        this.disabledFlag = false;
      },
    }
  }
</script>

<style scoped>
  .loginHeader {
    height: 60px;
    line-height: 60px;
    color: #000000;
  }
  .loginHeader .header-box-left{
    justify-content: center;
    float: none !important;
    font-size: 24px !important;
    cursor: inherit !important;
  }
  .loginHeader .icon{
    width: 2.0em;
    height: 2.0em;
  }
  .loginHeader .header-logo{
    letter-spacing: 16px;
  }
  .active{
    color: #5579ee;
    display: inline-block;
    font-size: 20px;
  }
  .inactive{
    color: #cccccc;
    display: inline-block;
    font-size: 20px;
  }
  .login_icon {
    display: block;
    width: 334px;
    height: 72px;
    display: inline-block;
  }

  .login_contenter {
    width: 100%;
    background-position: 100% 100%;
    background: #00000e url("../assets/surfing.jpg") no-repeat center 0;
  }
  .login_contenter_bg{
    position:absolute;
    z-index: -100;
    width: 100%;
    height: 490px;
  }
  .content_box {
    height: 750px;
    padding: 150px 0;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  .content_box_img_bg{
    position:absolute;
  }
  .content_box_form {
    box-sizing: border-box;
    display: inline-block;
    width: 420px;
    height: 380px;
    vertical-align: top;
    text-align: center;
    background-color: #ffffff;
    float: right;
    padding: 20px;
    margin-top: 2px;
  }
  .clear {
    clear: both;
  }
  h1 {
    list-style-type: none;
    font-family: PingFangSC-Regular;
    font-size: 27px;
    color: #000000;
    letter-spacing: 10px;
  }
  .form_content {
    height: 36px;
    border: 1px solid #ddd6db;
    border-radius: 5px;
    margin: 30px 0;
    position: relative;
    padding: 0 10px;
    text-align: left;
    display: flex;
    align-items: center;
  }
  .form_content .normal-word{
    width: 80px;
    font-size: 14px;
  }
  .form_content input {
    width: 88%;
    height: 34px;
    margin: 0 6px;
    outline: none;
    border: none;
  }
  input:focus::-webkit-input-placeholder {
    color: transparent;
  }
  .form_content img {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 8px 4px;
  }
  .phoneYZ {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
  }
  .dxyz {
    width: 50%;
    display: block;
    float: left;
  }
  .dxyz img {
    vertical-align: middle;
  }
  .dxyz a {
    text-decoration: none;
    color: #4f5870;
  }
  .forget {
    display: block;
    width: 30%;
    float: right;
  }
  .forget a {
    text-decoration: none;
    color: #5375F1;
    font-size: 14px;
  }
  .loginBtn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    background-color: #4764c0;
    color: #ffffff;
    border: none;
    cursor:pointer;
  }
  .registerBtn {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-top: 30px;
    color: #4f5870;
  }
  .registerBtn a {
    text-decoration: none;
    color:#5375F1;
  }
  .showUserTips {
    display: block;
    width: 100%;
    border: 1px solid red;
    float: left;
    margin-top: -20px;
    z-index: 1000;
  }
  .border {
    border: 1px solid #55aaff;
  }
  .footer {
    width: 100%;
    text-align: center;
  }
  .footer ul {
    list-style-type: none;
    margin: 50px auto 20px auto;
    width: 430px;
    text-align: center;
  }
  .footer ul li {
    float: left;
  }
  .footer ul li {
    text-decoration: none;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #22366d;
    letter-spacing: 0;
    border-right: 1px solid #000000;
    border-left: 1px solid #000000;
    width: 84px;
    display: inline-block;
    font-weight: 700;
  }
  .footer ul li a {
    text-decoration: none;
  }
  .footer ul li:nth-last-of-type(1) {
    border-right: none;
  }
  .footer ul li:nth-of-type(1) {
    border-left: none;
  }
  .footerBottom {
    width: 375px;
    height: 48px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #22366d;
    letter-spacing: 0;
    line-height: 24px;
    margin: 16px auto 42px auto;
  }
  .errorTip{
    font-size: 14px;
    color:#ed4747;
  }
  .viewPassword{
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 10px;
  }
  .colorViewPassword{
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 10px;
    color:#5579ee;
  }
</style>
