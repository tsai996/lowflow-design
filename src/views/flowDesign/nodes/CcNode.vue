<script setup lang="ts">
import Node from './Node.vue'
import type { CcNode } from './type'
import type { Ref } from 'vue'
import type { ErrorInfo } from './type'
import type { Field } from '@/components/Render/type'
import { getById } from '@/api/modules/role'
import { getByUsername } from '@/api/modules/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
        content.value = users.map((user) => user.data.name).join(t('名单分隔符'))
      })
    } else {
      errors.push({ id: id, name: name, message: t('未指定人员') })
      content.value = t('未指定人员')
    }
  } else if (assigneeType === 'choice') {
    content.value = t('发起人自选（{mode}）', { mode: t(choice ? '多选' : '单选') })
  } else if (assigneeType === 'self') {
    content.value = t('发起人自己')
  } else if (assigneeType === 'leader') {
    content.value = leader === 1 ? t('直属上级') : t('{level}级上级', { level: leader })
  } else if (assigneeType === 'orgLeader') {
    content.value = orgLeader === 1 ? t('直属主管') : t('{level}级主管', { level: orgLeader })
  } else if (assigneeType === 'formUser') {
    if (!formUser) {
      errors.push({ id: id, name: name, message: t('未指定表单内人员') })
    }
    const title = fields.value.find((e) => e.id === formUser)?.label || formUser || '?'
    content.value = t('表单内（{name}）人员', { name: title })
  } else if (assigneeType === 'formRole') {
    if (!formRole) {
      errors.push({ id: id, name: name, message: t('未指定表单内角色') })
    }
    const title = fields.value.find((e) => e.id === formRole)?.label || formRole || '?'
    content.value = t('表单内（{name}）角色', { name: title })
  } else if (assigneeType === 'role') {
    if (roles.length > 0) {
      const all = roles.map((id) => getById(id))
      Promise.all(all).then((roles) => {
        content.value = roles.map((res) => res.data.name).join(t('名单分隔符'))
      })
    } else {
      errors.push({ id: id, name: name, message: t('未指定角色') })
      content.value = t('未指定角色')
    }
  } else {
    errors.push({ id: id, name: name, message: t('未知错误') })
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
