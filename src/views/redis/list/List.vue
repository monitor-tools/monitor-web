<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
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
            v-if="false"
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
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
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

  import {queryRedisInfo, doSaveRedisInfo} from '@/api/redis'

  export default {
    name: "List",
    data() {
      return {
        dialogFormVisible: false,
        tableData: [],
        form: {
          name: '',
          host: '',
          port: '',
          password: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
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
      queryRedisInfo().then(function (result) {
        for (let i = 0; i < result.data.length; i++) {
          that.tableData.push(result.data[i]);
        }
      })
    },
    methods: {
      connectedCellClassName({row, column}) {
        if (column.property === 'connectedStr') {
          if (row.connected === 0) {
            return 'off-line-cell'
          } else {
            return 'on-line-cell'
          }
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
        const that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {

            // eslint-disable-next-line no-console
            console.log(that.form)
            doSaveRedisInfo(that.form).then(function (result) {
              if (result.code === 200) {
                that.dialogFormVisible = false
                that.name = ''
                that.host = ''
                that.port = ''
                that.password = ''
              }
            }).then(function (result) {
              if (result.code != 200) {
                alert(result.msg)
              }
            }).catch(e => {
              // eslint-disable-next-line no-console
              console.log(e)
            })

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
        this.$router.push('/redis/infos/' + row.id);
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

  .el-table .on-line-cell {
    color: green;
  }
</style>
<style scoped>
  .el-dialog {
    width: 20%;
  }


</style>