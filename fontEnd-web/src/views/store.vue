<template>
  <div class="store-list">
    <div class="title">仓库管理</div>
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
          <el-button type="primary" @click="operatorStore('add')">添加仓库</el-button>
        </div>
      </el-col>
    </el-row>
    <p class="tip-p">提醒：可以根据订单ID，订单名称，收货人姓名，收货人的手机号，模糊查询</p>
    <el-table
      :data="storeTableData"
      border
      style="width: 100%">
      <el-table-column
        prop="store_code"
        label="仓库CODE"
        width="160">
      </el-table-column>
      <el-table-column
        prop="store_name"
        label="仓库名称">
      </el-table-column>
      <el-table-column
        prop="store_time"
        label="仓库时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="shelves_num"
        label="货架数">
      </el-table-column>
      <el-table-column
        prop="goods_num"
        label="货物数"
        width="160">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="operatorStore('edit',scope.row)" type="success" size="small">修改</el-button>
          <el-button @click="deleteOrderItem(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" v-if="storeTableData.length>0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, pager, next"
        :total="storeListTotal">
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
        storeTableData: [],
        storeListTotal: 0,
        currentPage: 1,
        searchContent: '',
        dialogTitle: '',
        formStore: {
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
      this.storeList(1,10);
    },
    computed: {
      ...mapGetters([
        "userInfo"
      ])
    },
    methods: {
      ...mapActions([
        "getStoreList",
        "addOrder",
        "deleteOrder"
      ]),
      handleCurrentChange(currentPage) {
        this.storeList(currentPage,10)
      },
      search(){
        this.storeList(1,10);
      },
      clear(){
        this.storeList(1,10);
      },
      handleClose(){
        this.confirmCreateVisiable = false;
        this.formStore = {};
        this.storeList(1,10);
      },
      storeList(currentPage, pageSize){
        let params = {
          operator_role: this.userInfo.role,
          searchContent: this.searchContent,
          currentPage: currentPage,
          pageSize: pageSize
        }
        this.getStoreList(params).then(res => {
          if(res.success){
            this.storeTableData = res.data.orderList;
            this.storeListTotal = res.data.total;
            this.currentPage = currentPage
          }
        })
      },
      operatorStore(type, item){
        if(type == 'add'){
          this.dialogTitle = '添加仓库';
          this.confirmCreateVisiable = true;

        }else if(type == 'edit'){
          this.dialogTitle = '修改仓库';
          this.confirmCreateVisiable = true;
          this.formStore = item;
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
            this.storeList(this.currentPage,10);
          }else{
            this.$message.warning(res.message|| '服务开小差');
          }
        })
      },
      successConfirm(type){
        if(!this.formStore.order_name || !this.formStore.order_goods || !this.formStore.order_receiver_name || !this.formStore.order_receiver_phone || !this.formStore.order_receiver_address || !this.formStore.remark){
          this.$message.warning('请输入相应内容')
        }else{
          this.formStore.type = type;
          this.formStore.order_time = (new Date()).getTime();
          this.formStore.operator_name = this.userInfo.name;
          this.formStore.operator_role = this.userInfo.role;
          console.log(this.formStore, '-=---------------------------------===========')
          this.addOrder(this.formStore).then(res => {
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
  .store-list{
    & .button-style{
        text-align: right;
        margin-bottom: 10px;
      }
  }
</style>
