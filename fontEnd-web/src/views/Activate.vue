<template>
<!-- 激活 -->
  <div id="login">
    <div class="loginHeader">
      <h1>{{systemName}}</h1>
    </div>
    <div class="login_contenter">
      <div class="content_box">
        <div class="content_box_form">
          <h2 class="active"> 激活邮箱 </h2>
          <p class="message-tip">{{message}}</p>
          <p class="go-back-login" @click="goBackLogin">返回登录</p>
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import footerBar from "../components/footer";
export default {
	name: "activate",
	props: {},
	components: {
    footerBar
  },
	data() {
		return {
			code: this.$route.params.code,
      message: ''
		};
	},
  computed: {
    ...mapGetters([
      'systemName'
    ])
  },
  created() {
	  this.activateEmailFunction();
  },
	methods: {
    ...mapActions(["activateEmail"]),
    goBackLogin () {
      this.$router.push('/login')
    },
    activateEmailFunction(){
      let data = {
        code: this.code
      }
      this.activateEmail(data).then(res => {
        if (res) {
          this.message = res.message;
        }
      }).catch(err => {
        this.$message({
          message: '服务器出错啦',
          type: "error"
        });
      })
    }
	}
};
</script>

<style scoped>
  .loginHeader {
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .active{
    color: #5579ee;
    display: inline-block;
    font-size: 20px;
  }

  .login_contenter {
    width: 100%;
    background-position: 100% 100%;
    background: #00000e url("../assets/surfing.jpg") no-repeat center 0;
  }
  .content_box {
    height: 530px;
    padding: 144px 0px;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .content_box_form {
    box-sizing: border-box;
    display: inline-block;
    width: 520px;
    vertical-align: top;
    text-align: center;
    background-color: #ffffff;
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
  .message-tip{
    color: red;
    margin-bottom: 36px;
  }
  .go-back-login{
    padding: 10px 10px;
    border: 1px solid #eee;
    background: #5579ee;
    color: #fff;
    cursor: pointer;
  }
</style>
