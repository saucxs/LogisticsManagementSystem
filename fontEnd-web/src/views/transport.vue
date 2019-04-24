<template>
  <div class="transport-list">
    <div class="title">运输任务管理</div>
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
          <el-button type="primary" @click="operatorOrder('add')">添加运输任务</el-button>
        </div>
      </el-col>
    </el-row>
    <p class="tip-p">提醒：可以根据运输单ID，订单ID，汽车编号，模糊查询</p>
    <el-table
      :data="transportTableData"
      border
      style="width: 100%">
      <el-table-column
        prop="transport_id"
        label="任务ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="transport_state"
        label="任务状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="transport_time"
        label="任务时间">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="订单ID"
        width="70">
      </el-table-column>
      <el-table-column
        prop="transport_path"
        label="线路"
        width="120">
      </el-table-column>
      <el-table-column
        prop="car_code"
        label="车辆编号"
        width="140">
      </el-table-column>
      <el-table-column
        prop="car_driver"
        label="司机"
        width="140">
      </el-table-column>
      <el-table-column
        prop="car_escort"
        label="押运员"
        width="140">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="operatorOrder('edit',scope.row)" type="success" size="small">修改</el-button>
          <el-button @click="deleteOrderItem(scope.row)" type="danger" size="small">删除</el-button>
        </template>
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
        loadingFlag: false
      }
    },
    created(){
      this.transportList(1,10);
    },
    computed: {
      ...mapGetters([
        "userInfo"
      ])
    },
    methods: {
      ...mapActions([
        "getTransportList",
        "addOrder",
        "deleteOrder"
      ]),
      handleCurrentChange(currentPage) {
        this.transportList(currentPage,10)
      },
      search(){
        this.transportList(1,10);
      },
      clear(){
        this.transportList(1,10);
      },
      handleClose(){
        this.confirmCreateVisiable = false;
        this.formOrder = {};
        this.transportList(1,10);
      },
      transportList(currentPage, pageSize){
        let params = {
          operator_role: this.userInfo.role,
          searchContent: this.searchContent,
          currentPage: currentPage,
          pageSize: pageSize
        }
        this.getTransportList(params).then(res => {
          if(res.success){
            this.transportTableData = res.data.transportList;
            this.transportListTotal = res.data.total;
            this.currentPage = currentPage
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
        console.log(item, 'item')
        let param = {
          order_id: item.order_id
        }
        this.deleteOrder(param).then(res => {
          console.log(res, 'res')
          if(res.success){
            this.$message.success(res.message);
            this.orderList(this.currentPage,10);
          }else{
            this.$message.warning(res.message|| '服务开小差');
          }
        })
      },
      successConfirm(type){
        if(!this.formOrder.order_name || !this.formOrder.order_goods || !this.formOrder.order_receiver_name || !this.formOrder.order_receiver_phone || !this.formOrder.order_receiver_address || !this.formOrder.remark){
          this.$message.warning('请输入相应内容')
        }else{
          this.formOrder.type = type;
          this.formOrder.order_time = (new Date()).getTime();
          this.formOrder.operator_name = this.userInfo.name;
          this.formOrder.operator_role = this.userInfo.role;
          console.log(this.formOrder, '-=---------------------------------===========')
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
