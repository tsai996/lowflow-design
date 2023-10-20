<script setup lang="ts" name="NodeTree">
import StartNode from './Start/index.vue'
import ApprovalNode from './Approval/index.vue'
import CcNode from './Cc/index.vue'
import ConditionNode from './Condition/index.vue'
import ExclusiveNode from './Exclusive/index.vue'
import EndNode from './End/index.vue'
import {type Component, inject} from 'vue'
import {FlowNode} from './Node/index'

defineProps<{
  node: FlowNode
}>()
const nodes: Record<string, Component> = {
  start: StartNode,
  approval: ApprovalNode,
  cc: CcNode,
  condition: ConditionNode,
  exclusive: ExclusiveNode,
  end: EndNode
}
const {addNodeRef} = inject<{
  addNodeRef: (id: string, ref: any) => void
}>('nodeHooks')!
</script>

<template>
  <slot/>
  <component
      :node="node"
      :ref="(el:any) => el && addNodeRef(node.id, el)"
      :is="nodes[node.type]"/>
  <NodeTree v-if="node.child" :node="node.child"/>
</template>

<style scoped lang="scss">
.node-container {

}
</style>
