<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import RoleTag from './RoleTag.vue'
import RolePicker, { type ModelValueType } from './RolePicker.vue'
import { useFormDisabled, useFormSize } from 'element-plus'
import type { CSSProperties } from 'vue'

export interface RoleSelectorProps {
  modelValue: ModelValueType
  placeholder?: string
  multiple?: boolean
  disabled?: boolean
  style?: CSSProperties
}

const $props = withDefaults(defineProps<RoleSelectorProps>(), {
  multiple: false,
  disabled: false,
  placeholder: '请选择角色'
})
const $emits = defineEmits<{
  (e: 'update:modelValue', modelValue: ModelValueType): void
}>()
const value = useVModel($props, 'modelValue', $emits)
const valueArr = computed<string[]>(() => {
  if (!value.value) return []
  return Array.isArray(value.value) ? value.value : [value.value]
})
const RolePickerRef = ref<InstanceType<typeof RolePicker>>()
const formDisabled = useFormDisabled()
const formSize = useFormSize()
const disabled = computed<boolean>(() => {
  return formDisabled.value || $props.disabled
})
const openRolePicker = () => {
  RolePickerRef.value?.open()
}
const onClose = (username: string) => {
  if (!value.value) return
  if ($props.multiple && Array.isArray(value.value)) {
    value.value.splice(value.value.indexOf(username), 1)
  } else {
    value.value = null
  }
}
</script>

<template>
  <role-picker ref="RolePickerRef" :multiple="multiple" v-model="value" />
  <div class="role-wrapper">
    <el-button
      class="role-but-item"
      :size="formSize"
      :disabled="disabled"
      @click="openRolePicker"
      circle
    >
      <el-icon>
        <Avatar />
      </el-icon>
    </el-button>
    <RoleTag
      v-for="item in valueArr"
      :closable="!disabled"
      :key="item"
      :id="item"
      @close="onClose"
    />
    <el-text v-show="!value || value.length === 0" class="placeholder">
      {{ placeholder }}
    </el-text>
  </div>
</template>

<style scoped lang="scss">
.el-tag {
  padding: 0 3px;
}

.role-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-gap: 7px;
  gap: 7px;

  .placeholder {
    color: var(--el-text-color-placeholder);
  }

  .role-but-item {
    border-style: dashed;

    &:hover {
      border-style: solid;
    }
  }
}
</style>
