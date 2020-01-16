<template>
  <div>
    <pre class="jsonPre" v-html="cpuInfoStr"></pre>
  </div>
</template>

<script>

  import {queryRedisCPUInfo} from '@/api/redis'
  import {beautifulJson} from '@/utils/beautifulJson'


  export default {
    name: "CPU",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        cpuInfoStr: '',
      }
    },
    mounted() {
      const that = this
      queryRedisCPUInfo(this.id).then(function (result) {

        that.cpuInfoStr = beautifulJson(JSON.stringify(result.data, null, 4))
      })
    },
  }
</script>

<style scoped>

</style>