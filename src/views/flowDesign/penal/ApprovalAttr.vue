<script setup lang="ts">
import Segmented from '~/components/Segmented'
import {useVModels} from '@vueuse/core'
import {ApprovalNode} from '../nodes/Approval/index'
import {ref} from "vue";
const activeName = ref('properties')
export interface ApprovalAttr {
  node: ApprovalNode
}
const $props = defineProps<ApprovalAttr>()
const $emits = defineEmits<{
  (e: 'update:node', modelValue: ApprovalNode): void
}>()
const {node} = useVModels($props, $emits)
</script>

<template>
  <segmented v-model="activeName" stretch :block="false">
    <el-tab-pane label="设置审批人" name="properties">
      <el-form label-position="top" label-width="90px">
        <el-form-item prop="assigneeType" label="审批对象">
          <el-radio-group v-model="node.assigneeType">
            <el-radio label="user">指定人员</el-radio>
            <el-radio label="role">指定角色</el-radio>
            <el-radio label="self_select">发起人自选</el-radio>
            <el-radio label="self">发起人自己</el-radio>
            <el-radio label="leader">多级上级</el-radio>
            <el-radio label="form_user">表单内人员</el-radio>
            <el-radio label="form_role">表单内角色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="assigneeType" label="指定人员" v-if="node.assigneeType === 'user'">
          待添加...
        </el-form-item>
        <el-form-item prop="selfSelect" label="发起人自选择" v-if="node.assigneeType === 'self_select'">
          <el-radio-group v-model="node.self">
            <el-radio-button :label="false">单选</el-radio-button>
            <el-radio-button :label="true">多选</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="self" label="发起人自己" v-if="node.assigneeType === 'self'">
          <el-text>
            发起人自己作为审批人进行审批
          </el-text>
        </el-form-item>
        <el-form-item prop="leader" label="直属上级" v-if="node.assigneeType === 'leader'">
          <el-select v-model="node.leader" placeholder="请选择直属上级">
            <el-option label="直属上级" :value="1"></el-option>
            <el-option label="二级上级" :value="2"></el-option>
            <el-option label="三级上级" :value="3"></el-option>
            <el-option label="四级上级" :value="4"></el-option>
            <el-option label="五级上级" :value="5"></el-option>
            <el-option label="六级上级" :value="6"></el-option>
            <el-option label="七级上级" :value="7"></el-option>
            <el-option label="八级上级" :value="8"></el-option>
            <el-option label="九级上级" :value="9"></el-option>
            <el-option label="十级上级" :value="10"></el-option>
            <el-option label="十一级上级" :value="11"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="role" label="系统角色" v-if="node.assigneeType === 'role'">
          待添加...
        </el-form-item>
        <el-form-item prop="assignedUser" label="表单内人员" v-if="node.assigneeType === 'form_user'">
          待添加...
        </el-form-item>

        <el-form-item prop="handler" label="审批人为空">
          <el-radio-group v-model="node.nobody">
            <el-radio label="pass">自动通过</el-radio>
            <el-radio label="reject">自动驳回</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="表单权限" name="formPermissions">
      表单权限设置
    </el-tab-pane>
    <el-tab-pane label="操作权限" name="operationPermissions">
      操作权限
    </el-tab-pane>
  </segmented>
</template>

<style scoped lang="scss">

</style>
