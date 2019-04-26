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
        label="任务状态"
        width="80">
        <template slot-scope="scope">
          {{scope.row.transport_state | transportStateFilter}}
        </template>
      </el-table-column>
      <el-table-column
        prop="transport_time"
        label="任务时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="订单ID"
        width="110">
      </el-table-column>
      <el-table-column
        prop="transport_path"
        label="线路">
      </el-table-column>
      <el-table-column
        prop="car_code"
        label="车辆编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="car_driver"
        label="司机"
        width="100">
      </el-table-column>
      <el-table-column
        prop="car_escort"
        label="押运员"
        width="100">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="100">
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
    <!--dialog-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="confirmCreateVisiable"
      :before-close="handleClose"
      width="600px"
      center>
      <div>
        <el-form label-position="right" label-width="90px" :model="formTransport">
          <el-form-item label="订单名称">
            <el-select :disabled="dialogTitle == '修改运输单'" v-model="formTransport.order_id" filterable placeholder="请选择订单名称">
              <el-option
                v-for="item in orderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单ID：">
            <span>{{formTransport.order_id}}</span>
          </el-form-item>
          <el-form-item label="运输状态：" v-if="dialogTitle == '修改运输单'">
            <el-radio :disabled="disableNum>1" v-model="formTransport.transport_state" label="1">装车中</el-radio>
            <el-radio :disabled="disableNum>2" v-model="formTransport.transport_state" label="2">发车</el-radio>
            <el-radio :disabled="disableNum>3" v-model="formTransport.transport_state" label="3">运输中</el-radio>
            <el-radio :disabled="disableNum>4" v-model="formTransport.transport_state" label="4">收货</el-radio>
            <el-radio :disabled="disableNum>5" v-model="formTransport.transport_state" label="5">返回</el-radio>
          </el-form-item>
          <el-form-item label="运输单路线">
            <el-input type="textarea" :rows="2" v-model="formTransport.transport_path" maxlength="60"></el-input>
          </el-form-item>
          <el-form-item label="汽车编码">
            <el-select v-model="formTransport.car_code" filterable placeholder="请选择汽车名称">
              <el-option
                v-for="item in carOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!--<el-input v-model="formTransport.car_code" maxlength="10"></el-input>-->
          </el-form-item>
          <el-form-item label="司机">
            <el-input v-model="formTransport.car_driver" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="押运员">
            <el-input v-model="formTransport.car_escort" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formTransport.remark" maxlength="30"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button v-if="dialogTitle == '添加运输单'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
          <el-button v-if="dialogTitle == '修改运输单'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
        </span>
    </el-dialog>
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
        disableNum: 1
      }
    },
    filters: {
      transportStateFilter(val){
        if(val === 1) return '装车中'
        if(val === 2) return '发车'
        if(val === 3) return '运输中'
        if(val === 4) return '收货'
        if(val === 5) return '返回'
        else return '-'
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
        "addTransport",
        "deleteTransport",
        "getOrderListMap",
        "getCarListMap"
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
        this.formTransport = {};
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
      operatorOrder(type, item){
        this.getOrderListSelect();
        this.getCarListSelect();
        if(type == 'add'){
          this.dialogTitle = '添加运输单';
          this.confirmCreateVisiable = true;
        }else if(type == 'edit'){
          console.log(item, '-=-=-=-=-=-=-=-=-=')
          this.dialogTitle = '修改运输单';
          this.confirmCreateVisiable = true;
          this.disableNum = Number(item.transport_state);
          item.transport_state = item.transport_state + '';
          this.formTransport = item;
        }
      },
      deleteOrderItem(item){
        console.log(item, 'item')
        let param = {
          transport_id: item.transport_id
        }
        this.deleteTransport(param).then(res => {
          console.log(res, 'res')
          if(res.success){
            this.$message.success(res.message);
            this.transportList(this.currentPage,10);
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
          console.log(this.formTransport, '-=---------------------------------===========')
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
