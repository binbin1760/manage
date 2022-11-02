<template>
  <div class="afterorder">
    <el-table ref="multipleTable"
      :data="Orderdata.filter(data => !search || data.orderid.toLowerCase().includes(search.toLowerCase()))"
      tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border stripe>
      <el-table-column type="index" width="55">
      </el-table-column>
      <el-table-column prop="date" label="下单日期" width="120">
        <!-- <template v-slot="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="user" label="客户" width="120">
      </el-table-column>
      <el-table-column prop="order" label="订单" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="orderid" label="订单编号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="订单地址" show-overflow-tooltip>
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
        <!-- 分页 -->
    <div class="pages">
      <el-pagination background
        layout="prev, pager, next" 
        :total="total"
        :page-size="pagesize"
        @current-change="currentevent"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { afterorder } from '@/api/getdata';
export default {
     data() {
        return {
            Orderdata: [],
            multipleSelection: [],
            search:"",
            total:0,
            pagesize:15,//每一页的容量
        }
    },
    methods:{
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
          afterorder({total:this.total,pagesize:this.pagesize,page:val}).then(res=>{
            this.Orderdata=res.data.totalpagedata;
            this.total=res.data.total;
         })
        }
    },
    created(){
      afterorder({total:this.total,pagesize:this.pagesize,page:1}).then(res=>{
           this.Orderdata=res.data.totalpagedata;
            this.total=res.data.total;
      })
    }
}
</script>

<style scoped>
  .afterorder{
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