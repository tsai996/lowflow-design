<script setup lang="ts">
import Node from './Node.vue'
import type { TimerNode } from './type'
import type { Ref } from 'vue'
import type { ErrorInfo } from './type'

const props = defineProps<{
  node: TimerNode
}>()
const { nodesError } = inject<{
  nodesError: Ref<Recordable<ErrorInfo[]>>
}>('flowDesign', { nodesError: ref({}) })
const content = ref<string>('')
const unitMap: Recordable = {
  'PT%sS': '秒',
  'PT%sM': '分钟',
  'PT%sH': '小时',
  'P%sD': '天',
  'P%sW': '周',
  'P%sM': '月'
}
watchEffect(() => {
  const errors: ErrorInfo[] = []
  const { id, name, waitType, unit, duration, timeDate } = props.node
  if (waitType === 'date') {
    content.value = `等至 ${timeDate || '?'}`
    if (!timeDate) {
      errors.push({ id: id, name: name, message: '未设置等待时间' })
    }
  } else if (waitType === 'duration') {
    content.value = `等待 ${duration} ${unitMap[unit]}`
    if (duration <= 0) {
      errors.push({ id: id, name: name, message: '未设置等待时长' })
    }
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
  <Node v-bind="$attrs" icon="el:Timer" color="#E872B7" :node="node">
    <el-text>{{ content }}</el-text>
  </Node>
</template>

<style scoped lang="scss"></style>
