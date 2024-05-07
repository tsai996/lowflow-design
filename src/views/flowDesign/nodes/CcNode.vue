<script setup lang="ts">
import Node from './Node.vue'
import type { CcNode } from './type'
import type { Ref } from 'vue'
import type { ErrorInfo } from './type'
import type { Field } from '@/components/Render/type'
import { getById } from '@/api/modules/role'
import { getByUsername } from '@/api/modules/user'

const props = defineProps<{
  node: CcNode
}>()
const { fields, nodesError } = inject<{
  fields: Ref<Field[]>
  nodesError: Ref<Recordable<ErrorInfo[]>>
}>('flowDesign', { fields: ref([]), nodesError: ref({}) })
const content = ref<string>('')
watchEffect(() => {
  const errors: ErrorInfo[] = []
  const { id, assigneeType, name, users, roles, leader, choice, formUser, formRole, orgLeader } =
    props.node
  if (assigneeType === 'user') {
    if (users.length > 0) {
      const all = users.map((user) => getByUsername(user))
      Promise.all(all).then((users) => {
        content.value = users.map((user) => user.data.name).join('、')
      })
    } else {
      errors.push({ id: id, name: name, message: '未指定人员' })
      content.value = '未指定人员'
    }
  } else if (assigneeType === 'choice') {
    content.value = `发起人自选（${choice ? '多选' : '单选'}）`
  } else if (assigneeType === 'self') {
    content.value = '发起人自己'
  } else if (assigneeType === 'leader') {
    content.value = leader === 1 ? '直属上级' : `${leader}级上级`
  } else if (assigneeType === 'orgLeader') {
    content.value = orgLeader === 1 ? '直属主管' : `${orgLeader}级主管`
  } else if (assigneeType === 'formUser') {
    if (!formUser) {
      errors.push({ id: id, name: name, message: '未指定表单内人员' })
    }
    const title = fields.value.find((e) => e.id === formUser)?.label || formUser || '?'
    content.value = `表单内（${title}）人员`
  } else if (assigneeType === 'formRole') {
    if (!formRole) {
      errors.push({ id: id, name: name, message: '未指定表单内角色' })
    }
    const title = fields.value.find((e) => e.id === formRole)?.label || formRole || '?'
    content.value = `表单内（${title}）角色`
  } else if (assigneeType === 'role') {
    if (roles.length > 0) {
      const all = roles.map((id) => getById(id))
      Promise.all(all).then((roles) => {
        content.value = roles.map((res) => res.data.name).join('、')
      })
    } else {
      errors.push({ id: id, name: name, message: '未指定角色' })
      content.value = '未指定角色'
    }
  } else {
    errors.push({ id: id, name: name, message: '未知错误' })
    content.value = name
  }

  // 记录错误
  if (errors.length > 0) {
    nodesError.value[id] = errors
  } else {
    delete nodesError.value[id]
  }
})
</script>

<template>
  <Node v-bind="$attrs" icon="el:Promotion" color="rgb(50, 150, 250)" :node="node">
    <el-text>{{ content }}</el-text>
  </Node>
</template>

<style scoped lang="scss"></style>
