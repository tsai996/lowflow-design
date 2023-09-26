<script setup lang="ts">
import NodeTree from '../index.vue'
import AddBut from '../Add/index.vue'
import {BranchNode} from './index'
import {FlowNode} from '../Node/index'
import {inject} from "vue";

export interface BranchProps {
  node: BranchNode
}

withDefaults(defineProps<BranchProps>(), {})
const {addNode} = inject<{
  addNode: (type: string, node: FlowNode) => void
}>('nodeHooks')!
</script>

<template>
  <div class="branch-node">
    <!--添加新分支按钮-->
    <div class="add-branch">
      <slot></slot>
    </div>
    <!--分支节点-->
    <div v-for="(item,index) in node.children" :key="item.id" class="col-box">
      <template v-if="node.children.length===(index+1)">
        <div :class="`top-right-border`"></div>
        <div :class="`bottom-right-border`"/>
      </template>
      <template v-if="index===0">
        <div :class="`top-left-border`"></div>
        <div :class="`bottom-left-border`"/>
      </template>
      <node-tree :node="item"/>
    </div>
  </div>
  <!--添加节点-->
  <add-but @add-node="(type:string)=>addNode(type,node)" class="branch-but"/>
</template>

<style scoped lang="scss">
.branch-node {
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
    background-color: var(--el-bg-color);
    &:before{
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
      top: -2px;
      height: 3px;
      width: 50%;
      background-color: var(--el-bg-color);
    }

    .bottom-left-border {
      position: absolute;
      left: 0;
      bottom: -2px;
      height: 3px;
      width: 50%;
      background-color: var(--el-bg-color);
    }

    .top-right-border {
      position: absolute;
      right: 0;
      top: -2px;
      height: 3px;
      width: 50%;
      background-color: var(--el-bg-color);
    }

    .bottom-right-border {
      position: absolute;
      right: 0;
      bottom: -2px;
      height: 3px;
      width: 50%;
      background-color: var(--el-bg-color);
    }
  }
}

.branch-but {
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
}
</style>
