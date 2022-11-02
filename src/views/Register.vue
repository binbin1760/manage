<template>
  <div class="register-page">
    <el-form :model="userinfo" status-icon :rules="rules" ref="userinfo" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号:" prop="id">
        <el-input type="text" v-model="userinfo.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="pass">
        <el-input type="password" v-model="userinfo.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="phone">
        <el-input type="text" v-model="userinfo.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="useremail">
        <el-input type="email" v-model="userinfo.useremail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userinfo')">提交</el-button>
        <el-button @click="resetForm('userinfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/getdata';
export default {
  data() {
    var validid = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请入出账号"))
      } else {
        callback();
      }
    }
    var validpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        callback();
      }
    }
    var validphone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"))
      } else {
        callback();
      }
    }
    var validuseremail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"))
      } else {
        callback();
      }
    }
    return {
      userinfo:{
        id:"",
        pass:"",
        phone:"",
        useremail:""
      },
      rules:{
        id: [
          { validator: validid, trigger: 'blur' }
        ],
        pass:[         
            { validator: validpass, trigger: 'blur' }
        ],
        phone: [
          { validator: validphone, trigger: 'blur' }
        ],
        useremail: [
          { validator: validuseremail, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 提交注册表单
          const res = await register({
            id: this.userinfo.id,
            pass: this.userinfo.pass,
            phone: this.userinfo.phone,
            useremail: this.userinfo.useremail
          })
          if (res.data.code === "1") {
            this.$router.push('/login')
          } else {
            alert("注册失败,该用户已存在")
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped >
  .register-page{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    align-self: center;
    width: 900px;
    box-shadow: 0 2px 4px 3px rgba(0, 0, 0, .12)
  }
  .demo-ruleForm{
    width: 350px;
    height: 400px;
  }
</style>