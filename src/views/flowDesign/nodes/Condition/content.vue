<script setup lang="tsx">
import {ConditionNode} from './index'
import {ref, VNode, watchEffect} from "vue";

export interface ConditionContentProps {
  node: ConditionNode
}

const $props = withDefaults(defineProps<ConditionContentProps>(), {})
const showContent = ref<VNode>((<span></span>))
watchEffect(() => {
  if ($props.node.def) {
    return showContent.value = <span>不满足条件时，进入默认条件</span>
  } else if ($props.node.conditions.conditions.length > 0 || $props.node.conditions.groups.length > 0) {
    const count = $props.node.conditions.conditions.length + $props.node.conditions.groups.length
    showContent.value = <span>{`已设置（${count}）个条件`}</span>
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
