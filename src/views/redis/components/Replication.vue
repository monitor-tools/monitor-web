<template>
  <div>
    <pre class="jsonPre" v-html="replicationInfoStr"></pre>
  </div>
</template>

<script>
  import {queryRedisReplicationInfo} from '@/api/redis'
  import {beautifulJson} from '@/utils/beautifulJson'

  export default {
    name: "Replication",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        replicationInfoStr: '',
      }
    },
    mounted() {
      const that = this
      queryRedisReplicationInfo(this.id).then(function (result) {
        that.replicationInfoStr = beautifulJson(JSON.stringify(result.data, null, 4))
      })
    },
  }
</script>

<style scoped>

</style>