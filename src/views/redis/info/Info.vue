<template>
  <div>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/redis/list' }">Redis列表</el-breadcrumb-item>
        <el-breadcrumb-item>Redis详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <div style="height: 10px; width: 100%;"></div>
    </el-row>

    <div>
      <el-link @click="serverDrawer = true">Server</el-link>
      <el-link @click="clientDrawer = true" type="primary">Client</el-link>
      <el-link v-if="redisMode !== 'sentinel'" @click="memoryDrawer = true" type="success">Memory</el-link>
      <el-link v-if="redisMode !== 'sentinel'" @click="persistenceDrawer = true" type="warning">Persistence</el-link>
      <el-link @click="statsDrawer = true" type="danger">Stats</el-link>
      <el-link v-if="redisMode !== 'sentinel'" @click="replicationDrawer = true" type="info">Replication</el-link>
      <el-link @click="cpuDrawer = true" type="success">CPU</el-link>
      <el-link v-if="redisMode !== 'sentinel'" @click="keySpaceDrawer = true" type="primary">KeySpace</el-link>
      <el-link v-if="redisMode === 'sentinel'" @click="sentinelDrawer = true" type="primary">Sentinel</el-link>
    </div>

    <el-drawer
      title="详情"
      :with-header="false"
      :visible.sync="serverDrawer"
      :direction="serverDirection">
      <server :id="id"/>
    </el-drawer>

    <el-drawer
      title="详情"
      :with-header="false"
      :visible.sync="clientDrawer"
      :direction="clientDirection">
      <client :id="id"/>
    </el-drawer>

    <el-drawer
      title="详情"
      :with-header="false"
      :visible.sync="memoryDrawer"
      :direction="memoryDirection">
      <memory :id="id"/>
    </el-drawer>

    <el-drawer
      title="详情"
      :with-header="false"
      :visible.sync="persistenceDrawer"
      :direction="persistenceDirection">
      <persistence :id="id"/>
    </el-drawer>

    <el-drawer
      title="详情"
      :with-header="false"
      :visible.sync="statsDrawer"
      :direction="statsDirection">
      <stats :id="id"/>
    </el-drawer>

    <el-drawer
      title="详情"
      :with-header="false"
      :visible.sync="replicationDrawer"
      :direction="replicationDirection">
      <replication :id="id"/>
    </el-drawer>

    <el-drawer
      title="详情"
      :with-header="false"
      :visible.sync="cpuDrawer"
      :direction="cpuDirection">
      <CPU :id="id"/>
    </el-drawer>

    <el-drawer
      title="详情"
      :with-header="false"
      :visible.sync="keySpaceDrawer"
      :direction="keySpaceDirection">
      <keySpace :id="id"/>
    </el-drawer>

    <el-drawer
      title="详情"
      :with-header="false"
      :visible.sync="sentinelDrawer"
      :direction="sentinelDirection">
      <sentinel :id="id"/>
    </el-drawer>

    <el-row>
      <el-col :span="24">
         <echarts :id="id" :redisMode="redisMode"/>
      </el-col>
    </el-row>

  </div>

</template>

<script>

  import Server from '@/views/redis/components/Server'
  import Client from '@/views/redis/components/Client'
  import Memory from '@/views/redis/components/Memory'
  import Persistence from '@/views/redis/components/Persistence'
  import Stats from '@/views/redis/components/Stats'
  import Replication from '@/views/redis/components/Replication'
  import CPU from '@/views/redis/components/CPU'
  import KeySpace from '@/views/redis/components/KeySpace'
  import Sentinel from '@/views/redis/components/Sentinel'
  import Echarts from '@/views/redis/echarts/Echarts'

  import {queryRedisServerInfo} from '@/api/redis'

  export default {
    name: "Info",
    components: {
      Server,
      Client,
      Memory,
      Persistence,
      Stats,
      Replication,
      CPU,
      KeySpace,
      Echarts,
      Sentinel
    },
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        redisMode:'',
        serverDrawer: false,
        serverDirection: 'rtl',
        clientDrawer: false,
        clientDirection: 'rtl',
        memoryDrawer: false,
        memoryDirection: 'rtl',
        replicationDrawer: false,
        replicationDirection: 'rtl',
        statsDrawer: false,
        statsDirection: 'rtl',
        persistenceDrawer: false,
        persistenceDirection: 'rtl',
        cpuDrawer: false,
        cpuDirection: 'rtl',
        keySpaceDrawer: false,
        keySpaceDirection: 'rtl',
        sentinelDrawer: false,
        sentinelDirection: 'rtl'
      }
    },
    mounted() {
      const that = this
      queryRedisServerInfo(this.id).then(function (result) {
        that.redisMode = result.data.redis_mode
      })
    },
    methods:{

    }
  }
</script>

<style>
  /* 方法2：自定义高亮样式 */
  .jsonPre {
    float: left;
    width: 100%;
    /*height: 70vh;*/
    outline: 1px solid #ccc;
    padding: 5px;
    overflow: auto;
  }

  .string {
    color: green;
  }

  .darkorange {
    color: darkorange;
  }

  .boolean {
    color: blue;
  }

  .null {
    color: magenta;
  }

  .key {
    color: red;
  }
</style>
<style scoped>

  .info {
    padding: 5px 10px;
  }

  .el-link {
    margin-left: 10px;
    margin-right: 10px;
  }

</style>