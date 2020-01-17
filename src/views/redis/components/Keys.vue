<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%; text-align: center">
          <h2>KEY概览</h2>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div style="height: 20px"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData.filter(data => !search || data.key.toLowerCase().includes(search.toLowerCase()))"
          stripe
          style="width: 100%">
          <el-table-column
            prop="db"
            label="db">
          </el-table-column>
          <el-table-column
            prop="key"
            label="key">
          </el-table-column>
          <el-table-column
            prop="type"
            label="type">
          </el-table-column>
          <el-table-column
            prop="ttl"
            label="过期时间(秒)">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleShow(scope.$index, scope.row)">查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div style="padding: 20px 0px;float: right">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :current-page="currentPage"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {queryRedisKeysPattern} from '@/api/redis'

  export default {
    name: "Keys",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 100,
        total: 0,
        tableData: [],
        cacheTableDate: [],
        search: ''
      }
    },
    mounted() {
      this.queryRedisKeys()
    },
    methods: {
      queryRedisKeys() {
        const that = this
        queryRedisKeysPattern(that.id, '').then(function (result) {
          if (result.data === null) {
            return
          }

          for (let i = 0; i < result.data.length; i++) {
            that.cacheTableDate.push(result.data[i]);
          }

          that.total = result.data.length

          that.handleCurrentChange(1)
        })
      },
      handleCurrentChange(val) {
        const that = this
        that.currentPage = val
        const startIndex = Math.pow(that.pageSize, that.currentPage - 1);
        let endIndex = 0
        if(that.total > that.pageSize){
          endIndex = startIndex + that.pageSize
        } else {
          endIndex = that.total
        }
        that.tableData.splice(0, that.tableData.length)
        for (let i = startIndex; i < endIndex; i++) {
          that.tableData.push(that.cacheTableDate[i])
        }
      },
      handleShow(index, row) {
        // eslint-disable-next-line no-console
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>

</style>