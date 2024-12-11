<script setup lang="ts" name="TreeNode">
import type { FlowNode } from './type'
import type { Component } from 'vue'
import Start from './StartNode.vue'
import End from './EndNode.vue'
import Approval from './ApprovalNode.vue'
import Cc from './CcNode.vue'
import Timer from './TimerNode.vue'
import Notify from './NotifyNode.vue'
import Service from './ServiceNode.vue'
import Exclusive from './ExclusiveNode.vue'
import Condition from './ConditionNode.vue'

defineProps<{
  node: FlowNode
}>()
const nodes: Recordable<Component> = {
  start: Start,
  approval: Approval,
  cc: Cc,
  timer: Timer,
  notify: Notify,
  service: Service,
  exclusive: Exclusive,
  condition: Condition,
  end: End
}
</script>

<template>
  <slot />
  <component :is="nodes[node.type]" :node="node" v-bind="$attrs">
    <template v-for="(value, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope || {}"></slot>
    </template>
  </component>
  <TreeNode v-if="node.next" :node="node.next" v-bind="$attrs" />
</template>

<style scoped lang="scss"></style>
