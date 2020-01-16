<template>
  <div>
    <pre class="jsonPre" v-html="serverInfoStr"></pre>
  </div>
</template>

<script>

  import {queryRedisServerInfo} from '@/api/redis'
  import {beautifulJson} from '@/utils/beautifulJson'

  export default {
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    name: "Index",
    data() {
      return {
        serverInfoStr: '',
      }
    },
    mounted() {
      const that = this
      queryRedisServerInfo(this.id).then(function (result) {

        that.serverInfoStr = beautifulJson(JSON.stringify(result.data, null, 4))
      })
    },
    methods: {}
  }
</script>

<style scoped>

</style>