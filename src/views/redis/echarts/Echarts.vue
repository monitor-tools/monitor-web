<template>
  <div>
    <el-row>
      <div style="height: 10px; width: 100%;"></div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <memoryRecord :id="id" style="height: 500px;width: 100%"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import MemoryRecord from '@/views/redis/components/MemoryRecord'

  export default {
    name: "Echarts",
    components:{
      MemoryRecord
    },
    props: {
      id: {
        type: String,
        default: ''
      }
    },
  }
</script>

<style scoped>

</style>