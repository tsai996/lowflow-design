<script setup lang="ts">
import Node from '../Node/index.vue'
import {ConditionNode} from '../Condition/index'
import Content from './content.vue'

export interface ApprovalProps {
  node: ConditionNode
}

withDefaults(defineProps<ApprovalProps>(), {})

</script>

<template>
  <div class="condition-box">
    <Node icon="Share"
          :readOnly="node.def"
          :node="node">
      <Content :node="node"/>
    </Node>
  </div>
</template>

<style scoped lang="scss">
.condition-box {
  :deep(.node-box) {
    padding: 30px 50px 0;
  }
}
</style>
