<template>
    <header>
        <div class="btn" v-if="!userlogin.islogin">
            <!-- 注册 -->
            <div class="register">
                <router-link to="/register" active-class="active">注册</router-link>
            </div>
            <!-- 登录 -->
            <div class="login">
                <router-link to="/login" active-class="active">登录</router-link>
            </div>
        </div>
        <div class="user" v-if="userlogin.islogin">
            <span>员工：<a class="a-btn" @click="out">{{userlogin.staff.user}}</a></span>
            <span>职位：<a>{{userlogin.staff.job}}</a></span>
            <!-- 退出登录选择框 -->
            <transition name="fade">
                <div class="user-out"  v-show="ishow1">
                    <div class="login-out" @click="loginout">退出登录</div>
                </div>
            </transition>
        </div>
    </header>
</template>

<script>
import userlogin from '@/store/userlogin';
import { mapActions,mapState } from 'vuex';
export default {
    data() {
        return {
            ishow: true,
            ishow1: false,
        }
    },
    watch:{
        ishow:{
            handler(val,oldval){
            }
        }
    },
    computed: {
        ...mapState(["userlogin"]),
    },
    methods: {
        ...mapActions(["getAdmindata"]),
        out(){
            this.ishow1=!this.ishow1
        },
        loginout(){
            localStorage.token=""
            this.$router.push("/login")
            this.ishow1=!this.ishow1
            this.$store.commit('Changeislogin',false)
            this.$store.commit('SaveUser',{})
        }
    },
}
</script>

<style scoped>
header {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: 100vw;
    height: 80px;
    background: #F5F5F5;
}
/* 登陆前 登录注册选项 */
.btn {
    display: flex;
    flex-direction: row-reverse;
}
.btn span
a {
    text-decoration: none;
    color: #333;
}

/* 注册 */
.register {
    width: 50px;
    margin-right: 80px;
    font-size: 18px;
    font-weight: 550;
}

.login {
    width: 50px;
    margin-right: 10px;
    font-size: 18px;
    font-weight: 550;
    border-right: 1px solid #333;
    display: flex;
    flex-direction: column;
}

.active {
    color: #f03c3c;
}
/* 登陆后--员工ID显示栏 */
.user{
    display: flex;
}
.user span{
    color: #333;
    font-size: 18px;
    font-weight: 550;
    margin-right: 50px;
}
.user span a{
    color:#eb0808;
    text-decoration: underline;
}
.user .a-btn{
    cursor: pointer;
}
.user .user-out{
    width: 100px;
    height: 100px;
    position: absolute;
    top:55px;
    right: 180px;
}
.user .user-out .login-out{
    cursor: pointer;
    color: #333;
    font-size: 18px;
    text-align: center;
    margin-top:5px;
    text-decoration: underline;
}
/* 动画 */
.fade-enter-active{
    opacity: 0;
}
.fade-enter-to{
    transition: all 0.5s ease;
    opacity: 1;
}
.fade-leave-active{
    transition: all 0.5s ease;
    opacity: 0;
}
</style>