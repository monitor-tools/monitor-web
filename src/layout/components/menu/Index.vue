<template>
  <div>
    <el-menu
      router="true"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      :default-active="selectedMenu"
      text-color="#fff"
      @select="selectMenu"
      active-text-color="#ffd04b">
      <el-submenu index="/redis">
        <template slot="title">Redis</template>
        <el-menu-item index="/redis/list">列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" >消息中心</el-menu-item>
      <el-menu-item index="/logout" style="float: right" >注销</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

  import store from '@/store'
  export default {
    name: "Menu",
    data() {
      return {
        selectedMenu: ''
      }
    },
    mounted(){
      this.selectedMenu = store.getMenuSelectAction()
    },
    methods:{
      selectMenu(index){
        this.selectedMenu = index
        store.setMenuSelectAction(index)
      }
    }
  }
</script>

<style scoped>

</style>