<script setup lang="ts">
import {useVModel} from '@vueuse/core'

const $props = defineProps<{
  modelValue: string
}>()
const operatorOptions = [
  {
    value: 'equal',
    label: '等于'
  },
  {
    value: 'not_equal',
    label: '不等于'
  },
  {
    label: '包含',
    value: 'contains'
  },
  {
    label: '不包含',
    value: 'not_contain'
  }
]
const $emits = defineEmits<{
  (e: 'update:modelValue', modelValue: any): void
}>()
const data = useVModel($props, 'modelValue', $emits)
</script>

<template>
  <el-select class="operator-container" v-model="data" filterable placeholder="筛选符">
    <el-option
        v-for="item in operatorOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
</template>

<style scoped lang="scss">
.operator-container {
  width: 100%;
  flex-shrink: 0;
}
</style>
