
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            
        }
    },
    props: {
        permissioncode: {//权限指令  --- 主管  ---  部长
            type: Array,
            default: '',
            required:true
        }
    },
    computed:{
        ...mapState(['userlogin']),
        haspermission(){
            let flag=false;
            let permissions=this.userlogin.permission
            //  判断权限数组是否为空
            if(permissions.length==0){
                return flag
            }
            
            // 判断权限数组是否包含相关权限码
            for(let i=0;i<=this.permissioncode.length;i++){
                if(permissions.indexOf(this.permissioncode[i]==-1)){
                    flag=true
                    return flag
                    break;
                }
            }
            return flag
        }
    },
    render(){
        let ok=this.haspermission;
        let rendercontent =(this.$slots.default || [])[0];
        if(!ok || !rendercontent){
            rendercontent=document.createComment('-')
        }
        return rendercontent
    },
}
</script>

<style>
</style>