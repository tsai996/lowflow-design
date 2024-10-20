<script setup lang="ts">
import type { ErrorInfo, FlowNode, NodeType } from './type'
import { ClickOutside as vClickOutside, type InputInstance } from 'element-plus'
import Add from './Add.vue'
import type { Ref } from 'vue'

const _inject = inject<{
  readOnly?: Ref<boolean>
  nodesError: Ref<Recordable<ErrorInfo[]>>
}>('flowDesign', { readOnly: ref(false), nodesError: ref({}) })
const $emits = defineEmits<{
  (e: 'addNode', type: NodeType, node: FlowNode): void
  (e: 'delNode', node: FlowNode): void
  (e: 'activeNode', node: FlowNode): void
}>()
const $props = withDefaults(
  defineProps<{
    icon?: string
    node: FlowNode
    color?: string
    readOnly?: boolean
    close?: boolean
  }>(),
  {
    readOnly: false,
    close: true
  }
)
const errorInfo = computed<ErrorInfo[] | undefined>(() => _inject.nodesError.value[$props.node.id])
const _readOnly = computed(() => _inject.readOnly?.value || $props.readOnly)
const showInput = ref(false)
const inputRef = ref<InputInstance>()
const onShowInput = () => {
  if (_readOnly.value) return
  showInput.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}
const onClickOutside = () => {
  if (showInput.value) {
    showInput.value = false
  }
}
const activeNode = () => {
  if (_readOnly.value) return
  $emits('activeNode', $props.node)
}
const addNode = (type: NodeType) => {
  $emits('addNode', type, $props.node)
}
const delNode = () => {
  $emits('delNode', $props.node)
}
</script>

<template>
  <div class="node-box">
    <div @click="activeNode" :class="['node', { 'error-node': errorInfo?.length && !_readOnly }]">
      <!--头部-->
      <div class="node-header">
        <!--删除按钮-->
        <span @click.stop>
          <el-popconfirm
            title="您确定要删除该节点吗？"
            width="200"
            :hide-after="0"
            placement="right-start"
            @confirm="delNode"
          >
            <template #reference>
              <el-button
                class="node-close"
                v-show="close && !_readOnly"
                plain
                circle
                icon="CircleClose"
                size="small"
                type="danger"
              />
            </template>
          </el-popconfirm>
        </span>
        <div class="head">
          <div @click.stop v-if="showInput">
            <el-input
              ref="inputRef"
              v-click-outside="onClickOutside"
              @blur="onClickOutside"
              maxlength="30"
              v-model="node.name"
            />
          </div>
          <el-text tag="b" truncated v-else @click.stop="onShowInput">
            {{ node.name }}
            <el-icon>
              <EditPen />
            </el-icon>
          </el-text>
          <slot name="icon">
            <svg-icon :size="30" color="node-icon" v-if="icon" :name="icon" />
          </slot>
        </div>
        <!--错误提示-->
        <el-tooltip placement="top-start">
          <template #content>
            <div v-for="err in errorInfo" :key="err.id">
              {{ err.message }}
            </div>
          </template>
          <el-icon class="warn-icon" :size="20" v-show="errorInfo?.length && !_readOnly">
            <WarnTriangleFilled @click.stop />
          </el-icon>
        </el-tooltip>
      </div>
      <!--插槽内容-->
      <div class="node-content">
        <slot></slot>
      </div>
    </div>
    <Add @add-node="addNode" />
  </div>
</template>

<style scoped lang="scss">
.node-box {
  position: relative;

  /* &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 1px;
    height: 100%;
    background-color: var(--el-border-color);
  }*/

  &:after {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translate(-50%);
    border-style: solid;
    width: 0;
    border-width: 8px 6px 4px;
    border-color: var(--el-border-color) transparent transparent;
    background-color: var(--flow-bg-color);
  }

  .warn-icon {
    cursor: pointer;
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--el-color-error);
  }

  .node {
    border-radius: 7px;
    cursor: pointer;
    position: relative;
    // overflow: visible;
    min-height: 90px;
    width: 230px;
    z-index: 10;
    color: var(--el-text-color-primary);
    border: 1px solid var(--el-border-color-light);
    background-color: var(--el-bg-color-overlay);
    box-shadow: var(--el-box-shadow-light);

    &.error-node {
      box-shadow: 0 0 5px 0 var(--el-color-error-light-3);
    }

    .node-header {
      padding: 2px 7px;
      border-radius: 7px 7px 0 0;
      background: v-bind(color);
      box-sizing: border-box;
      border-bottom: 1px solid var(--el-border-color-light);

      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        :deep(.el-input__wrapper) {
          background-color: var(--el-bg-color-overlay);
        }
      }

      .node-close {
        position: absolute;
        top: -10px;
        right: -10px;
        z-index: 10;
        display: none;
      }
    }

    .node-content {
      position: relative;
      padding: 20px;
    }

    &:hover {
      &:not(.error-node) {
        box-shadow: 0 0 5px 0 var(--el-color-primary);
      }

      .node-close {
        display: block;
      }
    }
  }
}
</style>
