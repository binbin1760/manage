<template>
  <div class="orderlist">
    <!-- 主表单 -->
    <div class="orderdata">
      <el-table ref="multipleTable"
        :data="Orderdata.filter(data => !search || data.orderid.toLowerCase().includes(search.toLowerCase()))"
        tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border stripe>
        <el-table-column label="详情" align="center" width="50">
          <template slot-scope="scope">
            <i class="el-icon-tickets"  @click="details(scope.$index, scope.row)"  style="cursor: pointer;"></i>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center"  width="55">
        </el-table-column>
        <el-table-column prop="date" label="下单日期" align="center"   width="120">
          <!-- <template v-slot="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column prop="state" label="订单状态" align="center"  width="120">
        </el-table-column>
        <el-table-column prop="user" label="客户" width="65" align="center" >
        </el-table-column>
        <el-table-column prop="order" label="订单" width="250" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="orderid" label="订单编号" width="170" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="订单地址" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="请输入需要查询的订单编号" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pages">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize"
        @current-change="currentevent">
      </el-pagination>
    </div>
    <!-- 订单编辑区域 -->
    <el-dialog title="编辑订单" :visible.sync="dialogVisible" width="50%">
      <div class="edit-order">
        <!-- 订单状态 -->
        <span>订单状态</span><br>
        <el-radio-group v-model="temp">
          <el-radio label="完成"></el-radio>
          <el-radio label="未完成"></el-radio>
          <el-radio label="待定"></el-radio>
        </el-radio-group>
        <!-- 订单备注 -->
        <span>订单备注</span>
        <el-input type="textarea" v-model="temp2" :autosize="{minRows:5,maxRow:10}">{{temp2}}</el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情框 -->
      <DetailsVue v-show="showis">
          <template slot="showdata">
            <div>订单详情</div>
          </template>
      </DetailsVue>   
  </div>
</template>

<script>
import { orderdata } from '@/api/getdata';
import DetailsVue from '@/components/Details.vue';
export default {
    data() {
        return {
            Orderdata: [],
            multipleSelection: [],
            search:"",
            total:0,//总页数
            pagesize:15,//每一页的容量
            dialogVisible:false,
            // -----以下为中专变量------
            temp:"",// 订单状态
            temp2:"",//订单备注
            showis:false
        }
    },
    components:{
      DetailsVue
    },
    methods:{
       handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 编辑
        handleEdit(index, row) {
            this.dialogVisible=true
            this.temp=this.Orderdata[index].state
            this.temp2=this.Orderdata[index].ordernotes
        },
        // 分页
      currentevent(val) {
        orderdata({ total: this.total, pagesize: this.pagesize, page: val }).then(res => {
          this.Orderdata = res.data.totalpagedata;
          this.total = res.data.total;
        })
        },
        // 详情
        details(index, row){
          console.log(index, row);
          this.showis=!this.showis
        }
    },
    created(){
      orderdata({total:this.total,pagesize:this.pagesize,page:1}).then(res=>{
        this.Orderdata=res.data.totalpagedata;
        this.total=res.data.total;
      })
    }
}
</script>

<style scoped>
  .orderlist{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
 .pages{
    margin-top: 20px;
    text-align: center;
    position: absolute;
    bottom: 180px;
    right: 50%;
  }
  .edit-order{
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 600px;
  }
  .edit-order span{
   margin-bottom: 10px; 
   margin-top: 10px;
  }
</style>