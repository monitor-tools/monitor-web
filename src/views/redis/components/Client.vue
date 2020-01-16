<template>
  <div>
    <pre class="jsonPre" v-html="clientInfoStr"></pre>
  </div>
</template>

<script>
  import {queryRedisClientInfo} from '@/api/redis'
  import {beautifulJson} from '@/utils/beautifulJson'

  export default {
    name: "Client",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        clientInfoStr: '',
      }
    },
    mounted() {
      const that = this
      queryRedisClientInfo(this.id).then(function (result) {

        that.clientInfoStr = beautifulJson(JSON.stringify(result.data, null, 4))
      })
    },
  }
</script>

<style scoped>

</style>