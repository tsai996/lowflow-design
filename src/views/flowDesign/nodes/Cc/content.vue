<script setup lang="ts">
import {CcNode} from './index'
import {ref, watchEffect} from "vue";

export interface CcContentProps {
  node: CcNode
}

const $props = withDefaults(defineProps<CcContentProps>(), {})
const content = ref<string>('')
watchEffect(() => {
  const props = $props.node
  if (props.users.length > 0) {
    // 可以从异步后端查询出用户名,显示在content中
  } else {
    content.value = '未指定人员'
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