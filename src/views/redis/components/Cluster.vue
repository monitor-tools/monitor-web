<template>
  <div>
    <pre class="jsonPre" v-html="clusterInfoStr"></pre>
  </div>
</template>

<script>

  import {queryRedisClusterInfo} from '@/api/redis'
  import {beautifulJson} from '@/utils/beautifulJson'

  export default {
    name: "Cluster",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        clusterInfoStr: '',
      }
    },
    mounted() {
      const that = this
      queryRedisClusterInfo(this.id).then(function (result) {

        that.clusterInfoStr = beautifulJson(JSON.stringify(result.data, null, 4))
      })
    },
  }
</script>

<style scoped>

</style>