<script setup lang="ts">
import type { FlowNode } from '@/views/flowDesign/nodes/type'
import type { Ref } from 'vue'

const _inject = inject<{
  readOnly?: Ref<boolean>
}>('flowDesign', { readOnly: ref(false) })
const $emits = defineEmits<{
  (e: 'activeNode', node: FlowNode): void
}>()
const $props = withDefaults(
  defineProps<{
    node: FlowNode
    readOnly?: boolean
  }>(),
  {
    readOnly: false
  }
)
const _readOnly = computed(() => _inject.readOnly?.value || $props.readOnly)
const activeNode = () => {
  if (_readOnly.value) return
  $emits('activeNode', $props.node)
}
</script>

<template>
  <div class="node-box">
    <div class="end-node-circle"></div>
    <div class="end-node" @click="activeNode">
      <el-text>{{ node.name }}</el-text>
    </div>
  </div>
</template>

<style scoped lang="scss">
.node-box {
  position: relative;
  padding-bottom: 50px;

  .end-node-circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--el-border-color);
    margin: auto auto 5px;
  }

  .end-node {
    position: relative;
    background: var(--el-border-color-lighter);
    padding: 7px 20px;
    border-radius: 24px;
    cursor: pointer;
    overflow: visible;
    z-index: 10;
    box-shadow: var(--el-box-shadow-light);

    &:hover {
      box-shadow: 0 0 5px 0 var(--el-color-primary);
    }
  }
}
</style>
