<template>
    <div class="kefu">
        <el-table ref="multipleTable"
            :data="staff.filter(data => !search || data.user.toLowerCase().includes(search.toLowerCase()))"
            tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border stripe>
            <el-table-column type="index" width="55">
            </el-table-column>
            <el-table-column prop="date" label="上岗时间" width="120">
                <!-- <template v-slot="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="user" label="名字" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="job" label="职位" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="achievement" label="业绩" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="请输入需要查询的员工名称" />
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
import { kefu } from '@/api/getdata';
export default {
    data() {
        return {
            staff: [],
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
        currentevent(val){
            kefu({ total: this.total, pagesize: this.pagesize, page: val }).then(res => {
                this.staff = res.data.totalpagedata;
                this.total = res.data.total;
            })
        }
    },
    created(){
        kefu({ total: this.total, pagesize: this.pagesize, page: 1 }).then(res => {
            this.staff = res.data.totalpagedata;
            this.total = res.data.total;
        })
    }
}
</script>

<style scoped>
.kefu{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: auto;
}
.pages {
    margin-top: 20px;
    text-align: center;
    position: absolute;
    bottom: 180px;
    align-self: center;
    /* BUG点 当页数超过长时 */
    align-self: auto;
}
</style>