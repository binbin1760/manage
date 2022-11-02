<template>
    <div class="riskusers">
        <el-table ref="multipleTable"
            :data="userdata.filter(data => !search || data.userid.toLowerCase().includes(search.toLowerCase()))"
            tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="index" width="55">
            </el-table-column>
            <el-table-column prop="date" label="注册日期" width="120">
                <!-- <template v-slot="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="user" label="客户昵称" width="120">
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
import {riskuser} from "../api/getdata"
export default {
    data() {
        return {
            userdata: [],
            multipleSelection: [],
            search: "",
            total: 0,//总页数
            pagesize: 15,//每一页的容量
        }
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
            riskuser({ total: this.total, pagesize: this.pagesize, page: val }).then(res => {
                this.userdata = res.data.totalpagedata;
                this.total = res.data.total;
            })
        }
    },
    created() {
        riskuser({ total: this.total, pagesize: this.pagesize, page: 1 }).then(res => {
            this.userdata = res.data.totalpagedata;
            this.total = res.data.total;
        })
    }
}
</script>

<style scoped>
.riskusers{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
}
.pages {
    margin-top: 20px;
    text-align: center;
    position: absolute;
    bottom: 180px;
    right: 50%;
}
</style>