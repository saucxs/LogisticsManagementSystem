<template>
  <div class="car-list">
    <div class="title">车辆管理</div>
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
          <el-button type="primary" @click="operatorCar('add')">添加车辆</el-button>
        </div>
      </el-col>
    </el-row>
    <p class="tip-p">提醒：可以根据车辆code，车辆名称，车辆责任人，模糊查询</p>
    <el-table
      :data="carTableData"
      border
      style="width: 100%">
      <el-table-column
        prop="car_code"
        label="车辆CODE"
        width="160">
      </el-table-column>
      <el-table-column
        prop="car_name"
        label="车辆名称">
      </el-table-column>
      <el-table-column
        prop="car_time"
        label="车辆时间"
        width="160">
      </el-table-column>
      <el-table-column
        label="车辆状态">
        <template slot-scope="scope">
          <span v-if="scope.row.car_state === 1" class="success-color"> {{scope.row.car_state | carStateFilter}}</span>
          <span v-if="scope.row.car_state === 2" class="danger-color"> {{scope.row.car_state | carStateFilter}}</span>
          <span v-if="scope.row.car_state === 3" class="danger-color"> {{scope.row.car_state | carStateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="car_person"
        label="车辆联系人"
        width="160">
      </el-table-column>
      <el-table-column
        prop="car_phone"
        label="联系人手机"
        width="160">
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
          <el-button @click="operatorCar('edit',scope.row)" type="success" size="small">修改</el-button>
          <el-button :disabled="userInfo.role !== 1" @click="deleteCarItem(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" v-if="carTableData.length>0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, pager, next"
        :total="carListTotal">
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
        <el-form label-position="right" label-width="90px" :model="formCar">
          <el-form-item label="车辆CODE">
            <el-input v-model="formCar.car_code" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item label="车辆名称">
            <el-input v-model="formCar.car_name" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item label="车辆状态">
            <el-radio v-model="formCar.car_state" label="1">正常</el-radio>
            <el-radio v-model="formCar.car_state" label="2">维修</el-radio>
            <el-radio v-model="formCar.car_state" label="3">报废</el-radio>
          </el-form-item>
          <el-form-item label="车辆负责人">
            <el-input v-model="formCar.car_person" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="负责人手机">
            <el-input v-model="formCar.car_phone" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formCar.remark" maxlength="30"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button v-if="dialogTitle == '添加车辆'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
          <el-button v-if="dialogTitle == '修改车辆'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
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
        carTableData: [],
        carListTotal: 0,
        currentPage: 1,
        searchContent: '',
        dialogTitle: '',
        formCar: {
          car_code: '',
          car_name: '',
          car_state: '1',
          car_time: '',
          car_person: '',
          car_phone: '',
          operator_name: '',
          operator_role: '',
          remark: '',
        },
        confirmCreateVisiable: false,
        loadingFlag: false
      }
    },
    created(){
      this.carList(1,10);
    },
    computed: {
      ...mapGetters([
        "userInfo"
      ])
    },
    filters:{
      carStateFilter(val){
        if(val === 1) return '正常'
        if(val === 2) return '维修'
        if(val === 3) return '报废'
        else return '-'
      }
    },
    methods: {
      ...mapActions([
        "getCarList",
        "addCar",
        "deleteCar"
      ]),
      handleCurrentChange(currentPage) {
        this.carList(currentPage,10)
      },
      search(){
        this.carList(1,10);
      },
      clear(){
        this.carList(1,10);
      },
      handleClose(){
        this.confirmCreateVisiable = false;
        this.formCar = {};
        this.carList(1,10);
      },
      carList(currentPage, pageSize){
        let params = {
          operator_role: this.userInfo.role,
          searchContent: this.searchContent,
          currentPage: currentPage,
          pageSize: pageSize
        }
        this.getCarList(params).then(res => {
          if(res.success){
            this.carTableData = res.data.carList;
            this.carListTotal = res.data.total;
            this.currentPage = currentPage
          }
        })
      },
      operatorCar(type, item){
        if(type == 'add'){
          this.dialogTitle = '添加车辆';
          this.confirmCreateVisiable = true;
        }else if(type == 'edit'){
          this.dialogTitle = '修改车辆';
          this.confirmCreateVisiable = true;
          item.car_state = item.car_state + '';
          this.formCar = item;
        }
      },
      deleteCarItem(item){
        let param = {
          id: item.id
        }
        this.deleteCar(param).then(res => {
          if(res.success){
            this.$message.success(res.message);
            this.carList(this.currentPage,10);
          }else{
            this.$message.warning(res.message|| '服务开小差');
          }
        })
      },
      successConfirm(type){
        if(!this.formCar.car_code || !this.formCar.car_name || !this.formCar.car_state || !this.formCar.car_person || !this.formCar.car_phone || !this.formCar.remark){
          this.$message.warning('请输入相应内容')
        }else{
          this.formCar.type = type;
          this.formCar.car_time = (new Date()).getTime();
          this.formCar.operator_name = this.userInfo.name;
          this.formCar.operator_role = this.userInfo.role;
          console.log(this.formCar, '-=---------------------------------===========')
          this.addCar(this.formCar).then(res => {
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
  .car-list{
    & .button-style{
        text-align: right;
        margin-bottom: 10px;
      }
  }
</style>
