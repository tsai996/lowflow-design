<script setup lang="ts">
import Node from '../Node/index.vue'
import Content from './content'
import {ApprovalNode} from './index'
import {ErrorInfo} from '../Node/index'
import {ref} from "vue";

export interface ApprovalProps {
  node: ApprovalNode
}

const $props = withDefaults(defineProps<ApprovalProps>(), {})
const errorInfo = ref({
  showError: false,
  message: ''
})
const validate = (): ErrorInfo | undefined => {
  errorInfo.value = {
    showError: false,
    message: ''
  }
  if ($props.node.assigneeType === 'user') {
    if ($props.node.users.length === 0) {
      errorInfo.value = {
        showError: true,
        message: `节点：[ ${$props.node.name} ] 未指定人员`
      }
    }
  } else if ($props.node.assigneeType === 'role') {
    if ($props.node.roles.length === 0) {
      errorInfo.value = {
        showError: true,
        message: `节点：[ ${$props.node.name} ] 未指定角色`
      }
    }
  } else if ($props.node.assigneeType === 'formUser') {
    if (!$props.node.formRole) {
      errorInfo.value = {
        showError: true,
        message: `节点：[ ${$props.node.name} ] 未指定表单内人员`
      }
    }
  } else if ($props.node.assigneeType === 'formRole') {
    if (!$props.node.formRole) {
      errorInfo.value = {
        showError: true,
        message: `节点：[ ${$props.node.name} ] 未指定表单内角色`
      }
    }
  } else if ($props.node.assigneeType === 'leader') {
    if (!$props.node.leader) {
      errorInfo.value = {
        showError: true,
        message: `节点：[ ${$props.node.name} ] 未指定多级上级`
      }
    }
  }
  return errorInfo.value
}
defineExpose({
  validate
})
</script>

<template>
  <Node icon="Stamp"
        color="linear-gradient(89.96deg, #FA6F32 .05%, #FB9337 79.83%)"
        :error-info="errorInfo"
        :node="node">
    <Content :node="node"/>
  </Node>
</template>

<style scoped lang="scss">

</style>
