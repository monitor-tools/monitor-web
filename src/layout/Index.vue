<template>
  <div>
    <el-container>
      <el-header>
        <Menu/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Menu from './components/menu/Index'

  export default {
    name: "Layout",
    components: {
      Menu
    }
  }
</script>

<style scoped>

</style>