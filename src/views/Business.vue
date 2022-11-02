<template>
    <div class="business">
        <el-table ref="multipleTable"
            :data="business.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border stripe>
            <el-table-column type="index" width="55">
            </el-table-column>
            <el-table-column prop="date" label="开始时间">
                <!-- <template v-slot="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="user" label="负责人">
            </el-table-column>
            <el-table-column prop="name" label="项目名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="achievement" label="业绩" show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="240" align="right">
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
import { business } from "../api/getdata"
export default {
    data() {
        return {
            business: [],
            multipleSelection: [],
            search: "",
            total: 0,
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
            business({ total: this.total, pagesize: this.pagesize, page: val }).then(res => {
                this.business = res.data.totalpagedata;
                this.total = res.data.total;
            })
        }
    },
    created() {
        business({ total: this.total, pagesize: this.pagesize, page: 1 }).then(res => {
            this.business = res.data.totalpagedata;
            this.total = res.data.total;
        })
    }
}
</script>

<style scoped>
.business{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
}
  .pages{
    margin-top: 20px;
    text-align: center;
    position: absolute;
    bottom:180px;
    right: 50%;
  }
</style>