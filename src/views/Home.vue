<template>
    <div class="home">
        <EchartTableVue :optiondata="optiondata"></EchartTableVue>
        <div class="home-data">
            <div class="home-data-one">
                <el-tag :color="this.optiondata.color[1]" hit class="tagdata">
                    {{ this.optiondata.data[1] }}:{{ this.ordersum }}单</el-tag>
                <el-tag :color="this.optiondata.color[0]" hit class="tagdata">
                    {{ this.optiondata.data[0] }}:{{ this.allstaff }}位</el-tag>
                <el-tag color="pink" hit class="tagdata">每人年均:{{ (this.staffeff)}}单</el-tag>
            </div>
            <div class="home-data-one">
                <el-tag :color="this.optiondata.color[1]" hit class="tagdata">
                    月均:{{ (this.ordersum / 12).toFixed(0) }}单</el-tag>
                <el-tag :color="this.optiondata.color[0]" hit class="tagdata">
                    稳定员工:{{ (this.allstaff / 12).toFixed(0) }}位</el-tag>
                <el-tag color="pink" hit class="tagdata">每人月均:{{ this.monstaffeff }}单</el-tag>
            </div>
            <div class="home-data-one">
                <el-tag :color="this.optiondata.color[1]" hit class="tagdata">
                    年利润:{{this.ordersum*15}}元</el-tag>
                <el-tag :color="this.optiondata.color[0]" hit class="tagdata">
                    月利润:{{ (this.ordersum / 12).toFixed(0)*15}}元</el-tag>
                <el-tag color="pink" hit class="tagdata">利润率:{{(this.monstaffeff*0.002).toFixed(2)}}</el-tag>
            </div>
        </div>
    </div>
</template>

<script>
import EchartTableVue from '../components/EchartTable.vue'
export default {
    data() {
        return {
            optiondata: {
                color: ['#5470c6', '#91cc75'],
                title: "订单数据统计图",
                data: ["员工", "订单"],
                xdata: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                ydata: {
                    name: "数量/位（个）",
                    type: "value",
                    position: "left",
                    axisLine: {
                        show: true,
                        linestyle: {
                            color: "#5470c6"
                        }
                    }
                },
                seriesdata: [
                    {
                        name: "员工",
                        type: 'bar',
                        data: [53, 50, 33, 44, 66, 77, 88, 99, 66, 22, 33, 44]
                    },
                    {
                        name: "订单",
                        type: 'bar',
                        data: [6030, 5504, 3360, 4440, 8850, 4780, 8220, 5540, 2230, 3440, 5650, 6107]
                    },
                ]
            }
        }
    },
    computed:{
        ordersum(){
            let a=this.optiondata.seriesdata[1].data.reduce(function(v1,v2){
                return v1+v2
            },0)
            return a
        },
        allstaff() {
            let a = this.optiondata.seriesdata[0].data.reduce(function (v1, v2) {
                return v1 + v2
            }, 0)
            return a
        },
        staffeff(){
            let num=this.ordersum/this.allstaff
            return num.toFixed(2)
        },
        monstaffeff(){
            let a=(this.ordersum/12).toFixed(0)
            let b=(this.allstaff/12).toFixed(0)
            let c=(a/b).toFixed(2)
            return c
        }
    },
    components: {
        EchartTableVue
    }
}
</script>

<style scoped>
.home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.home-data{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

}
.tagdata {
    width: 180px;
    height: 40px;
    font-size: larger;
    line-height: 40px;
    color: black;
    font-weight: 500;
    text-align: center;
    overflow: hidden;
}
.home-data  .home-data-one{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    margin-top: 10px;
}
</style>