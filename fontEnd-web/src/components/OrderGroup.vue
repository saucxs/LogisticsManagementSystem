<template>
  <el-row :gutter="40" class="panel-group" :allData="allData">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="go('order')">
        <svg class="card-panel-icon icon-message" aria-hidden="true">
          <use xlink:href="#icondingdan"></use>
        </svg>
        <div class="card-panel-description">
          <div class="card-panel-text">
            所有订单
          </div>
          <count-to :start-val="0" :end-val="allData.allOrderNumber" :duration="1800" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="go('order')">
        <svg class="card-panel-icon icon-money" aria-hidden="true">
          <use xlink:href="#icondingdan-ing"></use>
        </svg>
        <div class="card-panel-description">
          <div class="card-panel-text">
            生成任务单
          </div>
          <count-to :start-val="0" :end-val="allData.transportOrder" :duration="1200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="go('order')">
        <svg class="card-panel-icon icon-money" aria-hidden="true">
          <use xlink:href="#icondingdan-ing"></use>
        </svg>
        <div class="card-panel-description">
          <div class="card-panel-text">
            待发货
          </div>
          <count-to :start-val="0" :end-val="allData.ingOrder" :duration="1200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="go('order')">
        <svg class="card-panel-icon icon-money" aria-hidden="true">
          <use xlink:href="#icondingdan-ing"></use>
        </svg>
        <div class="card-panel-description">
          <div class="card-panel-text">
            已发货
          </div>
          <count-to :start-val="0" :end-val="allData.alreadyOrder" :duration="1200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="go('order')">
        <svg class="card-panel-icon icon-shopping" aria-hidden="true">
          <use xlink:href="#icondingdan-end"></use>
        </svg>
        <div class="card-panel-description">
          <div class="card-panel-text">
            结束订单
          </div>
          <count-to :start-val="0" :end-val="allData.endOrder" :duration="800" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="go('order')">
        <svg class="card-panel-icon icon-shopping" aria-hidden="true">
          <use xlink:href="#icondingdan-reject"></use>
        </svg>
        <div class="card-panel-description">
          <div class="card-panel-text">
            退货订单
          </div>
          <count-to :start-val="0" :end-val="allData.rejectOrder" :duration="800" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="go('order')">
        <svg class="card-panel-icon icon-shopping" aria-hidden="true">
          <use xlink:href="#icondingdan-error"></use>
        </svg>
        <div class="card-panel-description">
          <div class="card-panel-text">
            错误订单
          </div>
          <count-to :start-val="0" :end-val="allData.errorOrder" :duration="800" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'

  export default {
    components: {
      CountTo
    },
    props: {
      allData: {
        type: Object,
        default: {}
      },
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      },
      go(type){
        if(type == 'person'){
          this.$router.push('/team')
        }
        if(type == 'order'){
          this.$router.push('/order')
        }
        if(type == 'store'){
          this.$router.push('/store')
        }
        if(type == 'car'){
          this.$router.push('/car')
        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .panel-group {
    margin-top: 18px;
  & .card-panel-col{
      margin-bottom: 32px;
    }
  & .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      justify-content: space-around;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #eee;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
  & .card-panel-icon {
      width: 60px;
      padding: 0px 8px;
      margin: 15px;
    }

  &:hover {
  & .card-panel-icon-wrapper {
      color: #fff;
    }
  & .icon-people {
      border-radius: 20px;
      /*background: #40c9c6;*/
      background: #ffffff;
    }
  & .icon-message {
      border-radius: 20px;
      /*background: #36a3f7;*/
      background: #ffffff;
    }
  & .icon-money {
      border-radius: 20px;
      /*background: #f4516c;*/
      background: #ffffff;
    }
  & .icon-shopping {
      border-radius: 20px;
      background: #ffffff;
      /*background: #34bfa3*/
    }
  }
  & .icon-people {
      color: #40c9c6;
    }
  & .icon-message {
      color: #36a3f7;
    }
  & .icon-money {
      color: #f4516c;
    }
  & .icon-shopping {
      color: #34bfa3
    }
  & .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
  & .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
  & .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 12px;
    }
  & .card-panel-num {
      font-size: 20px;
    }
  }
  }
  }
</style>
