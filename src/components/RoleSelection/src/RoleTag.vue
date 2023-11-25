<script setup lang="ts">
import {getById} from '~/api/modules/role'
import {componentSizeMap, useFormSize} from 'element-plus'
import {computed, onMounted, reactive} from "vue";

export interface RoleTagProps {
  id: string,
  type?: 'success' | 'info' | 'warning' | 'danger'
  closable?: boolean
}

const $props = withDefaults(defineProps<RoleTagProps>(), {
  closable: false,
  type: 'info'
})
const $emits = defineEmits<{
  (e: 'close', id: string): void
}>()

export interface RoleInfo {
  id?: string
  name?: string
}

let roleInfo = reactive<RoleInfo>({
  id: undefined,
  name: undefined
})
onMounted(() => {
  if (!$props.id) {
    throw new Error('username is required')
  }
  getById($props.id).then(res => {
    if (res.success) {
      console.log(res);
      roleInfo.id = res.data.id
      roleInfo.name = res.data.name
    }
  })
})
const getBaseUrl = computed(() => {
  const url = import.meta.env.VITE_API_URL
  if (url.startsWith('http')) {
    return url
  } else {
    return window.location.origin + url
  }
})
const formSize = useFormSize()
const getComponentSize = computed(() => {
  return componentSizeMap[formSize.value || 'default'] - 12
})
const onClose = () => {
  $emits('close', $props.id)
}

</script>
<template>
  <el-tag round :closable="$props.closable" :type="type" effect="light" @close="onClose">
    <div class="flex-center" style="gap: 4px;grid-gap: 4px;">
      <span>{{ roleInfo.name || id }}</span>
    </div>
  </el-tag>
</template>

<style scoped lang="scss">
:deep {
  .el-tag__content:only-child {
    margin-right: 4px;
  }
}
</style>
