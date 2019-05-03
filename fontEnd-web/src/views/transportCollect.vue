<template>
  <div class="write-weekly">
    <div class="title">运输单统计</div>
    <transport-group :allData="allData"/>
    <el-row>
      <el-col :span="14">
        <!--线形图-->
        <div class="title">最近一周运输单数量</div>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <line-transport :chart-data="lineChartData"/>
        </el-row>
      </el-col>
      <el-col :span="10">
        <div class="title">运输单状态分布</div>
        <div id="echartss" style="height: 350px;width: 95%;"></div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import TransportGroup from '../components/TransportGroup'
  import LineTransport from '../components/LineTransport'
  import echarts from 'echarts'
  import {filterOrder,filteTransport,filteTeam,filteCar} from '../utils/common'
  export default {
    components: {
      TransportGroup,
      LineTransport,
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
        dataListTransport: [],
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
        "categoryTransport"
      ]),
      transportStateFilter(val){
        return filteTransport(val);
      },
      roleFilter(val) {
        return filteTeam(val);
      },
      carStateFilter(val){
        return filteCar(val);
      },
      orderStateFilter(val){
       return filterOrder(val)
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
        this.categoryTransport(params).then(res => {
          if(res.success){
            this.dataListTransport = res.data.transportNumber.map((item) => {
              return {
                name: this.transportStateFilter(item.transport_state),
                value: item.transportNumber
              }
            })
            res.data.transport0=0,res.data.transport1=0,res.data.transport2=0,res.data.transport3=0,res.data.transport4=0,res.data.transport5=0;
           for(let i=0,length=res.data.transportNumber.length;i<length;i++){
             if(res.data.transportNumber[i].transport_state === 0){res.data.transport0=res.data.transportNumber[i].transportNumber};
             if(res.data.transportNumber[i].transport_state === 1){res.data.transport1=res.data.transportNumber[i].transportNumber};
             if(res.data.transportNumber[i].transport_state === 2){res.data.transport2=res.data.transportNumber[i].transportNumber};
             if(res.data.transportNumber[i].transport_state === 3){res.data.transport3=res.data.transportNumber[i].transportNumber};
             if(res.data.transportNumber[i].transport_state === 4){res.data.transport4=res.data.transportNumber[i].transportNumber}
             if(res.data.transportNumber[i].transport_state === 5){res.data.transport5=res.data.transportNumber[i].transportNumber}
           }
            let myChart = echarts.init(document.getElementById('echartss'));
            this.drawPhoto(myChart, this.dataListTransport);
            this.lineChartData = {
              allTransport: res.data.categoryAllTransportNumber,
              transport0: res.data.categoryTransport0Number,
              transport1: res.data.categoryTransport1Number,
              transport2: res.data.categoryTransport2Number,
              transport3: res.data.categoryTransport3Number,
              transport4: res.data.categoryTransport4Number,
              transport5: res.data.categoryTransport5Number,
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
