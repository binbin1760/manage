import axios from "axios";
import {ELMessage} from "element-ui"
// 自定义封装axios


// 请求
const http=axios.create({
    baseURL:"/ordermanage/",
    //响应超时6s
    timeout:6000,
    // 请求头
    Headers:{
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" 
    }
})
// 请求拦截
http.interceptors.request.use(config=>{
    config.headers.token = 'token';
    return config;
})
// 返回拦截
http.interceptors.response.use(response=>{
    const res=response.data;
    if(res.code===0){
        return res
    }else if(res.code===1000){
        
    }
})