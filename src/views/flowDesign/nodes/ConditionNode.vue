<script setup lang="ts">
import type { ConditionNode } from './type'
import type { Ref } from 'vue'
import type { ErrorInfo } from './type'
import Node from './Node.vue'

const props = defineProps<{
  node: ConditionNode
}>()
const { nodesError } = inject<{
  nodesError: Ref<Recordable<ErrorInfo[]>>
}>('flowDesign', { nodesError: ref({}) })
const content = ref<string>('')
watchEffect(() => {
  const errors: ErrorInfo[] = []
  const { id, name, def, conditions, next } = props.node
  if (def) {
    content.value = '不满足其他条件，进入此分支'
  } else if (conditions.conditions.length > 0 || (conditions.groups?.length || 0) > 0) {
    const count = conditions.conditions.length + (conditions.groups?.length || 0)
    content.value = `已设置（${count}）个条件`
    if (!next) {
      errors.push({ id: id, name: name, message: '分支下节点为空' })
    }
  } else {
    errors.push({ id: id, name: name, message: '未设置条件' })
    content.value = '未设置条件'
  }
  // 记录错误
  if (errors.length > 0) {
    nodesError.value[id] = errors
  } else {
    delete nodesError.value[id]
  }
})
</script>

<template>
  <div class="branch-node">
    <Node v-bind="$attrs" icon="el:Share" :node="node" :readOnly="node.def">
      <el-text>{{ content }}</el-text>
      <slot name="append" />
    </Node>
  </div>
</template>

<style scoped lang="scss">
.branch-node {
  :deep(.node-box) {
    margin: 60px 40px 0;
  }
}
</style>
