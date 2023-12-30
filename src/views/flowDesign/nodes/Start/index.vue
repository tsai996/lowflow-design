<script setup lang="ts">
import Node from '../Node/index.vue'
import {StartNode} from "./index";
import Content from './content'

export interface StartProps {
  node: StartNode
}

withDefaults(defineProps<StartProps>(), {})
</script>

<template>
  <div class="start-box">
    <Node icon="List"
          :arrow="false"
          :close="false"
          color="#8c7cf3"
          :node="node">
      <Content :node="node"/>
    </Node>
  </div>
</template>

<style scoped lang="scss">
.start-box {
  padding: 50px 0 0;
}
</style>
