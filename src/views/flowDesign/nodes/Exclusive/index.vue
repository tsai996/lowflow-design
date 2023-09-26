<script setup lang="ts">
import Branch from '../Branch/index.vue'
import {ExclusiveNode} from '../Exclusive/index'
import {FlowNode} from '../Node/index'
import {inject} from "vue";

export interface ExclusiveProps {
  node: ExclusiveNode
}

withDefaults(defineProps<ExclusiveProps>(), {})
const {addNode} = inject<{
  addNode: (type: string, node: FlowNode) => void
}>('nodeHooks')!
</script>

<template>
  <Branch :node="node">
    <el-button type="primary" @click="addNode('condition',node)" plain round>添加条件</el-button>
  </Branch>
</template>

<style scoped lang="scss">

</style>