<script setup lang="ts">
import type { FlowNode } from '@/views/flowDesign/nodes/type'

const props = defineProps<{
  node: FlowNode
}>()
const drawer = ref(false)
const addListener = () => {
  if (!props.node.executionListeners) {
    props.node.executionListeners = []
  }
  props.node.executionListeners?.push({
    event: 'start',
    implementationType: 'delegateExpression',
    implementation: ''
  })
}
const delListener = (index: number) => {
  props.node.executionListeners?.splice(index, 1)
}
</script>

<template>
  <div>
    <slot>
      <el-badge :value="node.executionListeners?.length || 0" class="item" type="primary">
        <el-button icon="Setting" @click="drawer = true"> 配置</el-button>
      </el-badge>
    </slot>
    <el-drawer v-model="drawer" title="执行监听器">
      <div class="flex-col">
        <el-button @click="addListener" type="primary" icon="Plus">添加监听器</el-button>
        <div v-for="(item, index) in node.executionListeners" :key="index" class="listener-box">
          <el-button
            class="listener-close"
            @click="delListener(index)"
            plain
            circle
            icon="CircleClose"
            size="small"
            type="danger"
          />
          <el-form-item label="事件" :prop="`executionListeners.${index}.event`">
            <el-radio-group v-model="item.event">
              <el-radio-button label="开始" value="start" />
              <el-radio-button label="结束" value="end" />
              <el-radio-button label="迁移" value="take" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="类型" :prop="`executionListeners.${index}.implementationType`">
            <el-radio-group v-model="item.implementationType">
              <el-radio-button label="委托表达式" value="delegateExpression" />
              <el-radio-button label="java类" value="class" />
              <el-radio-button label="表达式" value="expression" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="监听器" :prop="`executionListeners.${index}.implementation`">
            <template #label>
              <div class="flex-items-center gap3px">
                <span>监听器</span>
                <el-tooltip placement="top-start">
                  <template #content>
                    实现 ExecutionListener 接口 <br />
                    委托表达式：${myExecutionListener} <br />
                    表达式: ${myExecutionListener.notify(execution)} <br />
                    java类：${com.example.listener.MyExecutionListener}
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
