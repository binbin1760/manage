<template>
    <div class="userlist">
        <el-table ref="multipleTable"
            :data="userdata.filter(data => !search || data.userid.toLowerCase().includes(search.toLowerCase()))"
            tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border stripe>
            <el-table-column type="index" width="55">
            </el-table-column>
            <el-table-column prop="date" label="注册日期">
            </el-table-column>
            <el-table-column prop="user" label="客户昵称">
            </el-table-column>
            <el-table-column prop="userid" label="客户ID" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="ordernum" label="下单数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="leve" label="用户等级" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="请输入需要查询的订单编号" />
                </template>
                <template slot-scope="scope">
                    <PermissionVue :permissioncode="['per1','per5']">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                    </PermissionVue>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize"
                @current-change="currentevent">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { userdata } from '@/api/getdata';
import PermissionVue from '@/components/Permission.vue';
export default {
    data() {
        return {
            userdata: [],
            multipleSelection: [],
            search: "",
            total:0,//总页数
            pagesize:15,//每一页的容量
        }
    },
    components:{
        PermissionVue
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        currentevent(val) {
            userdata({ total: this.total, pagesize: this.pagesize, page: val }).then(res => {
                this.userdata = res.data.totalpagedata;
                this.total = res.data.total;
            })
        }
    },
    created(){
      userdata({total:this.total,pagesize:this.pagesize,page:1}).then(res=>{
            this.userdata=res.data.totalpagedata;
            this.total=res.data.total;
      })
    }
}
</script>

<style scoped>
.userlist{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.pages{
    margin-top: 20px;
    text-align: center;
    position: absolute;
    bottom:180px;
    right: 50%;
  }
</style>