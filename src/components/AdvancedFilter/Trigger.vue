<script setup lang="ts">
import type { Field } from '@/components/Render/type'
import type { FilterRules } from '@/components/AdvancedFilter/type'
import { useVModel } from '@vueuse/core'

const $props = defineProps<{
  modelValue: any
  options: Field[]
  filterRules: FilterRules
}>()
const $emits = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()
const data = useVModel($props, 'modelValue', $emits)
</script>

<template>
  <el-select class="trigger-container" v-model="data" filterable placeholder="选择字段">
    <el-option v-for="item in $props.options" :key="item.id" :label="item.label" :value="item.id" />
  </el-select>
</template>

<style scoped lang="scss"></style>
