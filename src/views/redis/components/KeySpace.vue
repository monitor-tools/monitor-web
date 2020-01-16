<template>
  <div>
    <pre class="jsonPre" v-html="keySpaceInfoStr"></pre>
  </div>
</template>

<script>

  import {queryRedisKeySpaceInfo} from '@/api/redis'
  import {beautifulJson} from '@/utils/beautifulJson'

  export default {
    name: "KeySpace",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        keySpaceInfoStr: '',
      }
    },
    mounted() {
      const that = this
      queryRedisKeySpaceInfo(this.id).then(function (result) {
        that.keySpaceInfoStr = beautifulJson(JSON.stringify(result.data, null, 4))
      })
    },
  }
</script>

<style scoped>

</style>