<template>
  <div class="write-weekly">
    <div class="title">订单统计</div>
    <order-group :category="personCategory" :allData="allData"/>
    <el-row>
      <el-col :span="14">
        <!--线形图-->
        <div class="title">最近一周订单数量</div>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <line-chart :chart-data="lineChartData"/>
        </el-row>
      </el-col>
      <el-col :span="10">
        <div class="title">订单状态分布</div>
        <div id="echartss" style="height: 350px;width: 95%;"></div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import OrderGroup from '../components/OrderGroup'
  import LineChart from '../components/LineChart'
  import echarts from 'echarts'

  export default {
    components: {
      OrderGroup,
      LineChart,
    },
    data(){
      return {
        weeklyContent: '',
        currentDate: new Date().toLocaleDateString(),
        allData: {},
        personCategory: {
          'all': '所有人员',
          'store': '仓库管理员',
          'car': '汽车',
          'escort': '押运员',
          'common': '用户'
        },
        orderCategory: {
          'all': '所有订单',
          'ing': '进行',
          'end': '结束',
          'reject': '退货',
          'error': '错误'
        },
        dataList: [],
        dataListCar: [],
        dataListOrder: [],
        lineChartData: {}
      }
    },
    created(){

    },
    mounted() {
      this.queryCategoryData();
    },
    computed: {
      ...mapGetters([
        "userInfo"
      ])
    },
    methods: {
      ...mapActions([
        "getUserInfo",
        "categoryOrder"
      ]),
      roleFilter(val) {
        if (val === 1) return '管理员'
        if (val === 2) return '仓库管理员'
        if (val === 3) return '司机'
        if (val === 4) return '押运员'
        if (val === 5) return '用户'
        else return '-'
      },
      carStateFilter(val){
        if(val === 1) return '正常'
        if(val === 2) return '维修'
        if(val === 3) return '报废'
        else return '-'
      },
      orderStateFilter(val){
        if(val === 1) return '待发货'
        if(val === 2) return '结束'
        if(val === 3) return '退货'
        if(val === 4) return '错误'
        if(val === 5) return '已发货'
        else return '-'
      },
      drawPhoto(myChart, data){
        // 基于准备好的dom，初始化echarts实例
        // let myChart = echarts.init(document.getElementById('echartss'))
        myChart.setOption({
          tooltip: {
            trigger:'item',
            formatter: "{a} <br/>{b}: {c} <br/> ({d}%)"
          },
          series : [
            {
              name:'订单状态分布',
              type: 'pie',
              radius : '80%',
              center: ['52%', '53%'],
              avoidLabelOverlap: false,
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 5,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
              }
            }
          ]
        })
      },
      queryCategoryData(){
        let params = {
          name: this.userInfo.name,
          role: this.userInfo.role
        }
        this.categoryOrder(params).then(res => {
          if(res.success){
            this.dataListOrder = res.data.orderNumber.map((item) => {
              return {
                name: this.orderStateFilter(item.order_status),
                value: item.orderNumber
              }
            })
            res.data.ingOrder=0,res.data.alreadyOrder=0,res.data.endOrder=0,res.data.rejectOrder=0,res.data.errorOrder=0;
           for(let i=0,length=res.data.orderNumber.length;i<length;i++){
             if(res.data.orderNumber[i].order_status === 1){res.data.ingOrder=res.data.orderNumber[i].orderNumber};
             if(res.data.orderNumber[i].order_status === 5){res.data.alreadyOrder=res.data.orderNumber[i].orderNumber};
             if(res.data.orderNumber[i].order_status === 2){res.data.endOrder=res.data.orderNumber[i].orderNumber};
             if(res.data.orderNumber[i].order_status === 3){res.data.rejectOrder=res.data.orderNumber[i].orderNumber};
             if(res.data.orderNumber[i].order_status === 4){res.data.errorOrder=res.data.orderNumber[i].orderNumber}
           }
            let myChart = echarts.init(document.getElementById('echartss'));
            this.drawPhoto(myChart, this.dataListOrder);
            this.lineChartData = {
              allOrder: res.data.categoryAllOrderNumber,
              endOrder: res.data.categoryEndOrderNumber,
              ingOrder: res.data.categoryIngOrderNumber,
              alreadyOrder: res.data.categoryAlreadyOrderNumber
            };
            this.allData = res.data;
          }
        })
      },
      // 图表初始化数据
      initChart(){
        let myChart = echarts.init(this.$refs.myEchart);
        myChart.setOption({
          backgroundColor: '#eee',
          title: {
            text: '订单状态分布图',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#000'
            }
          },
          tooltip: {
            trigger:'item',
            formatter: "{a} <br/>{b}: {c} <br/> ({d}%)"
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series : [
            {
              name:'订单状态分布图',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              stack: 'creator',
              avoidLabelOverlap: false,
              data: this.dataList,
              itemStyle: {
                emphasis: {
                  shadowBlur: 5,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
              }
            }
          ]
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .write-weekly{

  }
</style>
