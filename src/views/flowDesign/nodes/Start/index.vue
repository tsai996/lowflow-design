<script setup lang="ts">
import Node from '../Node/index.vue'
import {FlowNode} from '../Node/index'
import Content from './content.vue'

export interface StartProps {
  node: FlowNode
}

withDefaults(defineProps<StartProps>(), {})
</script>

<template>
  <div class="start-box">
    <Node icon="List"
          :close="false"
          color="#8c7cf3"
          :node="node">
      <Content :node="node"/>
    </Node>
  </div>
</template>

<style scoped lang="scss">
.start-box {
  padding: 50px 0 0;
}
</style>
