<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider namespace="el" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
#app {
  color: var(--el-text-color-primary);
}
</style>
