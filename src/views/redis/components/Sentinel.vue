<template>
  <div>
    <pre class="jsonPre" v-html="sentinelInfoStr"></pre>
  </div>
</template>

<script>

  import {queryRedisSentinel} from '@/api/redis'
  import {beautifulJson} from '@/utils/beautifulJson'

  export default {
    name: "Sentinel",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        sentinelInfoStr: '',
      }
    },
    mounted() {
      const that = this
      queryRedisSentinel(this.id).then(function (result) {

        that.sentinelInfoStr = beautifulJson(JSON.stringify(result.data, null, 4))
      })
    },
  }
</script>

<style scoped>

</style>