<script setup lang="ts">
import type { EndNode } from '../nodes/type'
import ExecutionListeners from './ExecutionListeners.vue'

defineProps<{
  activeData: EndNode
}>()
</script>

<template>
  <el-form label-position="top" label-width="90px">
    <el-form-item prop="executionListeners" label="执行监听器">
      <ExecutionListeners :node="activeData" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
