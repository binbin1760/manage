<template>
    <div id="echarts">

    </div>
</template>
<script>
/*
参数说明
optiondata:{
    柱状图色彩：color[];
    柱状图名称：title:""
    柱状图提示：data:[]
    X轴数据:xdata:[]
    Y轴数据:ydata:[]
    数据集：seriesdata:[]
}
*/
export default {
    data() {
        return {
            
        }
    },props:['optiondata'],
    methods:{
        drawcharts(){
            let Mychart=this.$echarts.init(document.getElementById('echarts'))
            Mychart.setOption({
                color:this.optiondata.color,
                title:{
                    text:this.optiondata.title  //表格名称
                },
                tooltip:{
                    trigger:"axis"
                },
                legend:{
                    data:this.optiondata.data
                },
                toolbox:{
                    show:true,
                    feature:{
                        dataView:{
                            readOnly:false
                        },
                        restore:{  },
                        dataZoom:{
                            yAxisIndex:'none'
                        },
                        magicType:{
                            type:["bar","line"]
                        }
                    }
                },
                xAxis:{
                    data:this.optiondata.xdata,  //X轴数据["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
                },
                yAxis:this.optiondata.ydata,//Y轴数据
                series:this.optiondata.seriesdata
            })
        }
    },
    mounted(){
         this.drawcharts()
    },
    created(){
        
    }
}
</script>

<style scoped>
    #echarts{
        width:100%;
        height: 60%;
    }
</style>