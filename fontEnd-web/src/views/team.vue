<template>
  <div class="team-list">
    <div class="title">人员管理</div>
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-col :span="16">
          <el-input @clear="clear" placeholder="请输入内容" maxlength="20" v-model="searchContent" clearable class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search()">查询</el-button>
          </el-input>
        </el-col>
      </el-col>
    </el-row>
    <p class="tip-p">提醒：可以根据人员名字，模糊查询</p>
    <el-table
      :data="teamTableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮件"
        width="200">
      </el-table-column>
      <el-table-column
        label="角色"
        width="100">
        <template slot-scope="scope">
          {{scope.row.role | roleFilter}}
        </template>
      </el-table-column>
      <el-table-column
        label="是否激活"
        width="80">
        <template slot-scope="scope">
          {{scope.row.activate | activateFilter}}
        </template>
      </el-table-column>
      <el-table-column
        prop="activateCode"
        label="激活码">
      </el-table-column>
      <el-table-column
        prop="activateDate"
        label="激活日期"
        width="160">
      </el-table-column>
      <el-table-column
        v-if="userInfo.role === 1"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="operatorTeam('edit',scope.row)" type="success" size="small">修改</el-button>
          <el-button @click="deleteTeamItem(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" v-if="teamTableData.length>0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, pager, next"
        :total="teamListTotal">
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
        <el-form label-position="right" label-width="90px" :model="formTeam">
          <el-form-item label="修改角色：">
            <!--<el-radio v-model="formTeam.role" label="1">管理员</el-radio>-->
            <el-radio v-model="formTeam.role" label="2">仓库管理员</el-radio>
            <el-radio v-model="formTeam.role" label="3">司机</el-radio>
            <el-radio v-model="formTeam.role" label="4">押运员</el-radio>
            <el-radio v-model="formTeam.role" label="5">用户</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button v-if="dialogTitle == '添加人员'" type="primary" :loading="loadingFlag" @click="successConfirm('add')">确 定</el-button>
          <el-button v-if="dialogTitle == '修改人员'" type="primary" :loading="loadingFlag" @click="successConfirm('edit')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {
        currentDate: new Date().toLocaleDateString(),
        teamTableData: [],
        teamListTotal: 0,
        currentPage: 1,
        searchContent: '',
        dialogTitle: '',
        formTeam: {
          role: '',
        },
        confirmCreateVisiable: false,
        loadingFlag: false
      }
    },
    created(){
      this.teamList(1,10);
    },
    computed: {
      ...mapGetters([
        "userInfo"
      ])
    },
    filters: {
      roleFilter(val) {
        if (val === 1) return '管理员'
        if (val === 2) return '仓库管理员'
        if (val === 3) return '司机'
        if (val === 4) return '押运员'
        if (val === 5) return '用户'
        else return '-'
      },
      activateFilter(val) {
        if (val === 0) return '未激活'
        if (val === 1) return '激活'
        else return '-'
      }
    },
    methods: {
      ...mapActions([
        "getTeamList",
        "addTeam",
        "deleteTeam"
      ]),
      handleCurrentChange(currentPage) {
        this.teamList(currentPage,10)
      },
      search(){
        this.teamList(1,10);
      },
      clear(){
        this.teamList(1,10);
      },
      handleClose(){
        this.confirmCreateVisiable = false;
        this.formStore = {};
        this.teamList(1,10);
      },
      teamList(currentPage, pageSize){
        let params = {
          operator_role: this.userInfo.role,
          searchContent: this.searchContent,
          currentPage: currentPage,
          pageSize: pageSize
        }
        this.getTeamList(params).then(res => {
          if(res.success){
            this.teamTableData = res.data.teamList;
            this.teamListTotal = res.data.total;
            this.currentPage = currentPage
          }
        })
      },
      operatorTeam(type, item){
        if(type == 'add'){
          this.dialogTitle = '添加人员';
          this.confirmCreateVisiable = true;

        }else if(type == 'edit'){
          this.dialogTitle = '修改人员';
          this.confirmCreateVisiable = true;
          item.role = item.role + '';
          this.formTeam = item;
        }
      },
      deleteTeamItem(item){
        let param = {
          id: item.id
        }
        this.deleteTeam(param).then(res => {
          if(res.success){
            this.$message.success(res.message);
            this.teamList(this.currentPage,10);
          }else{
            this.$message.warning(res.message|| '服务开小差');
          }
        })
      },
      successConfirm(type){
        this.formTeam.type = type;
        this.formTeam.operator_time = (new Date()).getTime();
        this.formTeam.operator_name = this.userInfo.name;
        this.formTeam.operator_role = this.userInfo.role;
        this.addTeam(this.formTeam).then(res => {
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
</script>

<style lang="postcss" scoped>
  .team-list{

  }
</style>
