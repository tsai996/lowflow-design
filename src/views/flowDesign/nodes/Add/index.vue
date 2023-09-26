<script setup lang="ts">
import {type ElPopover} from 'element-plus'
import {ref} from "vue";
import {Stamp,Promotion,Share,Plus} from "@element-plus/icons-vue";
const nodePopoverRef = ref<InstanceType<typeof ElPopover>>()
const $emits = defineEmits<{
  (e: 'addNode', type: string): void
}>()
const addApprovalNode = () => {
  $emits('addNode', 'approval')
  nodePopoverRef.value?.hide()
}
const addCcNode = () => {
  $emits('addNode', 'cc')
  nodePopoverRef.value?.hide()
}
const addExclusiveNode = () => {
  $emits('addNode', 'exclusive')
  nodePopoverRef.value?.hide()
}
</script>

<template>
  <div class="add-but">
    <el-popover placement="bottom-start" ref="nodePopoverRef" trigger="click" title="添加节点" :width="235">
      <div class="node-select">
        <div @click="addApprovalNode">
          <el-icon color="#ff943e">
            <Stamp/>
          </el-icon>
          <span>审批人</span>
        </div>
        <div @click="addCcNode">
          <el-icon color="#3296fa">
            <Promotion/>
          </el-icon>
          <span>抄送人</span>
        </div>
        <div @click="addExclusiveNode">
          <el-icon>
            <Share/>
          </el-icon>
          <span>互斥分支</span>
        </div>
      </div>
      <template #reference>
        <el-button
            :icon="Plus"
            type="primary"
            style="z-index: 1"
            circle></el-button>
      </template>
    </el-popover>
  </div>
</template>

<style scoped lang="scss">
.node-select {
  p {
    font-size: 16px;
    font-weight: 700;
    margin-top: 2px;
    margin-bottom: 5px;
  }

  div {
    display: inline-block;
    margin: 5px 5px;
    cursor: pointer;
    padding: 10px 15px;
    border: var(--el-border);
    border-radius: 10px;
    width: 170px;
    position: relative;

    span {
      position: absolute;
      left: 65px;
      top: 18px;
    }

    &:hover {
      background-color: var(--el-color-primary-light-9);
      box-shadow: var(--el-box-shadow-light);
      color: var(--el-color-primary);
    }

    i {
      font-size: 25px;
      padding: 5px;
      border: var(--el-border);
      border-radius: 50%;
    }
  }
}

.add-but {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0 32px;
  position: relative;

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
    // background-color: var(--el-border-color);
  }
}
</style>
