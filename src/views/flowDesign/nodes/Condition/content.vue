<script setup lang="ts">
import {ConditionNode} from './index'
import {ref, watchEffect} from "vue";

export interface ConditionContentProps {
  node: ConditionNode
}

const $props = withDefaults(defineProps<ConditionContentProps>(), {})
const content = ref<string>('')
watchEffect(() => {
  if ($props.node.def) {
    content.value = '不满足条件时，进入默认条件'
  } else {
    content.value = '未设置条件'
  }
})

</script>

<template>
  <el-text>
    {{ content || node.name }}
  </el-text>
</template>

<style scoped lang="scss">

</style>