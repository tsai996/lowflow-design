<template>
  <el-config-provider namespace="el" :locale="zhCn">
    <FlowDesign/>
  </el-config-provider>
</template>
<script setup lang="ts">
import FlowDesign from '~/views/flowDesign/index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

</script>
<style>
</style>
