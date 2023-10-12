<script setup lang="tsx">
import {ConditionNode} from './index'
import {ref, VNode, watchEffect} from "vue";

export interface ConditionContentProps {
  node: ConditionNode
}

const $props = withDefaults(defineProps<ConditionContentProps>(), {})
const showContent = ref<VNode>((<span></span>))
watchEffect(() => {
  const props = $props.node
  if ($props.node.def) {
    return showContent.value = <span>不满足条件时，进入默认条件</span>
  } else if (props.conditions.conditions.length > 0) {
    showContent.value = <span>已设置（{props.conditions.conditions.length}）个条件</span>
  } else {
    showContent.value = <span>未设置条件</span>
  }
})

</script>

<template>
  <el-text>
    <showContent></showContent>
  </el-text>
</template>

<style scoped lang="scss">

</style>
