<template>
    <div class="login-name">注册酷狗音乐</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="phone">
        <el-input oninput="if(value.length>5)value=value.slice(0,11)" type="number" v-model="ruleForm.phone" autocomplete="off"  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"  placeholder="设置登录密码，不少于八位"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>


</template>

<script>
export default {
  name: 'singIn',
  data() {

    const phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('输入手机号'));
      } else if (!/^1[345678]\d{9}$/.test(value)) {
        callback(new Error('输入正确手机号'));
      }
      callback ()
    }
    const password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 8) {
        callback(new Error('请输入密码八位以上'));
      }
        callback();
    };

    return {
      ruleForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { validator: phone, trigger: 'blur' }
        ],
        password: [
          { validator: password, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.ruleForm.isText = 2
          this.$emit('seng',this.ruleForm)
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
    margin-top: 22px;
    padding-bottom: 15px;
  }
  .demo-ruleForm {
    margin-top: 30px;
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
</style>
