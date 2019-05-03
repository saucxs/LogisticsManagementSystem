<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getDay } from '@/utils/common'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ allOrder, transportOrder, ingOrder, endOrder,alreadyOrder } = {}) {
      this.chart.setOption({
        xAxis: {
          data: [ getDay(-6),  getDay(-5),  getDay(-4),  getDay(-3),  getDay(-2),  getDay(-1), getDay(0)],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['所有订单','生成运输单', '待发货', '已发货','结束']
        },
        series: [{
          name: '所有订单', itemStyle: {
            normal: {
              color: '#67C23A',
              lineStyle: {
                color: '#67C23A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: allOrder,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '待发货',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: ingOrder,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
          {
            name: '生成运输单',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#5511ee',
                lineStyle: {
                  color: '#5511ee',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: transportOrder,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: '已发货',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#E6A23C',
                lineStyle: {
                  color: '#E6A23C',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: alreadyOrder,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: '结束', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
            smooth: true,
            type: 'line',
            data: endOrder,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
