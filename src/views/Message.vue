<template>
  <div class="home">
    <div class="task-title">公告通知</div>
    <div class="home-table">
      <el-table ref="multipleTable"
        :data="tableData.filter(data => !search || data.task.toLowerCase().includes(search.toLowerCase()))"
        tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border stripe>
        <el-table-column type="index" width="55">
        </el-table-column>
        <el-table-column prop="date" label="日期">
          <!-- <template v-slot="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column prop="name" label="发布者">
        </el-table-column>
        <el-table-column prop="task" label="公告" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="请输入任务名称关键字" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
    <!-- 对话框 -->
    <el-dialog title="公告" 
    :visible.sync="dialogVisible" 
    width="50%" 
    >
      <div class="task-content">
          {{taskcontent}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { task } from '@/api/getdata';
export default {
    data() {
        return {
            tableData: [],
            multipleSelection: [],
            search:"",
            total:0,//总页数
            pagesize:15,//每一页的容量
            dialogVisible: false,
            taskcontent:"1",
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleEdit(index, row) {
            this.dialogVisible=true
            this.taskcontent=this.tableData[index].content
        },
        // 分页----因为点击上一页 下一页 反正只要页码改变就会触发currentevent，所有直接把请求写在currentevent事件中即可
        // 页码改变时触发
        currentevent(val){
        task({total:this.total,pagesize:this.pagesize,page:val}).then(res=>{
            this.tableData=res.data.totalpagedata;
            this.total=res.data.total;
         })
        },
      //  对话框
      //   handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
    },
    // 模拟请求任务列表数据
    created(){
         task({total:this.total,pagesize:this.pagesize,page:1}).then(res=>{
            this.tableData=res.data.totalpagedata;
            this.total=res.data.total;
         })
    }
}
</script>

<style scoped>
  .home{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: auto;
  }
  .home .task-title{
    width: 400px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 24px;
    font-weight: 600;
    letter-spacing:10px;
    color: #414142;
    align-self: center;
  }
  .pages{
    margin-top: 20px;
    text-align: center;
    position: absolute;
    bottom:180px;
    right: 50%;
  }
  .task-content{
    height: 600px;
    color: #F56C6C;
  }
</style>