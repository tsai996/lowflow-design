<template>
  <el-config-provider namespace="el" :locale="zhCn">
    <FlowDesign :process="nodeTreeObj"/>
  </el-config-provider>
</template>
<script setup lang="ts">
import FlowDesign from '~/views/flowDesign/index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {FlowNode} from "~/views/flowDesign/nodes/Node/index";
import {reactive} from "vue";

const nodeTreeObj = reactive<FlowNode>({
  id: 'root',
  pid: null,
  type: 'start',
  name: '发起人',
  child: {
    id: 'end',
    pid: 'root',
    type: 'end',
    name: '结束',
    child: null
  }
})

</script>
<style>
</style>
