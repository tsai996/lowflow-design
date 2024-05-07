<script setup lang="ts">
import { getByUsername } from '@/api/modules/user'
import { componentSizeMap, useFormSize } from 'element-plus'

export interface UserTagProps {
  username: string
  type?: 'success' | 'info' | 'warning' | 'danger'
  closable?: boolean
}

const $props = withDefaults(defineProps<UserTagProps>(), {
  closable: false,
  type: 'info'
})
const $emits = defineEmits<{
  (e: 'close', username: string): void
}>()

export interface UserInfo {
  username?: string
  avatar?: string
  name?: string
}

let userInfo = reactive<UserInfo>({
  username: undefined,
  avatar: undefined,
  name: undefined
})
onMounted(() => {
  if (!$props.username) {
    throw new Error('username is required')
  }
  getByUsername($props.username).then((res) => {
    if (res.success) {
      userInfo.username = res.data.username
      userInfo.avatar = res.data.avatar
      userInfo.name = res.data.name
    }
  })
})
const formSize = useFormSize()
const getComponentSize = computed(() => {
  return componentSizeMap[formSize.value || 'default'] - 12
})
const onClose = () => {
  $emits('close', $props.username)
}
</script>
<template>
  <el-tag round :closable="$props.closable" :type="type" effect="light" @close="onClose">
    <div class="flex-center" style="gap: 4px; grid-gap: 4px">
      <el-avatar :size="getComponentSize" :src="userInfo.avatar">
        {{ (userInfo.name || username).charAt(0) }}
      </el-avatar>
      <span>{{ userInfo.name || username }}</span>
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
