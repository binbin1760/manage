<template>
<div class="orderdata">
    <EchartTableVue :optiondata="optiondata"></EchartTableVue>
    <div class="show-data">
        <el-tag :color="this.optiondata.color[0]" 
         hit class="tag-class"
         >{{this.optiondata.data[0]}}:{{this.alldata}}</el-tag>
        <el-tag :color="this.optiondata.color[1]" 
         hit class="tag-class"
         >{{this.optiondata.data[1]}}:{{this.alldata2}}</el-tag>
    </div>
</div>
</template>

<script>
/*
optiondata:{
    柱状图色彩：color[];
    柱状图名称：title:""
    柱状图提示：data:[]
    X轴数据:xdata:[]
    Y轴数据:ydata:[]
    数据集：seriesdata:[]
}
*/
import EchartTableVue from '@/components/EchartTable.vue';
export default {
    data() {
        return {
          optiondata:{
            color:['#5470c6','#91cc75'],
            title:"订单数据统计图",
            data:["肥料","家电"],
            xdata:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
            ydata:{
                name:"销售量",
                type:"value",
                position:"left",
                axisLine:{
                    show:true,
                    linestyle:{
                        color:"#5470c6"
                    }
                }
            },
            seriesdata:[
                {
                    name:"肥料",
                    type:'bar',
                    data:[53,50,33,44,66,77,88,99,66,22,33,44]
                },
                {
                    name:"家电",
                    type:'bar',
                    data:[60,55,33,44,88,4,8,55,22,34,56,61]
                }
            ]
          }
        }
    },
    computed:{
        alldata(){
            let a=this.optiondata.seriesdata[0].data.reduce(function(v1,v2){
                return v1+v2
            },0)
            return  a
        },
        alldata2(){
            let a=this.optiondata.seriesdata[1].data.reduce(function(v1,v2){
                return v1+v2
            },0)
            return  a
        },
    },
    components:{
        EchartTableVue
    },
    methods:{
  
    }
}
</script>

<style scoped>
.orderdata{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.show-data{
    display: flex;
    width: 100%;
    align-self: center;
    justify-content: space-around;
    flex-wrap: wrap;
}
.orderdata .show-data .tag-class{
    width: 100px;
    height: 40px;
    font-size: larger;
    line-height: 40px;
    color: black;
    font-weight: 500;
    
}
</style>