<template>
    <div class="addorder">
        <el-form ref="form" :model="order" label-width="80px" class="form">
            <!-- input -->
            <div class="form-input">
                <el-form-item label="商品名称">
                    <el-input v-model="order.order"></el-input>
                </el-form-item>
                <el-form-item label="订单ID">
                    <el-input v-model="order.orderid"></el-input>
                </el-form-item>
                <el-form-item label="下单用户">
                    <el-input v-model="order.user"></el-input>
                </el-form-item>
            </div>
            <!-- radio 订单状态-->
            <div class="from-select-state">
                <el-form-item label="订单状态">
                    <el-radio-group v-model="order.orderstate">
                        <el-radio label="完成"></el-radio>
                        <el-radio label="未完成"></el-radio>
                        <el-radio label="待定"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <!-- 下单时间 -->
            <div class="form-ordertime">
                <el-form-item label="活动时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="order.ordertime" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </div>
            <!-- textarea -->
            <el-form-item label="订单备注">
                <el-input type="textarea" v-model="order.ordernotes" :autosize="{minRows:5,maxRow:10}"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div> 
</template>

<script>

export default {
    data() {
        return {
            order:{
                orderid:"",//订单id
                ordertime:"",//下单时间
                order:"",//订单名称
                user:"",//用户
                ordernotes:"",//订单备注
                orderstate:[],//订单状态
            },
        }
    },
    methods: {
        onSubmit() {
        console.log(this.order);
      }
    },
}
</script>

<style scoped>
.addorder {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}
.form{
    width: 600px;
    margin-top: 80px;
}
.form .form-input{
    width: 400px;
}
.form .from-select-state{
    width: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.form .form-ordertime{
    width: 400px;
}
</style>