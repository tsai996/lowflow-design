<script setup lang="ts">
import type { ExclusiveNode } from './type'
import GatewayNode from './GatewayNode.vue'

defineProps<{
  node: ExclusiveNode
}>()
</script>

<template>
  <GatewayNode v-bind="$attrs" :node="node">
    <template #default="{ addNode }">
      <el-button type="primary" @click="addNode('condition', node)" plain round>添加条件</el-button>
    </template>
  </GatewayNode>
</template>

<style scoped lang="scss"></style>
