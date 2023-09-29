<script setup lang="ts">
import Node from '../Node/index.vue'
import {CcNode} from '../Cc/index'
import Content from './content.vue'

export interface ApprovalProps {
  node: CcNode
}

withDefaults(defineProps<ApprovalProps>(), {})
</script>

<template>
  <Node icon="Promotion"
        v-bind="$attrs"
        color="#3296FA"
        :node="node">
    <Content :node="node"/>
  </Node>
</template>

<style scoped lang="scss">

</style>
