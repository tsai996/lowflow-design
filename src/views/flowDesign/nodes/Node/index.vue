<script setup lang="ts">
import AddBut from '../Add/index.vue'
import {useVModels} from '@vueuse/core'
import {ClickOutside as vClickOutside, componentSizeMap, ElInput, useFormSize} from 'element-plus'
import {FlowNode} from './index'
import {type Component, computed, inject, nextTick, ref} from "vue";
import {List, Stamp, Promotion, EditPen, CircleClose, Share} from "@element-plus/icons-vue";

export interface NodeProps {
  icon?: string
  node: FlowNode
  color?: string
  readOnly?: boolean
  close?: boolean
  arrow?: boolean
}

const icons: Record<string, Component> = {
  list: List,
  stamp: Stamp,
  share: Share,
  promotion: Promotion
}

const $props = withDefaults(defineProps<NodeProps>(), {
  readOnly: false,
  close: true,
  arrow: true
})
const $emits = defineEmits<{
  (e: 'update:node', title: string): void
}>()
const {node} = useVModels($props, $emits)
const showInput = ref(false)
const inputRef = ref<InstanceType<typeof ElInput>>()
const formSize = useFormSize()
const getComponentWidth = computed<string>(() => {
  return componentSizeMap[formSize.value || 'default'] + 205 + 'px'
})
const getComponentHeight = computed<string>(() => {
  return componentSizeMap[formSize.value || 'default'] + 60 + 'px'
})
const {addNode, delNode, openPenal} = inject<{
  addNode: (type: string, currentNode: FlowNode) => void
  delNode: (node: FlowNode) => void
  openPenal: (node: FlowNode) => void
}>('nodeHooks')!
const onOpenPenal = () => {
  if ($props.readOnly) return
  openPenal(node.value)
}
const onShowInput = () => {
  if ($props.readOnly) return
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
</script>

<template>
  <div class="node-box">
    <el-card shadow="always" @click="onOpenPenal()" class="node">
      <template #header>
        <div class="head">
          <div @click.stop v-if="showInput">
            <el-input ref="inputRef"
                      v-click-outside="onClickOutside"
                      @blur="onClickOutside"
                      maxlength="30"
                      v-model="node.name"/>
          </div>
          <el-text tag="b" truncated v-else @click.stop="onShowInput">
            {{ node.name }}
            <el-icon>
              <EditPen/>
            </el-icon>
          </el-text>
          <span v-if="icon">
            <el-icon :size="30" color="node-icon">
              <component :is="icons[icon.toLowerCase()]"/>
            </el-icon>
        </span>
        </div>
      </template>
      <div @click.stop>
        <el-popconfirm title="您确定要删除该节点吗？"
                       width="200"
                       :hide-after="0"
                       placement="right-start"
                       @confirm="delNode(node)">
          <template #reference>
            <el-button class='node-close'
                       v-show="close && !readOnly"
                       plain circle
                       :icon="CircleClose"
                       size="small"
                       type="danger"/>
          </template>
        </el-popconfirm>
      </div>
      <slot></slot>
    </el-card>
    <add-but @add-node="(type:string)=>addNode(type,node)"/>
  </div>
</template>

<style scoped lang="scss">
.node-box {
  position: relative;

  &:before {
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
  }

  .node {
    border-radius: 7px;
    cursor: pointer;
    position: relative;
    overflow: visible;
    min-height: v-bind(getComponentHeight);
    width: v-bind(getComponentWidth);

    .node-close {
      position: absolute;
      top: -10px;
      right: -10px;
      display: none;
    }

    &:hover {
      box-shadow: 0 0 5px 0 var(--el-color-primary);

      .node-close {
        display: block;
      }
    }

    :deep(.el-card__header) {
      padding: calc(var(--el-card-padding) - 18px) calc(var(--el-card-padding) - 13px);
      background: v-bind(color);
      border-radius: 7px 7px 0 0;

      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-input__wrapper {
          background-color: var(--el-card-bg-color);
        }

        .node-icon {
          color: transparent;
        }
      }
    }
  }
  .arrow{
   /* &:before{
      content: '';
      position: absolute;
      top: -13px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      border-style: solid;
      border-width: 8px 6px 0;
      border-color: var(--el-border-color) transparent transparent;
      background-color: var(--el-bg-color);
    }*/
  }
}
</style>
