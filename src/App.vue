<template>
  <el-config-provider namespace="el" :locale="zhCn">
    <div class="main-container">
      <FlowDesign/>
    </div>
  </el-config-provider>
</template>
<script setup lang="ts">
import FlowDesign from '~/views/flowDesign/index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

</script>
<style>
#app {
  color: var(--el-text-color-primary);
}

.main-container {
  height: calc(100vh);
}
</style>
