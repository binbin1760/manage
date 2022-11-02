import { getuserdata } from "@/api/getdata";

export default{
    state: {
        staff:{},
        islogin:false,//  登录标记
        permission:[]// 权限列表
    },
    getters: {

    },
    mutations: {
        SaveUser(state,staff){
            state.staff=staff;
        },
        Changeislogin(state,islogin){
            state.islogin=islogin
        },
        Getpermission(state,permission){
            state.permission=permission
        }
    },
    actions: {
        // 获取用户信息
         getAdmindata({commit}){
            if(localStorage.token===""){
                console.log("无token可用....");
            }else{
                const res=getuserdata({token:localStorage.token}).then(res=>{
                    commit("SaveUser",res.data.staff[0])
                })
            }
        }
    },
}