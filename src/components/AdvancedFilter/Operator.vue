<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const $props = defineProps<{
  modelValue: string
}>()
const operatorOptions = computed(() => [
  {
    value: 'eq',
    label: t('等于')
  },
  {
    value: 'ne',
    label: t('不等于')
  },
  {
    label: t('包含'),
    value: 'in'
  },
  {
    label: t('不包含'),
    value: 'ni'
  }
])
const $emits = defineEmits<{
  (e: 'update:modelValue', modelValue: any): void
}>()
const data = useVModel($props, 'modelValue', $emits)
</script>

<template>
  <el-select class="operator-container" v-model="data" filterable :placeholder="t('筛选符')">
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
