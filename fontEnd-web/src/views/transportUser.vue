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
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="button-style">
          <el-button type="primary" @click="operatorOrder('add')">添加订单</el-button>
        </div>
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
    <!--dialog-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="confirmCreateVisiable"
      :before-close="handleClose"
      width="600px"
      center>
      <div>
        <el-form label-position="right" label-width="90px" :model="formOrder">
          <el-form-item label="订单名称">
            <el-input v-model="formOrder.order_name" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item label="订单货物">
            <el-input type="textarea" :rows="2" v-model="formOrder.order_goods" maxlength="60"></el-input>
          </el-form-item>
          <!--<el-form-item label="收获人姓名">-->
            <!--<el-input v-model="formOrder.order_receiver_name" maxlength="10"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="收获人手机">
            <el-input v-model="formOrder.order_receiver_phone" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="收获人地址">
            <el-input v-model="formOrder.order_receiver_address" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formOrder.remark" maxlength="30"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button v-if="dialogTitle == '添加订单'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
          <el-button v-if="dialogTitle == '修改订单'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
        </span>
    </el-dialog>
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
        formOrder: {
          order_name: '',
          order_goods: '',
          order_time: '',
          order_receiver_name: '',
          order_receiver_phone: '',
          order_receiver_address: '',
          operator_name: '',
          operator_role: '',
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
        "addOrder"
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
        if(type == 'add'){
          this.dialogTitle = '添加订单';
          this.confirmCreateVisiable = true;

        }else if(type == 'edit'){
          this.dialogTitle = '修改订单';
          this.confirmCreateVisiable = true;
          this.formOrder = item;
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
        this.formOrder.order_receiver_name = this.userInfo.name;
        if(!this.formOrder.order_name || !this.formOrder.order_goods || !this.formOrder.order_receiver_name || !this.formOrder.order_receiver_phone || !this.formOrder.order_receiver_address || !this.formOrder.remark){
          this.$message.warning('请输入相应内容')
        }else{
          this.formOrder.type = type;
          this.formOrder.order_time = (new Date()).getTime();
          this.formOrder.operator_name = this.userInfo.name;
          this.formOrder.operator_role = this.userInfo.role;
          this.addOrder(this.formOrder).then(res => {
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
