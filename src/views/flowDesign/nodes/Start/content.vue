<script setup lang="ts">
import {StartNode} from './index'
import {ref, watchEffect} from "vue";

export interface StartContentProps {
  node: StartNode
}

const $props = withDefaults(defineProps<StartContentProps>(), {})
const content = ref<string>('')
watchEffect(() => {
  content.value = $props.node.name
})

</script>

<template>
  <el-text>
    {{ content || node.name }}
  </el-text>
</template>

<style scoped lang="scss">

</style>