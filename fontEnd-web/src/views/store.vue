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
    <p class="tip-p">提醒：可以根据仓库code，仓库名称，模糊查询</p>
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
        prop="remark"
        label="备注"
        width="160">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="operatorStore('edit',scope.row)" type="success" size="small">修改</el-button>
          <el-button @click="deleteStoreItem(scope.row)" type="danger" size="small">删除</el-button>
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
    <!--dialog-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="confirmCreateVisiable"
      :before-close="handleClose"
      width="600px"
      center>
      <div>
        <el-form label-position="right" label-width="90px" :model="formStore">
          <el-form-item label="仓库CODE">
            <el-input v-model="formStore.store_code" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item label="仓库名称">
            <el-input v-model="formStore.store_name" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item label="仓库地址">
            <el-input v-model="formStore.store_address" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item label="货架数">
            <el-input v-model="formStore.shelves_num" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="商品数">
            <el-input v-model="formStore.goods_num" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formStore.remark" maxlength="30"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button v-if="dialogTitle == '添加仓库'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
          <el-button v-if="dialogTitle == '修改仓库'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
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
        storeTableData: [],
        storeListTotal: 0,
        currentPage: 1,
        searchContent: '',
        dialogTitle: '',
        formStore: {
          store_code: '',
          store_name: '',
          store_address:'',
          store_time: '',
          shelves_num: '',
          goods_num: '',
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
        "addStore",
        "deleteStore"
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
      deleteStoreItem(item){
        let param = {
          id: item.id
        }
        this.deleteStore(param).then(res => {
          if(res.success){
            this.$message.success(res.message);
            this.storeList(this.currentPage,10);
          }else{
            this.$message.warning(res.message|| '服务开小差');
          }
        })
      },
      successConfirm(type){
        if(!this.formStore.store_code || !this.formStore.store_name || !this.formStore.store_address || !this.formStore.shelves_num || !this.formStore.goods_num || !this.formStore.remark){
          this.$message.warning('请输入相应内容')
        }else{
          this.formStore.type = type;
          this.formStore.store_time = (new Date()).getTime();
          this.formStore.operator_name = this.userInfo.name;
          this.formStore.operator_role = this.userInfo.role;
          this.addStore(this.formStore).then(res => {
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
