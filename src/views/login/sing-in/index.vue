<template>
      <div class="input-border">
        <div class="login-name">登录酷狗音乐</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="phone">
            <el-input oninput="if(value.length>5)value=value.slice(0,11)" type="number" v-model="ruleForm.phone" autocomplete="off"  placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item v-if="isText" style="position: relative"  prop="verification">
            <el-input oninput="value=value.slice(0,4)" type="number" v-model="ruleForm.verification" autocomplete="off"  placeholder="请输入验证码"></el-input>
            <div v-if="isCode" class="send" @click="seng('ruleForm')">发送验证码</div>
            <div v-else class="send" >{{ this.timeCode }}</div>
          </el-form-item>

          <el-form-item v-else prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"  placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
        <div @click="codeStyle" class="text">{{text}}</div>
      </div>

</template>

<script>
import { ref } from 'vue'
import { sengPhone,captchaUpdate,phoneUpdate } from '../../../API/play'
export default {
  name: 'singIn',
  data() {

    const phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('输入手机号'));
      } else if (!/^1[345678]\d{9}$/.test(value)) {
        callback(new Error('输入正确手机号'));
      } else {
        callback ()
      }
    };
    const verification = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (!/[0-9]{4}/.test(value)) {
        callback(new Error('验证码4个数'));
      } else {
        callback ()
      }
    };
    const password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password !== '') {
          return callback();
        }
        callback();
      }
    };

    return {
      ruleForm: {
        phone: '',
        verification: '',
        password: ''
      },
      rules: {
        phone: [
          { validator: phone, trigger: 'blur' }
        ],
        verification: [
          { validator: verification, trigger: 'blur' }
        ],
        password: [
          { validator: password, trigger: 'blur' }
        ]
      }
    };
  },
  setup() {
    const isCode = ref(true)
    const timeCode = ref(0)
    const isText = ref(true)
    const text = ref('使用密码登录')

    return { isCode,timeCode,isText,text }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isText) {
            this.ruleForm.isText = 1
            this.$emit('verification',this.ruleForm)
          } else {
            this.ruleForm.isText = 0
            this.$emit('phonePassword',this.ruleForm)
          }
        } else {
          return false;
        }
      });
    },
    seng(formName) {
      this.$refs[formName].validateField('phone',(valid) => {
        if (valid) {
          this.toCode(60)
          this.$emit('seng', {phone:this.ruleForm.phone})
        } else {
          return false;
        }
      });
    },
    toCode(seconds) {
      this.timeCode = `重新发送(${seconds}S)`
      this.isCode = false
      const time = setInterval(() => {
        if (seconds > 0) {
          this.timeCode = `重新发送(${seconds}S)`
          --seconds
        } else {
          this.isCode = true
          clearInterval(time)
        }
      },1000)
    },
    codeStyle() {
      this.isText = !this.isText
      if (this.isText) {
        this.text = '使用密码登录'
      } else {
        this.text = '验证码登录'
      }

    }
  }

}
</script>

<style lang="less">

    .input-border {
      padding: 0 15px;
      .text {
        font-size: 12px;
        cursor: pointer;
        color: #00A9FF;
      }
      .login-name {
        font-size: 23px;
        display: flex;
        justify-content: center;
        margin-top: 22px;
      }
      .demo-ruleForm {
        margin-top: 50px;
        .send {
          color: #3FA6EE;
          font-size: 10px;
          cursor: pointer;
          position: absolute;
          margin-left: 270px;
        }
      }
      .el-input__inner {
        height: 40px;
      }
    }
</style>
