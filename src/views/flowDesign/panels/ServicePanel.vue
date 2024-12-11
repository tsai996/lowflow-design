<script setup lang="ts">
import type { ServiceNode } from '../nodes/type'

defineProps<{
  activeData: ServiceNode
}>()
</script>

<template>
  <el-form label-position="top">
    <el-form-item prop="implementationType" label="执行类型">
      <el-select v-model="activeData.implementationType" placeholder="请选择执行类型">
        <el-option label="类" value="class" />
        <el-option label="表达式" value="expression" />
        <el-option label="委托表达式" value="delegateExpression" />
      </el-select>
    </el-form-item>
    <el-form-item prop="implementation" label="执行值">
      <template #label>
        <div class="flex-items-center gap3px">
          <span>执行值</span>
          <el-tooltip placement="top-start">
            <template #content>
              实现 JavaDelegate 接口 <br />
              类：${com.example.delegate.MyServiceDelegate} <br />
              表达式: ${myServiceDelegate.execute(execution)} <br />
              委托表达式：${myServiceDelegate}
            </template>
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </div>
      </template>
      <el-input v-model="activeData.implementation" placeholder="请输入执行值" clearable />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
