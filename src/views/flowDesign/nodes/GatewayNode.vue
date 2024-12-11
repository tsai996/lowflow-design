<script setup lang="ts">
import TreeNode from './TreeNode.vue'
import type { BranchNode, FlowNode, NodeType } from './type'
import Add from './Add.vue'
import type { Ref } from 'vue'

const $emits = defineEmits<{
  (e: 'addNode', type: NodeType, node: FlowNode): void
}>()
const props = defineProps<{
  node: BranchNode
}>()
const { readOnly } = inject<{
  readOnly?: Ref<boolean>
}>('flowDesign', { readOnly: ref(false) })
const addNode = (type: NodeType, node?: FlowNode) => {
  $emits('addNode', type, node || props.node)
}
const moveRight = (index: number) => {
  const node = props.node.branches[index]
  props.node.branches.splice(index, 1)
  props.node.branches.splice(index + 1, 0, node)
}
const moveLeft = (index: number) => {
  const node = props.node.branches[index]
  props.node.branches.splice(index, 1)
  props.node.branches.splice(index - 1, 0, node)
}
</script>

<template>
  <div class="gateway-node">
    <div class="add-branch">
      <slot :addNode="addNode" :readOnly="readOnly"></slot>
    </div>
    <div v-for="(item, index) in node.branches" :key="item.id" class="col-box">
      <template v-if="index === 0">
        <div class="top-left-border"></div>
        <div class="bottom-left-border" />
      </template>
      <template v-else-if="node.branches.length === index + 1">
        <div class="top-right-border"></div>
        <div class="bottom-right-border" />
      </template>
      <TreeNode :node="item" v-bind="$attrs" @addNode="addNode" class="col-node">
        <template #append>
          <div
            class="move-left"
            @click.stop="moveLeft(index)"
            v-show="index !== 0 && node.branches.length !== index + 1 && !readOnly"
          >
            <svg-icon name="el:ArrowLeft" />
          </div>
          <div
            class="move-right"
            @click.stop="moveRight(index)"
            v-show="![index + 1, index + 2].includes(node.branches.length) && !readOnly"
          >
            <svg-icon name="el:ArrowRight" />
          </div>
        </template>
      </TreeNode>
    </div>
  </div>
  <Add @addNode="addNode" class="branch-but" />
</template>

<style scoped lang="scss">
.gateway-node {
  display: flex;
  border-top: var(--el-border);
  border-bottom: var(--el-border);
  overflow: visible;
  position: relative;

  .add-branch {
    position: absolute;
    left: 50%;
    top: -15px;
    z-index: 2;
    transform: translateX(-50%);
  }

  .col-box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--flow-bg-color);

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 1px;
      height: 100%;
      background-color: var(--el-border-color);
    }

    .top-left-border {
      position: absolute;
      left: 0;
      top: -3px;
      height: 3px;
      width: 50%;
      background-color: var(--flow-bg-color);
    }

    .bottom-left-border {
      position: absolute;
      left: 0;
      bottom: -3px;
      height: 3px;
      width: 50%;
      background-color: var(--flow-bg-color);
    }

    .top-right-border {
      position: absolute;
      right: 0;
      top: -3px;
      height: 3px;
      width: 50%;
      background-color: var(--flow-bg-color);
    }

    .bottom-right-border {
      position: absolute;
      right: 0;
      bottom: -3px;
      height: 3px;
      width: 50%;
      background-color: var(--flow-bg-color);
    }
  }
}

.col-node {
  &:hover {
    .move-right,
    .move-left {
      opacity: 1;
    }
  }
}

.move-right,
.move-left {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  opacity: 0;

  &:hover {
    background-color: var(--el-color-primary-light-9);
  }
}

.move-left {
  left: 0;
}

.move-right {
  right: 0;
}
</style>
