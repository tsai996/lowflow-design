<script setup lang="ts">
import Node from '../Node/index.vue'
import {ConditionNode} from '../Condition/index'
import Content from './content.vue'
import {ErrorInfo} from '../Node/index'
import {ref} from "vue";

export interface ApprovalProps {
  node: ConditionNode
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
  if ($props.node.def) {
    return undefined
  } else if ($props.node.conditions.conditions.length === 0 && $props.node.conditions.groups.length === 0) {
    errorInfo.value = {showError: true, message: `节点：[ ${$props.node.name} ] 未设置条件`}
  }
  return errorInfo.value
}
defineExpose({
  validate
})
</script>

<template>
  <div class="condition-box">
    <Node icon="Share"
          :readOnly="node.def"
          :error-info="errorInfo"
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
