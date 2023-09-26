<script setup lang="ts">
import Node from '../Node/index.vue'
import Content from './content.vue'
import {ApprovalNode} from './index'

export interface ApprovalProps {
  node: ApprovalNode
}

withDefaults(defineProps<ApprovalProps>(), {})
</script>

<template>
  <Node icon="Stamp"
        color="linear-gradient(89.96deg, #FA6F32 .05%, #FB9337 79.83%)"
        :node="node">
    <Content :node="node"/>
  </Node>
</template>

<style scoped lang="scss">

</style>
