<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true">添加</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="height: 20px"></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          :row-class-name="tableRowClassName"
          :cell-class-name="connectedCellClassName"
          border
          style="width: 100%">
          <el-table-column
            v-if="false"
            fixed
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="host"
            label="host">
          </el-table-column>
          <el-table-column
            prop="port"
            label="port">
          </el-table-column>
          <el-table-column
            prop="connected"
            label="connected">
          </el-table-column>
          <el-table-column
            prop="connectedStr"
            label="状态">
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog title="添加Redis" :visible.sync="dialogFormVisible" width="25%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="host" prop="host">
          <el-input v-model="form.host" placeholder="127.0.0.1"></el-input>
        </el-form-item>
        <el-form-item label="port" prop="port">
          <el-input v-model="form.port" placeholder="6379"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>

  import { queryRedisInfo } from '@/api/redis'

  export default {
    name: "List",
    data() {
      return {
        dialogFormVisible: false,
        tableData: [],
        form: {
          host: '',
          port: '',
          password: ''
        },
        rules: {
          host: [
            {required: true, message: '请输入host', trigger: 'blur'},
          ],
          port: [
            {required: true, message: '请输入端口', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      const that = this
      queryRedisInfo().then(function (result){
        for (let i = 0; i < result.data.length; i++) {
          that.tableData.push(result.data[i]);
        }
      })
    },
    methods: {
      connectedCellClassName({row, column}){
        if (column.property === 'connectedStr' && row.connected === 0) {
          return 'off-line-cell'
        }
        return '';
      },
      tableRowClassName({row}) {
        if (row.connected === 0) {
          return 'warning-row';
        }
        return '';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid){
            alert('ok submit!!');
          } else {
            alert('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(row) {
        this.$router.push('/redis/infos/'+row.id);
      }
    },
  }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table .off-line-cell {
    color: red;
  }
</style>
<style scoped>
  .el-dialog {
    width: 20%;
  }


</style>