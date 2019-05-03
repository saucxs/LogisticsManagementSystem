<template>
  <div class="transport-list">
    <div class="title">订单状态查询</div>
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-col :span="16">
          <el-input @clear="clear" placeholder="请输入内容" maxlength="20" v-model="searchContent" clearable class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search()">查询</el-button>
          </el-input>
        </el-col>
      </el-col>
    </el-row>
    <p class="tip-p">提醒：可以根据运订单ID，模糊查询</p>
    <el-table
      :data="transportTableData"
      border
      style="width: 100%">
      <el-table-column
        prop="order_id"
        label="订单ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="order_name"
        label="订单名称"
        width="110">
      </el-table-column>
      <el-table-column
        label="订单状态"
        width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.order_status === 1" class="success-color">{{scope.row.order_status | orderStateFilter}}</span>
          <span v-if="scope.row.order_status === 2" class="danger-color">{{scope.row.order_status | orderStateFilter}}</span>
          <span v-if="scope.row.order_status === 3" class="danger-color">{{scope.row.order_status | orderStateFilter}}</span>
          <span v-if="scope.row.order_status === 4" class="danger-color">{{scope.row.order_status | orderStateFilter}}</span>
          <span v-if="scope.row.order_status === 5" class="success-color">{{scope.row.order_status | orderStateFilter}}</span>
          <span v-if="scope.row.order_status === 6" class="success-color">{{scope.row.order_status | orderStateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_time"
        label="订单时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="order_receiver_phone"
        label="收货人手机号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="transport_id"
        label="任务ID"
        width="180">
      </el-table-column>
      <el-table-column
        label="任务状态"
        width="80">
        <template slot-scope="scope">
          <span class="common-color" v-if="scope.row.transport_state === 0">{{scope.row.transport_state | transportStateFilter}}</span>
          <span class="common-color" v-if="scope.row.transport_state === 1">{{scope.row.transport_state | transportStateFilter}}</span>
          <span class="danger-color" v-if="scope.row.transport_state === 2">{{scope.row.transport_state | transportStateFilter}}</span>
          <span class="warning-color" v-if="scope.row.transport_state === 3">{{scope.row.transport_state | transportStateFilter}}</span>
          <span class="info-color" v-if="scope.row.transport_state === 4">{{scope.row.transport_state | transportStateFilter}}</span>
          <span class="success-color" v-if="scope.row.transport_state === 5">{{scope.row.transport_state | transportStateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="transport_time"
        label="任务时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
    </el-table>
    <div class="pagination-box" v-if="transportTableData.length>0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, pager, next"
        :total="transportListTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import {filterOrder,filteTransport,filteTeam,filteCar} from '../utils/common'
  export default {
    data(){
      return {
        weeklyContent: '',
        currentDate: new Date().toLocaleDateString(),
        transportTableData: [],
        transportListTotal: 0,
        currentPage: 1,
        searchContent: '',
        dialogTitle: '',
        formTransport: {
          transport_state: '',
          transport_time:'',
          order_id: '',
          transport_path: '',
          car_code: '',
          car_driver: '',
          car_escort: '',
          operator_role: '',
          operator_name: '',
          remark: '',
        },
        confirmCreateVisiable: false,
        loadingFlag: false,
        orderOptions: [],
        carOptions: [],
        disableNum: 1,
        teamOptions: [],
        teamMap: []
      }
    },
    filters: {
      transportStateFilter(val){
       return filteTransport(val)
      },
      orderStateFilter(val){
        return filterOrder(val)
      },
      teamMapFilter(value){
        let result = this.teamMap[value]
        return result;
      },
    },
    mounted(){
      this.personalTransportList(1,10);
    },
    computed: {
      ...mapGetters([
        "userInfo"
      ])
    },
    methods: {
      ...mapActions([
        "getPersonalTransportList",
        "addTransport",
        "deleteTransport",
        "getOrderListMap",
        "getCarListMap",
        "getTeamListMap"
      ]),
      handleCurrentChange(currentPage) {
        this.personalTransportList(currentPage,10)
      },
      search(){
        this.personalTransportList(1,10);
      },
      clear(){
        this.personalTransportList(1,10);
      },
      handleClose(){
        this.confirmCreateVisiable = false;
        this.formTransport = {};
        this.personalTransportList(1,10);
      },
      personalTransportList(currentPage, pageSize){
        let params = {
          operator_role: this.userInfo.role,
          operator_name: this.userInfo.name,
          searchContent: this.searchContent,
          currentPage: currentPage,
          pageSize: pageSize
        }
        this.getPersonalTransportList(params).then(res => {
          if(res.success){
            this.transportTableData = res.data.teamList;
            this.transportListTotal = res.data.total;
            this.currentPage = currentPage;
          }
        })
      },
      getCarListSelect(){
        this.getCarListMap({operator_role: this.userInfo.role,}).then(res => {
          if(res.success){
            this.carOptions = res.data.carListMap.map(item => {
              return {
                value: item.car_code,
                label: item.car_name
              }
            })
          }
        })
      },
      getOrderListSelect(){
        this.getOrderListMap({operator_role: this.userInfo.role}).then(res => {
          if(res.success){
            this.orderOptions = res.data.orderListMap.map(item => {
              return {
                value: item.order_id,
                label: item.order_name
              }
            })
          }
        })
      },
      getTeamListSelect(){
        this.getTeamListMap({operator_role: this.userInfo.role}).then(res => {
          if(res.success){
            this.teamOptions = res.data.teamListMap.map(item => {
              return {
                value: item.name,
                label: item.name
              }
            })
          }
        })
      },
      operatorOrder(type, item){
        this.getOrderListSelect();
        this.getCarListSelect();
        this.getTeamListSelect();
        if(type == 'add'){
          this.dialogTitle = '添加运输单';
          this.confirmCreateVisiable = true;
        }else if(type == 'edit'){
          this.dialogTitle = '修改运输单';
          this.confirmCreateVisiable = true;
          this.disableNum = Number(item.transport_state);
          item.transport_state = item.transport_state + '';
          this.formTransport = item;
        }
      },
      deleteOrderItem(item){
        let param = {
          transport_id: item.transport_id
        }
        this.deleteTransport(param).then(res => {
          if(res.success){
            this.$message.success(res.message);
            this.personalTransportList(this.currentPage,10);
          }else{
            this.$message.warning(res.message|| '服务开小差');
          }
        })
      },
      successConfirm(type){
        if(!this.formTransport.order_id || !this.formTransport.transport_path || !this.formTransport.car_code || !this.formTransport.car_driver || !this.formTransport.car_escort || !this.formTransport.remark){
          this.$message.warning('请输入相应内容')
        }else{
          this.formTransport.type = type;
          // this.formTransport.transport_state;
          this.formTransport.transport_time = (new Date()).getTime();
          this.formTransport.operator_name = this.userInfo.name;
          this.formTransport.operator_role = this.userInfo.role;
          this.addTransport(this.formTransport).then(res => {
            if(res.success){
              this.$message.success(res.message);
              this.handleClose();
            }else{
              this.$message.warning(res.message|| '服务开小差');
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('服务器出错啦');
          });
        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .transport-list{
  & .button-style{
      text-align: right;
      margin-bottom: 10px;
    }
  }
</style>
