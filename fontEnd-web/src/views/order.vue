<template>
  <div class="order-list">
    <div class="title">订单管理</div>
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
    <p class="tip-p">提醒：可以根据订单ID，收货人姓名，收货人的手机号，模糊查询</p>
    <el-table
      :data="orderTableData"
      border
      style="width: 100%">
      <el-table-column
        prop="order_id"
        label="订单ID"
        width="190">
      </el-table-column>
      <el-table-column
        prop="order_name"
        label="订单名称"
        width="80">
      </el-table-column>
      <el-table-column
        prop="order_time"
        label="订单时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="order_goods"
        label="订单货物">
      </el-table-column>
      <el-table-column
        prop="order_receiver_name"
        label="收件人"
        width="70">
      </el-table-column>
      <el-table-column
        prop="order_receiver_phone"
        label="收件人手机"
        width="120">
      </el-table-column>
      <el-table-column
        prop="order_receiver_address"
        label="收件人地址"
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
    <div class="pagination-box" v-if="orderTableData.length>0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, pager, next"
        :total="orderListTotal">
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
          <el-form-item label="收获人姓名">
            <el-input v-model="formOrder.order_receiver_name" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="收获人手机">
            <el-input v-model="formOrder.order_receiver_phone" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="收获人地址">
            <el-input v-model="formOrder.order_receiver_address" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formOrder.remark" maxlength="30"></el-input>
          </el-form-item>
          <!--<el-form-item label="工号">-->
            <!--<el-input v-if="dialogTitle == '添加人员信息'"  v-model="formOrder.usernum" maxlength="13"></el-input>-->
            <!--<el-input v-if="dialogTitle == '修改人员信息'" :disabled="true" v-model="formOrder.usernum" maxlength="13"></el-input>-->
          <!--</el-form-item>-->
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
  export default {
    data(){
      return {
        weeklyContent: '',
        currentDate: new Date().toLocaleDateString(),
        orderTableData: [],
        orderListTotal: 0,
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
      this.orderList(1,10);
    },
    computed: {
      ...mapGetters([
        "userInfo"
      ])
    },
    methods: {
      ...mapActions([
        "getOrderList",
        "addOrder",
        "deleteOrder"
      ]),
      handleCurrentChange(currentPage) {
        this.orderList(currentPage,10)
      },
      search(){
        this.orderList(1,10);
      },
      clear(){
        this.orderList(1,10);
      },
      handleClose(){
        this.confirmCreateVisiable = false;
        this.formOrder = {};
        this.orderList(1,10);
      },
      orderList(currentPage, pageSize){
        let params = {
          operator_role: this.userInfo.role,
          searchContent: this.searchContent,
          currentPage: currentPage,
          pageSize: pageSize
        }
        this.getOrderList(params).then(res => {
          if(res.success){
            this.orderTableData = res.data.orderList;
            this.orderListTotal = res.data.total;
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
.order-list{
  & .button-style{
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>
