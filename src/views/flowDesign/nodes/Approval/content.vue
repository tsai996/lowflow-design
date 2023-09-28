<script setup lang="ts">
import {ApprovalNode} from './index'
import {ref, watchEffect} from "vue";
import {getList, User} from '~/api/modules/user'

export interface ApprovalContentProps {
  node: ApprovalNode
}

const $props = withDefaults(defineProps<ApprovalContentProps>(), {})
const content = ref<string>('')
watchEffect(() => {
  const props = $props.node
  if (props.assigneeType === 'choice') {
    content.value = `发起人自选（${props.choice?'单选':'多选'}）`
  } else if (props.assigneeType === 'self') {
    content.value = '发起人自己'
  } else if (props.assigneeType === 'leader') {
    content.value = props.leader === 1 ? '直属上级' : `${props.leader}级上级`
  } else if (props.assigneeType === 'formUser') {
    content.value = '表单内人员'
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
      // 可以从异步后端查询出角色名,显示在content中
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
