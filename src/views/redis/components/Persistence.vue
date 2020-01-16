<template>
  <div>
    <pre class="jsonPre" v-html="persistenceInfoStr"></pre>
  </div>
</template>

<script>

  import {queryRedisPersistenceInfo} from '@/api/redis'
  import {beautifulJson} from '@/utils/beautifulJson'

  export default {
    name: "Persistence",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        persistenceInfoStr: '',
      }
    },
    mounted() {
      const that = this
      queryRedisPersistenceInfo(this.id).then(function (result) {
        that.persistenceInfoStr = beautifulJson(JSON.stringify(result.data, null, 4))
      })
    },
  }
</script>

<style scoped>

</style>