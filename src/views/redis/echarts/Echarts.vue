<template>
  <div>
    <el-row>
      <div style="height: 10px; width: 100%;"></div>
    </el-row>
    <el-row>
      <el-col :span="12">
        <memoryRecord :id="id" style="height: 500px;width: 100%"/>
      </el-col>
      <el-col :span="12">
        <clientRecord :id="id" style="height: 500px;width: 100%"/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <keys :id="id"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import MemoryRecord from '@/views/redis/components/MemoryRecord'
  import ClientRecord from '@/views/redis/components/ClientRecord'
  import Keys from '@/views/redis/components/Keys'

  export default {
    name: "Echarts",
    components:{
      MemoryRecord,
      ClientRecord,
      Keys
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