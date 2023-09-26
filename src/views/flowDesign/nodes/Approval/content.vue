<script setup lang="ts">
import {ApprovalNode} from './index'
import {ref, watchEffect} from "vue";

export interface ApprovalContentProps {
  node: ApprovalNode
}

const $props = withDefaults(defineProps<ApprovalContentProps>(), {})
const content = ref<string>('')
watchEffect(() => {
  const props = $props.node
  if (props.assigneeType === 'self_select') {
    content.value = '发起人自选'
  } else if (props.assigneeType === 'self') {
    content.value = '发起人自己'
  } else if (props.assigneeType === 'leader') {
    content.value = props.leader === 1 ? '直属上级' : `${props.leader}级上级`
  } else if (props.assigneeType === 'form_user') {
    content.value = '表单内人员'
  } else if (props.assigneeType === 'user') {
    if (props.users.length > 0) {
      // 可以从异步后端查询出用户名,显示在content中
    } else {
      content.value = '未指定人员'
    }
  } else if (props.assigneeType === 'role') {
    if (props.roles.length > 0) {
      // 可以从异步后端查询出角色名,显示在content中
    } else {
      content.value = '未指定角色'
    }
  } else {
    content.value = $props.node.name
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