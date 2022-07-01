<template>
  <div class="verification">设置昵称</div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm demo">
    <div style="color: #929292;">取一个好听的名字，让大家记住你</div>
    <el-form-item prop="phone">
      <el-input type="text" v-model="ruleForm.name" autocomplete="off"  placeholder="输入昵称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">完成注册，开启网易云音乐</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { registerAccount } from '../../../../API/play'
export default {
  name: 'singIn',
  data() {

    const name = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('昵称不能为空'));
      }
      callback ()
    }

    return {
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { validator: name, trigger: 'blur' }
        ]
      }
    };
  },
  props: {
    account: Object
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
            registerAccount('/register/cellphone', {
              phone: this.account.phone,
              password: this.account.password,
              captcha: this.account.captcha,
              nickname: this.ruleForm.name
            }).then(data => {

            }).catch(err => {

            })
        }

      });
    }
  }
}
</script>

<style lang="less">

.verification {
  font-size: 23px;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.demo {
  margin-top: 15px !important;
}
.el-form {
  .el-button--primary {
    width: 100%;
  }
}
</style>
