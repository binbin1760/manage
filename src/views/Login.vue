<template>
  <div class="login-page">
    <!-- 轮播图部分 -->
    <div class="block">
      <el-carousel  height="600px">
        <el-carousel-item v-for="item in pic" :key="item">
            <img class="block-img" :src="item" >
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 分割线 -->
    <div class="split"></div>
    <!-- 登录列表 -->
    <div class="form-login">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="id">
          <el-input type="text" v-model="ruleForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../api/getdata"
import { mapState,mapMutations } from "vuex";
export default {
  data() {
    var validid = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('密码错误'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id: '',
        pass: "",
      },
        pic:[
          require("../assets/埃尔登01.png"),
          require("../assets/艾尔登02.png"),
          require("../assets/艾尔登03.png"),
          require("../assets/艾尔登04.png"),
        ],
      rules: {
        id: [
          { validator: validid, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 登录请求
          const res = await login({ id: this.ruleForm.id, pass: this.ruleForm.pass });
          if (res.data.code === "202") {
            localStorage.setItem('token',res.data.staff[0].token)
            this.$router.push("/main/home")
            this.$store.commit('Changeislogin',true)
            this.$store.commit('SaveUser',res.data.staff[0])
            this.$store.commit('Getpermission',res.data.permission)
          } else {
            alert("账号或密码错误")
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapMutations(["Changeislogin"])
  },
  computed:{
    ...mapState(["userlogin"])
  }
}
</script>

<style scoped>
/* 整个登陆页面 */
.login-page {
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-self: center;
  align-items: center;
  width: 1500px;
}

/* 轮播图 */
.block{
  width: 900px;
  height: 600px;
}
.block-img{
  width: 900px;
  height: 600px;
  object-fit: fill;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

/* 登录部分 */
.login-page .form-login {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 600px;
}

.form-login .demo-ruleForm {
  width: 350px;
}

/* 中间分割线 */
.login-page .split {
  width: 1px;
  height: 1000px;
  background: rgb(179, 179, 179);
}
</style>