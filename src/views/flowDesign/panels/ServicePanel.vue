<script setup lang="ts">
import type { ServiceNode } from '../nodes/type'

defineProps<{
  activeData: ServiceNode
}>()
</script>

<template>
  <el-form label-position="top">
    <el-form-item prop="implementationType" :label="$t('执行类型')">
      <el-select v-model="activeData.implementationType" :placeholder="$t('请选择执行类型')">
        <el-option :label="$t('类')" value="class" />
        <el-option :label="$t('表达式')" value="expression" />
        <el-option :label="$t('委托表达式')" value="delegateExpression" />
      </el-select>
    </el-form-item>
    <el-form-item prop="implementation" :label="$t('执行值')">
      <template #label>
        <div class="flex-items-center gap3px">
          <span>{{ $t('执行值') }}</span>
          <el-tooltip placement="top-start">
            <template #content>
              {{ $t('实现 JavaDelegate 接口') }} <br />
              {{ $t('类') }}: ${com.example.delegate.MyServiceDelegate} <br />
              {{ $t('表达式') }}: ${myServiceDelegate.execute(execution)} <br />
              {{ $t('委托表达式') }}: ${myServiceDelegate}
            </template>
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </div>
      </template>
      <el-input v-model="activeData.implementation" :placeholder="$t('请输入执行值')" clearable />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
