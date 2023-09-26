<script setup lang="ts">
import Segmented from '~/components/Segmented'
import {useVModels} from '@vueuse/core'
import {StartNode} from '../nodes/Start/index'
import {ref} from "vue";
const activeName = ref('formPermissions')
export interface ApprovalAttr {
  node: StartNode
}
const $props = defineProps<ApprovalAttr>()
const $emits = defineEmits<{
  (e: 'update:node', modelValue: StartNode): void
}>()
const {node} = useVModels($props, $emits)
</script>

<template>
  <segmented v-model="activeName" stretch :block="false">
    <el-tab-pane label="表单权限" name="formPermissions">
      待添加...
    </el-tab-pane>
    <el-tab-pane label="操作权限" name="operationPermissions">
      待添加...
    </el-tab-pane>
  </segmented>
</template>

<style scoped lang="scss">

</style>
