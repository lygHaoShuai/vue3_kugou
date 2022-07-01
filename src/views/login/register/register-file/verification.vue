<template>
    <div class="verification">校验验证码</div>
    <div style="display: flex">
      <div style="color: #929292;">你的手机号:</div>
      <div style="margin-left: 8px">{{phone.slice(0,3)}}****{{ phone.slice(7,11) }}</div>
    </div>
    <div style="font-size: 10px;margin-top: 10px;color: #999999">为了安全，我们会给你发送短信验证码</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="verification">
        <el-input oninput="value=value.slice(0,4)" type="number" v-model="ruleForm.verification" autocomplete="off"  placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
    <div v-if="isClick" class="anew" @click="seng">{{ this.timeCode }}</div>
    <div v-else class="anew" >{{ this.timeCode }}</div>
</template>

<script>

import { ref } from 'vue'
export default {
  name: 'singIn',
  data() {

    const verification = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码'));
      } else if ( value.length !== 4 ) {
        callback(new Error('验证码四位'));
      } else {
        callback ()
      }
    }

    return {
      ruleForm: {
        verification: ''
      },
      rules: {
        verification: [
          { validator: verification, trigger: 'blur' }
        ]
      }
    };
  },
  setup() {
    const timeCode = ref('重新发送')
    const isClick = ref(true)
    return { timeCode,isClick }
  },
  props: {
    phone: String
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.$emit('verification', {phone: this.phone,verification:this.ruleForm.verification,isText: 3})
        }
      });
    },
    seng() {
      this.toCode(60)
      this.isClick = false
      this.$emit('seng', {phone:this.phone})

    },
    toCode(seconds) {
      this.timeCode = `重新发送(${seconds}S)`
      const time = setInterval(() => {
        if (seconds > 0) {
          this.timeCode = `重新发送(${seconds}S)`
          --seconds
        } else {
          this.timeCode = '重新发送'
          this.isClick = true
          clearInterval(time)
        }
      },1000)
    },
  }
}
</script>

<style lang="less">

  .verification {
    font-size: 23px;
    display: flex;
    justify-content: center;
    margin-top: 22px;
    padding-bottom: 25px;
  }
  .demo-ruleForm {
    margin-top: 30px !important;
    position: relative;
  }
  .el-form {
    .el-form-item {
      .el-form-item__content {
        margin-left: unset !important;
      }
    }
    .el-button--primary {
      width: 100%;
    }
  }
  .anew {
    color: #00A9FF;
    font-size: 13px;
    cursor: pointer;
  }
</style>
