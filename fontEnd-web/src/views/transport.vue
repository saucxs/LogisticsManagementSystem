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
        prop="order_id"
        label="订单ID"
        width="115">
      </el-table-column>
      <el-table-column
        prop="transport_path"
        label="线路">
      </el-table-column>
      <el-table-column
        prop="store_code"
        label="仓库编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="car_code"
        label="车辆编号"
        width="100">
      </el-table-column>
      <el-table-column
        label="司机"
        width="70">
        <template slot-scope="scope">
          {{scope.row.car_driver}}
        </template>
      </el-table-column>
      <el-table-column
        prop="car_escort"
        label="押运员"
        width="80">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="operatorOrder('edit',scope.row)" type="success" size="small">修改</el-button>
          <el-button :disabled="userInfo.role !== 1" @click="deleteOrderItem(scope.row)" type="danger" size="small">删除</el-button>
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
      width="700px"
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
            <el-radio :disabled="disableNum>0" v-model="formTransport.transport_state" label="0">拣货中</el-radio>
            <el-radio :disabled="disableNum>1" v-model="formTransport.transport_state" label="1">装车中</el-radio>
            <el-radio :disabled="disableNum>2" v-model="formTransport.transport_state" label="2">发车</el-radio>
            <el-radio :disabled="disableNum>3" v-model="formTransport.transport_state" label="3">运输中</el-radio>
            <el-radio :disabled="disableNum>4" v-model="formTransport.transport_state" label="4">收货</el-radio>
            <el-radio :disabled="disableNum>5" v-model="formTransport.transport_state" label="5">返回</el-radio>
          </el-form-item>
          <el-form-item label="运输单路线">
            <el-input type="textarea" :rows="2" v-model="formTransport.transport_path" maxlength="60"></el-input>
          </el-form-item>
          <el-form-item label="取货仓库">
            <el-select v-model="formTransport.store_code" filterable placeholder="请选择仓库">
              <el-option
                v-for="item in storeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!--<el-input v-model="formTransport.car_code" maxlength="10"></el-input>-->
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
            <el-select v-model="formTransport.car_driver" filterable placeholder="请选择汽车名称">
              <el-option
                v-for="item in teamOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!--<el-input v-model="formTransport.car_driver" maxlength="10"></el-input>-->
          </el-form-item>
          <el-form-item label="押运员">
            <el-select v-model="formTransport.car_escort" filterable placeholder="请选择汽车名称">
              <el-option
                v-for="item in teamOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!--<el-input v-model="formTransport.car_escort" maxlength="10"></el-input>-->
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
  import {filteTransport} from '../utils/common'
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
          store_code: '',
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
        teamMap: [],
        storeOptions: []
      }
    },
    filters: {
      transportStateFilter(val){
        return filteTransport(val);
      },
      teamMapFilter(value){
        let result = this.teamMap[value]
        return result;
      },
    },
    mounted(){
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
        "getCarListMap",
        "getTeamListMap",
        "getStoreListMap"
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
          operator_name: this.userInfo.name,
          searchContent: this.searchContent,
          currentPage: currentPage,
          pageSize: pageSize
        }
        this.getTransportList(params).then(res => {
          if(res.success){
            this.transportTableData = res.data.transportList;
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
      getStoreListSelect(){
        this.getStoreListMap({operator_role: this.userInfo.role}).then(res => {
          if(res.success){
            this.storeOptions = res.data.storeListMap.map(item => {
              return {
                value: item.store_code,
                label: item.store_name
              }
            })
          }
        })
      },
      operatorOrder(type, item){
        this.getOrderListSelect();
        this.getCarListSelect();
        this.getTeamListSelect();
        this.getStoreListSelect();
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
