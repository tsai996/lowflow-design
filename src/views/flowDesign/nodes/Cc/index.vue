<script setup lang="ts">
import Node from '../Node/index.vue'
import {CcNode} from '../Cc/index'
import Content from './content.vue'
import {ErrorInfo} from '../Node/index'
import {ref} from "vue";

export interface ApprovalProps {
  node: CcNode
}

const $props = withDefaults(defineProps<ApprovalProps>(), {})
const errorInfo = ref<ErrorInfo>({
  showError: false,
  message: ''
})
/**
 * 验证节点
 */
const validate = (): ErrorInfo | undefined => {
  errorInfo.value = {
    showError: false,
    message: ''
  }
  if ($props.node.users.length === 0) {
    errorInfo.value = {showError: true, message: `节点：[ ${$props.node.name} ] 未指定抄送人`}
  }
  return errorInfo.value
}
defineExpose({
  validate
})
</script>

<template>
  <Node icon="Promotion"
        v-bind="$attrs"
        color="#3296FA"
        :error-info="errorInfo"
        :node="node">
    <Content :node="node"/>
  </Node>
</template>

<style scoped lang="scss">

</style>
