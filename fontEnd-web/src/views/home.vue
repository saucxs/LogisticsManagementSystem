<template>
  <div class="write-weekly">
    <div class="title">概览</div>
    <panel-group :category="personCategory" :allData="allData" @handleSetLineChartData="handleSetLineChartData" />
    <el-row>
      <el-col :span="12">
        <div class="title">人员角色分布</div>
        <div id="echartss" style="height: 350px;width: 95%;"></div>
      </el-col>
      <el-col :span="12">
        <div class="title">车辆状态分布</div>
        <div id="echart2" style="height: 350px;width: 95%;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import PanelGroup from '../components/PanelGroup'
  import echarts from 'echarts'
  export default {
    components: {
      PanelGroup,
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
        dataList:[],
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
        "categoryData"
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
              name:'人员分配',
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
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },
      queryCategoryData(){
        let params = {
          name: this.userInfo.name,
          role: this.userInfo.role
        }
        this.categoryData(params).then(res => {
          console.log(res, 'res')
          if(res.success){
            this.dataList = res.data.categoryPerson.map((item) => {
             return {
               name: this.roleFilter(item.role),
               value: item.roleValue
             }
            })
            this.dataListCar = res.data.categoryCar.map((item) => {
              return {
                name: this.carStateFilter(item.car_state),
                value: item.stateValue
              }
            })
            let myChart = echarts.init(document.getElementById('echartss'))
            let myChart2 = echarts.init(document.getElementById('echart2'))
            this.drawPhoto(myChart, this.dataList)
            this.drawPhoto(myChart2, this.dataListCar)
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
            text: '人员分布图',
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
              name:'人员分布图',
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
