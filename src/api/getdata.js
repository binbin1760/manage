import axios from "axios"

// ---------------------------登录-----------------------

export const login=data=>axios.post("/user/userinfo/login",data)

//--------------------------注册-----------------------

export const register=data=> axios.post("/user/userinfo/register",data)

// ---------------------获取权限列表---------------------------------


// 获取用户信息
export const getuserdata=data=>axios.post("/user/userinfo",data)

//----------------------- 主页--------------------------------

export const task=data=> axios.post("/mian/home/task",data)

//--------------------------订单信息请求-------------------------

export const orderdata=data=>axios.post("/mian/home/orderlist",data)

//预期订单请求

export const overtimeorder=data=>axios.post("/main/overtimelist",data)

// 售后订单

export const afterorder=data=>axios.post("/mian/afterorder",data)

// 遗漏订单

export const forgetorder=data=>axios.post("/mian/forgetorder",data)

// ------------------------------用户信息------------------------

export const userdata=data=>axios.post("/main/userdata",data)

// 优质用户

export const gooduser=data=>axios.post("/main/gooduser",data)

// 风险用户

export const riskuser=data=>axios.post("/main/riskuser",data)

//封禁用户

export const banuser=data=>axios.post("/main/banuser",data)

// --------------客服部门---------------------------

// 客服列表
export const kefu=data=>axios.post("/main/kefu",data)

// -----------------后勤部门-------------------------

// 获取后勤工作人员数据
export const logistics=data=>axios.post("/main/logistics",data)

// 获取后勤用品数据
export const officesup=data=>axios.post("/main/officesup",data)


// -------------------业务部门---------------------------
// 业务查询
export const business=data=>axios.post("/main/business",data)


// ------------------------获取订单留言-----------------------
