<template>
  <div id="login">
    <div class="user-login">
      <sing-in v-if="capitalsLock" @seng="seng($event)" @verification="verification($event)" @phonePassword="phonePassword($event)" />
      <register v-else @seng="seng($event)" @verification="verification($event)" :is-code="isCode" :value="value"/>
    </div>
    <div v-if="capitalsLock" @click="isRegister" class="register">没有账号，去注册</div>
    <div v-else @click="isRegister" class="register">已有账号，去登录</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import singIn from './sing-in/index.vue'
import register from './register/index.vue'
import {captchaUpdate, phoneUpdate, sengPhone} from "../../API/play";
export default {
  name: 'login',
  setup() {
    const capitalsLock = ref(true)
    const value = ref({})
    const isCode = ref(0)
    return { capitalsLock,value,isCode }
  },
  components: {
    singIn,
    register
  },
  methods: {
    isRegister() {
      this.capitalsLock = !this.capitalsLock
    },
    //密码登录
    phonePassword(val) {
        phoneUpdate('/login/cellphone', {
          phone: val.phone,
          password: val.password
        }).then(data => {
          if(data.code === 502) {
            return this.$message({
              message: `${data.message}`,
              type: 'warning'
            })
          }
          this.$store.dispatch('user/insert',{})
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          });
          this.$store.dispatch('user/insert',{
            token: data.token,
            cookie: data.cookie,
            nickname: data.account.userName,
            userId: data.account.id})
          this.$router.push('/home')
        }).catch((err) => {
          this.$message({
            message: `${err.code.response.data.message}`,
            type: 'warning'
          })
        })
    },
    //发送验证码
    seng(val) {
        sengPhone('/captcha/sent',{phone:val.phone}).then(data => {
            if(val.isText === 2) {
              this.value = val
              this.isCode = 1
            }
        }).catch(err => {
          this.$message({
            message: '发送失败，请稍后重试',
            type: 'warning'
          })
        })

    },
    //验证码登录
    phoneVerification(val) {
        captchaUpdate('/login/cellphone', {
          phone: val.phone,
          captcha: val.verification
        }).then(data => {
          this.value = val
          this.$store.dispatch('user/insert',{})
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          });
          this.$store.dispatch('user/insert',{
            token: data.token,
            cookie: data.cookie,
            nickname: data.account.userName,
            userId: data.account.id})
          this.$router.push('/home')
        }).catch(err => {
          this.$message({
            message: '登录失败，请稍后重试',
            type: 'warning'
          })
        })

    },
    //校验验证码
    verification(val) {
        captchaUpdate('/captcha/verify', {
          phone: val.phone,
          captcha: val.verification
        }).then(data => {
            if(data.code === 200) {
              this.value.phone = val.phone
              this.value.verification = val.verification
              if(val.isText === 1) {
                this.phoneVerification(val)
              }
              if(val.isText === 3) {
                this.isCode = 2
              }
            }
        }).catch(err => {
          this.$message({
            message: `${err.response.data.message}`,
            type: 'warning'
          })
        })
    }
  }
}
</script>

<style lang="less">
#login {
  height: 600px;
  width: 100%;
  background-color: #C9EDFF;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .user-login {
    height: 376px;
    width: 400px;
    background-color: #FFFFFF;
  }
  .register {
    position: absolute;
    margin: 229px 0 0 246px;
    color: #00A9FF;
    font-size: 13px;
    cursor: pointer;
  }
}
</style>
