<script setup lang="ts">
import Node from './Node.vue'
import type { StartNode } from './type'
import type { ErrorInfo } from './type'
import type { Ref } from 'vue'

const props = defineProps<{
  node: StartNode
}>()
const { nodesError } = inject<{
  nodesError: Ref<Recordable<ErrorInfo[]>>
}>('flowDesign', { nodesError: ref({}) })
watchEffect(() => {
  const errors: ErrorInfo[] = []
  const { id, name, next } = props.node
  if (next?.type === 'end') {
    errors.push({ id: id, name: name, message: '发起下节点为空' })
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
  <div class="start-node">
    <Node v-bind="$attrs" icon="el:List" :close="false" color="#8c7cf3" :node="node">
      <el-text>发起人</el-text>
    </Node>
  </div>
</template>

<style scoped lang="scss">
.start-node {
  padding-top: 50px;
  :deep(.node-box) {
    &:after {
      display: none;
    }
  }
}
</style>
