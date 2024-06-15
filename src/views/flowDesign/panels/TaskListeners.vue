<script setup lang="ts">
import type { ApprovalNode } from '@/views/flowDesign/nodes/type'

const props = defineProps<{
  node: ApprovalNode
}>()
const drawer = ref(false)
const addListener = () => {
  if (!props.node.taskListeners) {
    props.node.taskListeners = []
  }
  props.node.taskListeners?.push({
    event: 'create',
    implementationType: 'delegateExpression',
    implementation: ''
  })
}
const delListener = (index: number) => {
  props.node.taskListeners?.splice(index, 1)
}
</script>

<template>
  <div>
    <slot>
      <el-badge :value="node.taskListeners?.length || 0" class="item" type="primary">
        <el-button icon="Setting" @click="drawer = true"> 配置</el-button>
      </el-badge>
    </slot>
    <el-drawer v-model="drawer" title="任务监听器">
      <div class="flex-col">
        <el-button @click="addListener" type="primary" icon="Plus">添加监听器</el-button>
        <div v-for="(item, index) in node.taskListeners" :key="index" class="listener-box">
          <el-button
            class="listener-close"
            @click="delListener(index)"
            plain
            circle
            icon="CircleClose"
            size="small"
            type="danger"
          />
          <el-form-item label="事件" :prop="`taskListeners.${index}.event`">
            <el-radio-group v-model="item.event">
              <el-radio-button label="创建" value="create" />
              <el-radio-button label="指派" value="assignment" />
              <el-radio-button label="完成" value="complete" />
              <el-radio-button label="删除" value="delete" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="类型" :prop="`taskListeners.${index}.implementationType`">
            <el-radio-group v-model="item.implementationType">
              <el-radio-button label="委托表达式" value="delegateExpression" />
              <el-radio-button label="java类" value="class" />
              <el-radio-button label="表达式" value="expression" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="监听器" :prop="`taskListeners.${index}.implementation`">
            <template #label>
              <div class="flex-items-center gap3px">
                <span>监听器</span>
                <el-tooltip placement="top-start">
                  <template #content>
                    委托表达式：${myCreateTaskListener} <br />
                    表达式: ${myCreateTaskListener.notify(execution)} <br />
                    java类：${com.example.listener.MyCreateTaskListener}
                  </template>
                  <el-icon>
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="item.implementation" placeholder="请输入监听器" clearable>
            </el-input>
          </el-form-item>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.listener-box {
  border: 1px dashed var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  margin-top: 10px;
  padding: 7px;
  position: relative;

  &:hover {
    border-color: var(--el-color-primary);

    .listener-close {
      display: block;
    }
  }

  .listener-close {
    position: absolute;
    top: -7px;
    right: -7px;
    z-index: 1;
    display: none;
  }
}
</style>
