<script setup lang="ts">
import Node from './Node.vue'
import type { ErrorInfo, ServiceNode } from './type'
import type { Ref } from 'vue'

const props = defineProps<{
  node: ServiceNode
}>()
const { nodesError } = inject<{
  nodesError: Ref<Recordable<ErrorInfo[]>>
}>('flowDesign', { nodesError: ref({}) })
const content = ref<string>('')
watchEffect(() => {
  const errors: ErrorInfo[] = []
  const { id, name, implementationType, implementation } = props.node
  if (!implementationType) {
    errors.push({ id: id, name: name, message: '执行类型为空' })
    content.value = '执行类型为空'
  } else if (!implementation) {
    errors.push({ id: id, name: name, message: '执行值为空' })
    content.value = '执行值为空'
  } else {
    content.value = `执行服务`
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
  <Node v-bind="$attrs" icon="el:Tools" color="#ffc107" :node="node">
    <el-text>{{ content }}</el-text>
  </Node>
</template>

<style scoped lang="scss"></style>
