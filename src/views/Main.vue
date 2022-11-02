<template>
  <div class="main">
    <!-- 侧栏 -->
    <el-row class="tac">
      <el-col :span="24">
        <el-menu default-active="home" class="el-menu-vertical-demo" style="border-right: none;"
          background-color="rgb(50, 64, 87)" active-text-color="#20a0ff" text-color="#bfcbd9" :router="true">
          <!-- 首页 -->
          <el-menu-item route="/main/home" index="home">
            <i class="el-icon-s-home"></i>
            <span slot="title">系统主页</span>
          </el-menu-item>
          <el-menu-item route="/main/message" index="message">
            <i class="el-icon-message-solid"></i>
            <span slot="title">系统公告</span>
          </el-menu-item>
          <!-- 订单 -->     
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>订单数据</span>
            </template>
            <el-menu-item-group>
              <el-menu-item route="/main/orderlist" index="orderlist">订单列表</el-menu-item>
              <el-menu-item route="/main/overtimelist" index="overtimelist">订单统计</el-menu-item>
              <el-menu-item route="/main/afterorder" index="afterorder">正在处理</el-menu-item>
              <el-menu-item route="/main/addorder" index="addorder">添加订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 客户 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>客户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item route="/main/userlist" index="userlist">客户列表</el-menu-item>
              <el-menu-item route="/main/firstlist" index="firstlist">优质客户</el-menu-item>
              <el-menu-item route="/main/riskusers" index="RiskUsers">风险用户</el-menu-item>
              <el-menu-item route="/main/banusers" index="banusers">封禁用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 客服部门 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>客服部门</span>
            </template>
            <el-menu-item-group>
              <el-menu-item route="/main/kestaff" index="kestaff">客服列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 业务部门 -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>业务部门</span>
            </template>
            <el-menu-item-group>
              <el-menu-item route="/main/business" index="business">业务</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 日报中心 -->
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span>日报中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="">报告统计</el-menu-item>
              <el-menu-item route="/main/quilleditor" index="quilleditor">编写报告</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--  项目说明 -->
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span>项目说明</span>
            </template>
            <el-menu-item-group>
              <el-menu-item  route="/main/projectdetails" index="projectdetails">项目相关</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <!-- 侧栏目标导航显示区域 -->
    <el-col :span="24"  style="height: 100%; overflow: auto;">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {

    }
}
</script>

<style scoped>
.main{
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow:auto;
}
.tac{
  width:20%; 
  background: rgb(50, 64, 87);
}
</style>