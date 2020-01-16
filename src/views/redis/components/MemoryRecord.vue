<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%; text-align: center">
          <h2>内存概览</h2>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-date-picker
          v-model="timeAround"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>

        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-search" @click="switchMonitor">实时监控</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div style="height: 20px"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="main" ref="main">
        </div>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  let echarts = require('echarts/lib/echarts');//引入echarts
  require('echarts/lib/chart/line'); //引入折线图
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  import {queryRedisMemoryRecord, queryRedisMemoryRecordAround} from '@/api/redis'
  import {dateFormat} from '@/utils/dateFormat'

  export default {
    name: "MemoryRecord",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        lastMemoryId: '',
        mychart: {},
        time: [],
        memory: [],
        memoryRss: [],
        memoryPeek: [],
        memoryOverhead: [],
        totalSystemMemory: [],
        timeAround: [new Date(), new Date()],
        pickerOptions: {
          disabledDate(date) {
            return new Date() < date
          }
        }
      }
    },
    mounted() {
      this.initEcharts()
      this.refreshEcharts()
      // 执行异步任务
      this.intervalId = setInterval(() => {
        this.refreshEcharts()
      }, 1000 * 30)
    },
    methods: {
      initEcharts() {
        const that = this
        const mainDiv = that.$refs.main //找到绘制的区域,强烈推荐使用refs
        that.myChart = echarts.init(mainDiv) //初始化
      },
      refreshEcharts() {
        const that = this
        queryRedisMemoryRecord(this.id, this.lastMemoryId).then(function (result) {
          if (result.data.lastMemoryId === null) {
            return;
          }

          if (result.data.time.length > 0) {
            for (let i = 0; i < result.data.time.length; i++) {
              that.time.splice(i, 1)
              that.memory.splice(i, 1)
              that.time.push(result.data.time[i])
              that.memory.push(result.data.memoryKB[i])
              that.memoryRss.push(result.data.memoryRss[i])
              that.memoryPeek.push(result.data.memoryPeek[i])
              that.memoryOverhead.push(result.data.memoryOverhead[i])
              that.totalSystemMemory.push(result.data.totalSystemMemory[i])
            }
          }

          that.lastMemoryId = result.data.lastMemoryId

          const option = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['memory','memory_rss','memory_peek','memory_overhead','total_system_memory']
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: that.time
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'memory',
                data: that.memory,
                type: 'line'
              },
              {
                data: that.memoryRss,
                name: 'memory_rss',
                type: 'line'
              },
              {
                data: that.memoryPeek,
                name: 'memory_peek',
                type: 'line'
              },
              {
                data: that.memoryOverhead,
                name: 'memory_overhead',
                type: 'line'
              },
              {
                data: that.totalSystemMemory,
                name: 'total_system_memory',
                type: 'line'
              }
            ]
          };
          that.myChart.setOption(option);
        })
      },
      switchMonitor() {
        this.refreshEcharts()
        // 执行异步任务
        this.intervalId = setInterval(() => {
          this.refreshEcharts()
        }, 1000 * 30)
      },
      search() {
        const that = this
        that.time.splice(0, that.time.length)
        that.memory.splice(0, that.memory.length)
        that.memoryRss.splice(0, that.memoryRss.length)
        that.memoryPeek.splice(0, that.memoryPeek.length)
        that.memoryOverhead.splice(0, that.memoryOverhead.length)
        that.totalSystemMemory.splice(0, that.totalSystemMemory.length)
        that.lastMemoryId = ''
        clearInterval(this.intervalId)
        queryRedisMemoryRecordAround(that.id, dateFormat('yyyyMMddhhmmss', that.timeAround[0]), dateFormat('yyyyMMddhhmmss', that.timeAround[1]))
          .then(function (result) {
            const option = {
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: result.data.time
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: result.data.memoryKB,
                  name: 'memory',
                  type: 'line'
                },
                {
                  data: result.data.memoryRss,
                  name: 'memory_rss',
                  type: 'line'
                },
                {
                  data: result.data.memoryPeek,
                  name: 'memory_peek',
                  type: 'line'
                },
                {
                  data: result.data.memoryOverhead,
                  name: 'memory_overhead',
                  type: 'line'
                },
                {
                  data: result.data.totalSystemMemory,
                  name: 'total_system_memory',
                  type: 'line'
                }
              ]
            };
            that.myChart.setOption(option);
          })
      }
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    height: 500px;
  }

  .el-range-editor {
    margin-left: 150px;
    margin-right: 10px;
  }
</style>