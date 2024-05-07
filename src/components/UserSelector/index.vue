<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import UserTag from './UserTag.vue'
import UserPicker, { type ModelValueType } from './UserPicker.vue'
import { useFormDisabled, useFormSize } from 'element-plus'
import { type CSSProperties } from 'vue'

export interface UserSelectorProps {
  modelValue: ModelValueType
  placeholder?: string
  multiple?: boolean
  disabled?: boolean
  style?: CSSProperties
}

const $props = withDefaults(defineProps<UserSelectorProps>(), {
  multiple: false,
  disabled: false,
  placeholder: '请选择用户'
})
const $emits = defineEmits<{
  (e: 'update:modelValue', modelValue: ModelValueType): void
}>()
const value = useVModel($props, 'modelValue', $emits)
const valueArr = computed<string[]>(() => {
  if (!value.value) return []
  return Array.isArray(value.value) ? value.value : [value.value]
})
const userPickerRef = ref<InstanceType<typeof UserPicker>>()
const formDisabled = useFormDisabled()
const formSize = useFormSize()
const disabled = computed<boolean>(() => {
  return formDisabled.value || $props.disabled
})
const openUserPicker = () => {
  userPickerRef.value?.open()
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
  <user-picker ref="userPickerRef" :multiple="multiple" v-model="value" />
  <div class="user-wrapper">
    <el-button
      class="user-but-item"
      :size="formSize"
      :disabled="disabled"
      @click="openUserPicker"
      circle
    >
      <svg-icon name="add-user" />
    </el-button>
    <user-tag
      v-for="item in valueArr"
      :closable="!disabled"
      :key="item"
      :username="item"
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

.user-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-gap: 7px;
  gap: 7px;

  .placeholder {
    color: var(--el-text-color-placeholder);
  }

  .user-but-item {
    border-style: dashed;

    &:hover {
      border-style: solid;
    }
  }
}
</style>
