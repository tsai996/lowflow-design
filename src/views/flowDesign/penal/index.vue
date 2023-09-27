<script setup lang="ts">
import {ClickOutside as vClickOutside} from 'element-plus'
import {FlowNode} from '../nodes/Node/index'
import {type Component, ref} from 'vue'
import ApprovalAttr from './ApprovalAttr.vue'
import CcAttr from './CcAttr.vue'
import StartAttr from './StartAttr.vue'

const nodeProps: Record<string, Component> = {
  start: StartAttr,
  approval: ApprovalAttr,
  cc: CcAttr
}

let flowNode = ref<FlowNode | undefined>()
const visible = ref(false)
const showInput = ref(false)
const onClickOutside = () => {
  if (showInput.value) {
    showInput.value = false
  }
}
const open = (node: FlowNode) => {
  flowNode.value = node
  visible.value = true
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="visible" v-if="visible" size="35%">
    <template #header="{ titleId, titleClass }">
      <span :id="titleId" :class="titleClass">
          <el-input v-click-outside="onClickOutside" @blur="onClickOutside" maxlength="30" v-model="flowNode!.name"
                    v-show="showInput"
          ></el-input>
          <el-link icon="EditPen" v-show="!showInput" @click="showInput = true">
            {{ flowNode!.name }}
          </el-link>
      </span>
    </template>
    <template #default>
      <component
          :node="flowNode"
          :is="nodeProps[flowNode!.type]"/>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
:deep(.el-tabs__content) {
  margin-top: 10px;
}
</style>
