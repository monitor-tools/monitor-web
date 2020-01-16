<template>
  <div>
    <pre class="jsonPre" v-html="statsInfoStr"></pre>
  </div>
</template>

<script>

  import {queryRedisStatsInfo} from '@/api/redis'
  import {beautifulJson} from '@/utils/beautifulJson'

  export default {
    name: "Stats",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        statsInfoStr: '',
      }
    },
    mounted() {
      const that = this
      queryRedisStatsInfo(this.id).then(function (result) {

        that.statsInfoStr = beautifulJson(JSON.stringify(result.data, null, 4))
      })
    },
  }
</script>

<style scoped>

</style>