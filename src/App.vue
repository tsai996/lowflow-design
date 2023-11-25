<template>
  <el-config-provider namespace="el" :locale="zhCn">
    <FlowDesign :process="process" :fields="fields"/>
  </el-config-provider>
</template>
<script setup lang="ts">
import FlowDesign from '~/views/flowDesign/index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {FlowNode} from "~/views/flowDesign/nodes/Node/index";
import {ref} from "vue";
import {Field} from "~/components/Render/interface";
import {StartNode} from "~/views/flowDesign/nodes/Start/index";
import {EndNode} from "~/views/flowDesign/nodes/End/index";
// 流程节点
const process = ref<FlowNode>({
  id: 'root',
  pid: null,
  type: 'start',
  name: '发起人',
  formProperties: [],
  child: {
    id: 'end',
    pid: 'root',
    type: 'end',
    name: '结束',
    child: null
  } as EndNode
} as StartNode)
// 表单字段
const fields = ref<Field[]>([
  {
    id: 'field_da2w55',
    title: "请假人",
    name: "UserSelection",
    value: null,
    props: {
      multiple: false,
      disabled: false,
      placeholder: "请选择用户",
      style: {
        width: "100%"
      }
    }
  },
  {
    id: 'field_fa2w40',
    title: "请假天数",
    name: "Number",
    value: null,
    props: {
      disabled: false,
      placeholder: "请假天数",
      style: {
        width: "100%"
      },
      min: 0,
      max: 100,
      step: 1,
      precision: 0,
    }
  },
  {
    id: 'field_d42t45',
    title: "请假事由",
    name: "Select",
    value: null,
    props: {
      disabled: false,
      multiple: false,
      placeholder: "请选择请假事由",
      options: [
        {
          label: "事假",
          value: "事假"
        },
        {
          label: "病假",
          value: "病假"
        },
        {
          label: "婚假",
          value: "婚假"
        },
        {
          label: "产假",
          value: "产假"
        },
        {
          label: "丧假",
          value: "丧假"
        },
        {
          label: "其他",
          value: "其他"
        }
      ],
      style: {
        width: "100%"
      }
    }
  },
  {
    id: 'field_522g58',
    title: "请假原因",
    name: "Input",
    value: null,
    props: {
      type: 'textarea',
      placeholder: "请输入请假原因",
      autosize: {
        minRows: 3,
        maxRows: 3
      },
      disabled: false,
      style: {
        width: "100%"
      }
    }
  }
])

</script>
<style>
</style>
