import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
const Home=()=>import ("../views/Home.vue")
const Message=()=> import ("../views/Message.vue")
const Login=()=> import ("../views/Login.vue")
const Mian=()=> import ("../views/Main.vue")
const Register=()=> import ("../views/Register.vue")
// 订单管理部分

const OrderList=()=> import ('../views/OrderList.vue')
const OvertimeList=()=> import ('../views/OvertimeList.vue')
const AfterOrder=()=> import ("../views/AfterOrder.vue")
const Addorder=()=> import ("../views/Addorder.vue")

// 用户管理
const UserList=()=> import ('../views/UserList.vue')
const FirstList=()=> import ("../views/FirstUser.vue")
const RiskUsers=()=> import ("../views/RiskUsers.vue")
const BanUsers=()=> import ("../views/BanUsers.vue")
// 客服部门

const Kestaffa=()=> import ("../views/kestaff.vue")
// 业务部门

const Business=()=> import ("../views/Business.vue")
// 日报中心
const QuillEditor=()=>import('../views/QuillEditor.vue')
// 项目说明
const projectdetails=()=>import('../views/projectdetails.vue')

Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {
      path:"/login",
      component:Login
    },
    {
      path:"/main",
      component:Mian,
      children:[
        // 主页
        {
          path:'home',
          component:Home
        },
        {
        path:'message',
        component:Message
        },
        // 订单列表
        {
          path:"orderlist",
          component:OrderList
        },
        // 预期订单
        {
          path:"overtimelist",
          component:OvertimeList
        },
        // 售后订单
        {
          path:'afterorder',
          component:AfterOrder
        },
        // 遗漏&未处理订单
        {
          path:'addorder',
          component:Addorder
        },
        //  用户给管理部分
        //  用户列表
        {
          path:"userlist",
          component:UserList
        },
        // 优质用户
        {
          path:"firstlist",
          component:FirstList
        },
        // 风险用户
        {
          path:"riskusers",
          component:RiskUsers
        },
        // 封禁用户
        {
          path:"banusers",
          component:BanUsers
        },
        // 客服部门部分
        {
          path:"kestaff",
          component:Kestaffa
        },
        // 业务部门---业务
        {
          path:"business",
          component:Business
        },
        // 日报中心 
        { 
          path:"quilleditor",
          component:QuillEditor
        },
        {
          path:'projectdetails',
          component:projectdetails  
        }
      ]
    },
    {
      path:"/register",
      component:Register
    },
    {
      path:"/",
      redirect:"/login"
    }
  ]
})
//  -----------------全局路由守卫------------------------
router.beforeEach((to,from,next)=>{
    let token=localStorage.token
    if(!token&&to.path!=="/login"){// 1.未登录无法访问主页等内部页面
      if(to.path=="/register"){//未登录 注册跳转--》 注册页面
        next()
      }else{//未登录 也不注册 只能停留在登录页面
        next('/login')
      }
    }else if(token&&to.path=='/login'){// 2.已经登录无法退回登录页面
      next(false)
    }else{ // 3. 登陆后正常放行
      next()
    }
})
export default router
