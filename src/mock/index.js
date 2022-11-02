import Mock, { mock } from "mockjs";

// 模拟手机号
Mock.Random.extend({
    phone:function(){
        let phonePrefixs=["132","135","189","176","155","133"]
        return this.pick(phonePrefixs)+Mock.mock(/\d{8}/)
    }
})
// ------------------------------------模拟后端业务逻辑代码部分----------------------------

// 分页：  URL（请求路径）   page（页码） total（总条数） pagesize（每一页容量） 所需要模拟项目的所有数据data
function splicepage (page,total,pagesize,data){
    total=data.length
    let totalpagedata=data.slice((page-1)*pagesize,page*pagesize)
    return {total ,totalpagedata}
}



// ------------------ 业务逻辑所需数据模拟--------------------
// 1.用户信息模拟
const userdata=Mock.mock({
    "userdata|50":[
        {
            "date":"@date(yyyy-MM-dd)",//注册时间
            "user":"@cname()",//用户昵称
            "userid":"@id()",//用户ID
            "ordernum":"@natural(1,50)",//订单数量
            "leve":"@natural(0,6)"//用户质量评级0-6 越高越好
        }
    ]
})
// 2.订单列表
const Orderdata=Mock.mock({
    "Orderdata|50":[
        {
            "date":"@date(yyyy-MM-dd)",//下单时间
            "lastdate|+1":["3","7","15"],//约定时效
            "user":"@cname()",//客户
            "order":"@cparagraph(1)",//订单名
            "orderid":"@id()",//订单di
            "address":"@city()",//订单城市
            "state|1":["完成","未完成","待定"],//订单状态
            "ordernotes":"@cparagraph(3)"
        }
        ]
})
// 3.任务列表模拟
const task=Mock.mock({
    "task|50":[
        {
            "date":"@date(yyyy-MM-dd)",
            "name":"@cname()",
            "task|1":[
                "关于国庆假期安排以及注意事项",
                "关于防疫工作安排以及注意事项",
                "关于加班工时费用调整通知",
                "关于团建意见征求",
                "关于五一放假安排以及注意事项",
                "基本工资调整通知"
            ],
            "content":"@cparagraph(5)"

        }
        ]
})
//  员工列表
const staff=Mock.mock({
    "staff|500":[
        {
            "date":"@date(yyyy-MM-dd)",//上岗时间
            "user":"@cname()",//名字
            "phone":"@phone()",//；练习电话
            "email":"@email",//邮箱
            "job|+1":["员工","主管","部长"],//员工职位
            "achievement":"@natural(1,100)"//业绩
        }
    ]
})
// 模拟 三个员工数据----1.部长级---2.主管级----3.普通员工
// 1.部长级
const minister=Mock.mock({
    "minister":[
        {
            "date":"@date(yyyy-MM-dd)",//上岗时间
            "user":"@cname()",//名字
            "phone":"@phone()",//；练习电话
            "email":"@email",//邮箱
            "job":"部长",//员工职位
            "achievement":"@natural(1,100)",//业绩
            "token":"a123456789"
        }
    ]
})
// 2.主管
const zhuguan=Mock.mock({
    "zhuguan":[
        {
            "date":"@date(yyyy-MM-dd)",//上岗时间
            "user":"@cname()",//名字
            "phone":"@phone()",//；练习电话
            "email":"@email",//邮箱
            "job":"主管",//员工职位
            "achievement":"@natural(1,100)",//业绩
            "token":"b123456789"
        }
    ]
})
// 3.普通员工
const onestaff=Mock.mock({
    "staff":[
        {
            "date":"@date(yyyy-MM-dd)",//上岗时间
            "user":"@cname()",//名字
            "phone":"@phone()",//；练习电话
            "email":"@email",//邮箱
            "job|+1":"员工",//员工职位
            "achievement":"@natural(1,100)",//业绩
            "token":"c123456789"
        }
    ]
})
// ---------------------权限数据表---------------------
// 普通员工
const PermissionStaff=Mock.mock({
    "PermissioStaff":[]
})
//   主管
const Permissionzhuguan=Mock.mock({
    'Permissiozhuguan':['per1','per2','per3']
})
// 部长
const Permissionminister=Mock.mock({
    'Permissionminister':['per4','per5','per6']
})
// 后勤数据
const officesup=Mock.mock({
    "officesup|500":[
        {
            "date":"@date(yyyy-MM-dd)",//购入时间
            "user":"@cname()",//负责人
            "name|+1":["复印纸","抽纸","中性笔","笔记本","电脑","工牌"],//办公用品
            "number":"@natural(1,100)"//剩余数量
        }
    ]
})
// 业务员
const business=Mock.mock({
    "business|500":[
        {
            "date":"@date(yyyy-MM-dd)",//开始时间
            "user":"@cname()",//负责人
            "name|+1":["郫县豆瓣","复合肥","有机奶","零食","文具","书籍"],//负责项目
            "achievement":"@natural(1,100)"//业绩
        }
    ]
})
// -----------------------------------------模拟业务逻辑模拟------------------------------------
// 用户信息模块
Mock.mock("/user/userinfo/login", "post", function (req) {
    let id = JSON.parse(req.body).id;
    let pass = JSON.parse(req.body).pass
    // 模拟登录 默认账号 admin  密码:123
    if (id === "admin" && pass === "123") {
        return {
            code: "202",
            message: "登录成功",
            staff: onestaff.staff,
            permission:PermissionStaff.PermissioStaff

        }
    } else if (id === "admin1" && pass === "123") {
        return {
            code: "202",
            message: "登录成功",
            staff: zhuguan.zhuguan,
            permission:Permissionzhuguan.Permissiozhuguan
        }
    } else if (id === "admin2" && pass === "123") {
        return {
            code: "202",
            message: "登录成功",
            staff: minister.minister,
            permission:Permissionminister.Permissionminister
        }
    } else {
        return {
            code: "201",
            message: "登录失败",
        }
    }
})


// 模拟注册
Mock.mock("/user/userinfo/register","post",function(req){
    let user=JSON.parse(req.body)
    if(user.id!=="admin"){
        return{
            code:"1",
            message:"注册成功"
        }
    }else{
        return {
            code:"2",
            message:"注册失败"
        }
    }
        
})
//  模拟获取用户信息  ---header组件
Mock.mock("/user/userinfo", "post", req => {
    let reqdata = JSON.parse(req.body)
    console.log(reqdata);
    if (reqdata.token === "a123456789"){
        // 返回部长信息
        return {
            staff: minister.minister
        }
    } else if (reqdata.token === "b123456789"){
        return {
            staff: zhuguan.zhuguan
        }
    } else if (reqdata.token === "c123456789"){
        return {
            staff: onestaff.staff
        }
    } else {
        return {
            message: "无效token"
        }
    }

})
// 模拟公告列表--主页
Mock.mock("/mian/home/task","post",function(req){
    let reqdata=JSON.parse(req.body)
    let task2= splicepage(reqdata.page,reqdata.total,reqdata.pagesize,task.task)
    return task2
})

// 模拟订单列表
Mock.mock("/mian/home/orderlist","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,Orderdata.Orderdata)
    return orderdata2
})
// 模拟逾期订单
Mock.mock("/main/overtimelist","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,Orderdata.Orderdata)
    return orderdata2
})
//  售后订单
Mock.mock("/mian/afterorder","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,Orderdata.Orderdata)
    return orderdata2
})
//  遗漏订单--- 未处理订单
Mock.mock("/mian/forgetorder","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,Orderdata.Orderdata)
    return orderdata2
})


// -----------------------------------客户管理-相关数据模拟-------------------------------------
// 客户管理
Mock.mock("/main/userdata","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,userdata.userdata)
    return orderdata2
})
//   优质用户
Mock.mock("/main/gooduser","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,userdata.userdata)
    return orderdata2
})
//  风险用户
Mock.mock("/main/riskuser","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,userdata.userdata)
    return orderdata2
})
// 封禁用户
Mock.mock("/main/banuser","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,userdata.userdata)
    return orderdata2
})
// ---------------------------员工数据相关---------------------
// 获取客服员工数据     staff
Mock.mock("/main/kefu","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,staff.staff)
    return orderdata2
})
// 后勤员工数据
Mock.mock("/main/logistics","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,staff.staff)
    return orderdata2
})
// 后勤数据--办公用品
Mock.mock("/main/officesup","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,officesup.officesup)
    return orderdata2
})
//------------------------------ 业务部门数据相关---------------------
// 业务员  business
Mock.mock("/main/business","post",req=>{
    let reqdata=JSON.parse(req.body)
    let orderdata2=splicepage(reqdata.page,reqdata.total,reqdata.pagesize,business.business)
    return orderdata2
})