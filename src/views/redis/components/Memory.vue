<template>
  <div>
    <pre class="jsonPre" v-html="memoryInfoStr"></pre>
  </div>
</template>

<script>

  import {queryRedisMemoryInfo} from '@/api/redis'
  import {beautifulJson} from '@/utils/beautifulJson'

  export default {
    name: "Memory",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        memoryInfoStr: '',
      }
    },
    mounted() {
      const that = this
      queryRedisMemoryInfo(this.id).then(function (result) {
        that.memoryInfoStr = beautifulJson(JSON.stringify(result.data, null, 4))
      })
    },
  }
</script>

<style scoped>

</style>