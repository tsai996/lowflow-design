<script setup lang="ts">
import Segmented from '~/components/Segmented'
import {useVModels} from '@vueuse/core'
import {CcNode} from '../nodes/Cc/index'
import {ref} from "vue";
const activeName = ref('properties')
export interface ApprovalAttr {
  node: CcNode
}
const $props = defineProps<ApprovalAttr>()
const $emits = defineEmits<{
  (e: 'update:node', modelValue: CcNode): void
}>()
const {node} = useVModels($props, $emits)
</script>

<template>
  <segmented v-model="activeName" stretch :block="false">
    <el-tab-pane label="设置抄送人" name="properties">
      <el-form label-position="top" label-width="90px">
        <el-form-item prop="assigneeType" label="抄送人">
          待添加...
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="表单权限" name="formPermissions">
      待添加...
    </el-tab-pane>
  </segmented>
</template>

<style scoped lang="scss">

</style>
