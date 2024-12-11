<script setup lang="ts">
import FlowDesign from '@/views/flowDesign/index.vue'
import type { Field } from '@/components/Render/type'
import type { EndNode, FlowNode, StartNode } from '@/views/flowDesign/nodes/type'
import { downloadXml } from '@/api/modules/model'

// 流程节点
const process = ref<FlowNode>({
  id: 'root',
  pid: undefined,
  type: 'start',
  name: '发起人',
  executionListeners: [],
  formProperties: [],
  next: {
    id: 'end',
    pid: 'root',
    type: 'end',
    name: '流程结束',
    executionListeners: [],
    next: undefined
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
    required: true,
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
    required: true,
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
    required: true,
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
    required: true,
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
// 是否只读
const readOnly = ref(false)
// 是否暗黑模式
const isDark = ref(false)
const converterBpmn = () => {
  const processModel = {
    code: 'test',
    name: '测试',
    icon: {
      name: 'el:HomeFilled',
      color: '#409EFF'
    },
    process: process.value,
    enable: true,
    version: 1,
    sort: 0,
    groupId: '',
    remark: ''
  }
  downloadXml(processModel)
}
const handleToggleDark = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
const gitee = () => {
  window.open('https://gitee.com/cai_xiao_feng/lowflow-design')
}
const github = () => {
  window.open('https://github.com/tsai996/lowflow-design')
}
</script>

<template>
  <FlowDesign :process="process" :fields="fields" :readOnly="readOnly">
    <el-switch
      inline-prompt
      active-text="正常模式"
      inactive-text="暗黑模式"
      @change="handleToggleDark"
      v-model="isDark"
    />
    <el-switch
      v-model="readOnly"
      active-text="只读模式"
      inactive-text="编辑模式"
      inline-prompt
      :active-value="true"
      :inactive-value="false"
    />
    <el-button-group>
      <el-button @click="converterBpmn" type="primary" icon="Download"> 转bpmn </el-button>
      <!--开源地址-->
      <el-dropdown>
        <el-button type="primary">
          开源地址
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.stop="gitee">Gitee</el-dropdown-item>
            <el-dropdown-item @click.stop="github">Github</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-button-group>
  </FlowDesign>
</template>

<style scoped lang="scss"></style>
