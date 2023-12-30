<script setup lang="ts">
import {ApprovalNode} from './index'
import {inject, Ref, ref, watchEffect} from "vue";
import {getList, User} from '~/api/modules/user'
import {getList as getRoles, Role} from '~/api/modules/role'
import {Field} from "~/components/Render/interface";

export interface ApprovalContentProps {
  node: ApprovalNode
}

const $props = withDefaults(defineProps<ApprovalContentProps>(), {})
const content = ref<string>('')
const {fields} = inject<{
  fields: Ref<Field[]>
}>('nodeHooks')!
watchEffect(() => {
  const props = $props.node
  if (props.assigneeType === 'choice') {
    content.value = `发起人自选（${props.choice ? '多选' : '单选'}）`
  } else if (props.assigneeType === 'self') {
    content.value = '发起人自己'
  } else if (props.assigneeType === 'leader') {
    content.value = props.leader === 1 ? '直属上级' : `${props.leader}级上级`
  } else if (props.assigneeType === 'formUser') {
    const title = fields.value.find(e => e.id === props.formUser)?.title || props.formUser || '?'
    content.value = `表单内（${title}）人员`
  } else if (props.assigneeType === 'formRole') {
    const title = fields.value.find(e => e.id === props.formRole)?.title || props.formRole || '?'
    content.value = `表单内（${title}）角色`
  } else if (props.assigneeType === 'user') {
    if (props.users.length > 0) {
      getList(props.users).then(res => {
        if(res.success){
          content.value = res.data.map((item: User) => item.name).join('、')
        }
      })
    } else {
      content.value = '未指定人员'
    }
  } else if (props.assigneeType === 'role') {
    if (props.roles.length > 0) {
      getRoles(props.roles).then(res => {
        if(res.success){
          content.value = res.data.map((item: Role) => item.name).join('、')
        }
      })
    } else {
      content.value = '未指定角色'
    }
  } else {
    content.value = $props.node.name
  }
})

</script>

<template>
  <el-text>
    {{ content || node.name }}
  </el-text>
</template>

<style scoped lang="scss">

</style>
