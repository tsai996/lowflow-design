<script setup lang="ts">
import {CcNode} from './index'
import {ref, watchEffect} from "vue";
import {getList, User} from "~/api/modules/user";

export interface CcContentProps {
  node: CcNode
}

const $props = withDefaults(defineProps<CcContentProps>(), {})
const content = ref<string>('')
watchEffect(() => {
  const props = $props.node
  if (props.users.length > 0) {
    getList(props.users).then(res => {
      if(res.success){
        content.value = res.data.map((item: User) => item.name).join('、')
      }
    })
  } else {
    content.value = '未指定人员'
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
