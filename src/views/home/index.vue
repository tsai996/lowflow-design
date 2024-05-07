<script setup lang="ts">
import FlowDesign from '@/views/flowDesign/index.vue'
import type { Field } from '@/components/Render/type'
import type { EndNode, FlowNode, StartNode } from '@/views/flowDesign/nodes/type'

// 流程节点
const process = ref<FlowNode>({
  id: 'root',
  pid: undefined,
  type: 'start',
  name: '发起人',
  formProperties: [],
  child: {
    id: 'end',
    pid: 'root',
    type: 'end',
    name: '结束',
    child: undefined
  } as EndNode
} as StartNode)
// 表单字段
const fields = ref<Field[]>([
  {
    id: 'field_da2w55',
    type: 'formItem',
    label: '请假人',
    name: 'UserSelector',
    value: null,
    readonly: false,
    required: false,
    hidden: false,
    props: {
      multiple: false,
      disabled: false,
      placeholder: '请选择用户',
      style: {
        width: '100%'
      }
    }
  },
  {
    id: 'field_fa2w40',
    type: 'formItem',
    label: '请假天数',
    name: 'ElInputNumber',
    value: null,
    readonly: false,
    required: false,
    hidden: false,
    props: {
      disabled: false,
      placeholder: '请假天数',
      style: {
        width: '100%'
      },
      min: 0,
      max: 100,
      step: 1,
      precision: 0
    }
  },
  {
    id: 'field_d42t45',
    type: 'formItem',
    label: '请假事由',
    name: 'ElSelect',
    value: null,
    readonly: false,
    required: false,
    hidden: false,
    props: {
      disabled: false,
      multiple: false,
      placeholder: '请选择请假事由',
      options: [
        {
          label: '事假',
          value: '事假'
        },
        {
          label: '病假',
          value: '病假'
        },
        {
          label: '婚假',
          value: '婚假'
        },
        {
          label: '产假',
          value: '产假'
        },
        {
          label: '丧假',
          value: '丧假'
        },
        {
          label: '其他',
          value: '其他'
        }
      ],
      style: {
        width: '100%'
      }
    }
  },
  {
    id: 'field_522g58',
    type: 'formItem',
    label: '请假原因',
    name: 'ElInput',
    value: null,
    readonly: false,
    required: false,
    hidden: false,
    props: {
      type: 'textarea',
      placeholder: '请输入请假原因',
      autosize: {
        minRows: 3,
        maxRows: 3
      },
      disabled: false,
      style: {
        width: '100%'
      }
    }
  }
])
</script>

<template>
  <FlowDesign :process="process" :fields="fields" />
</template>

<style scoped lang="scss"></style>
