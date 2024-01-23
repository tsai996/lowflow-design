<script setup lang="ts">
import Segmented from '~/components/Segmented'
import {useVModels} from '@vueuse/core'
import {StartNode} from '../nodes/Start/index'
import {computed, inject, onMounted, Ref, ref} from "vue"
import {Field} from "~/components/Render/interface";
import {FormProperty} from "~/views/flowDesign/index";

const activeName = ref('formPermissions')

export interface ApprovalAttr {
  node: StartNode
}

const $props = defineProps<ApprovalAttr>()
const $emits = defineEmits<{
  (e: 'update:node', modelValue: StartNode): void
}>()
const {node} = useVModels($props, $emits)
const {fields} = inject<{
  fields: Ref<Field[]>
}>('nodeHooks')!
// 全部可写
const allWriteable = computed({
  get() {
    return node.value.formProperties.every(e => e.writeable)
  },
  set(val) {
    node.value.formProperties.forEach(e => e.writeable = val)
    if (val) {
      allReadable.value = false
      allHidden.value = false
    } else {
      allRequired.value = false
    }
  }
})
// 全部必填
const allRequired = computed({
  get() {
    return node.value.formProperties.every(e => e.required)
  },
  set(val) {
    node.value.formProperties.forEach(e => e.required = val)
    if (val) {
      allWriteable.value = true
      allReadable.value = false
      allHidden.value = false
    }
  }
})
// 全部可读
const allReadable = computed({
  get() {
    return node.value.formProperties.every(e => e.readable)
  },
  set(val) {
    node.value.formProperties.forEach(e => e.readable = val)
    if (val) {
      allWriteable.value = false
      allHidden.value = false
      allRequired.value = false
    }
  }
})
// 全部隐藏
const allHidden = computed({
  get() {
    return node.value.formProperties.every(e => e.hidden)
  },
  set(val) {
    node.value.formProperties.forEach(e => e.hidden = val)
    if (val) {
      allWriteable.value = false
      allRequired.value = false
      allReadable.value = false
    }
  }
})
/**
 * 更改隐藏
 * @param row
 */
const changeHidden = (row: FormProperty) => {
  if (row.hidden) {
    row.readable = false
    row.writeable = false
    row.required = false
  }
}
/**
 * 更改可写
 * @param row
 */
const changeWriteable = (row: FormProperty) => {
  if (row.writeable) {
    row.readable = false
    row.hidden = false
  } else {
    row.required = false
  }
}
/**
 * 更改可读
 * @param row
 */
const changeReadable = (row: FormProperty) => {
  if (row.readable) {
    row.writeable = false
    row.required = false
    row.hidden = false
  }
}
/**
 * 更改必填
 * @param row
 */
const changeRequired = (row: FormProperty) => {
  if (row.required) {
    row.writeable = true
    row.readable = false
    row.hidden = false
  }
}
onMounted(() => {
  const formProperties = node.value.formProperties
  node.value.formProperties = fields.value.filter(e => e.value !== undefined).map(e => ({
    id: e.id,
    name: e.title,
    readable: e.props.disabled || false,
    writeable: !e.props.disabled || false,
    hidden: e.props.hidden || false,
    required: (e.props.required && !e.props.disabled) || false
  }))
  node.value.formProperties.forEach(item => {
    const properties = formProperties.find(f => f.id === item.id)
    if (properties) {
      item.readable = properties.readable
      item.writeable = properties.writeable
      item.hidden = properties.hidden
      item.required = properties.required
    }
  })
})
</script>

<template>
  <segmented v-model="activeName" stretch :block="false">
    <el-tab-pane label="表单权限" name="formPermissions">
      <el-table :data="node.formProperties" style="width: 100%">
        <el-table-column prop="name" label="字段"/>
        <el-table-column prop="readable">
          <template #header>
            <el-checkbox v-model="allReadable" label="可读"/>
          </template>
          <template #default="{row}">
            <el-checkbox v-model="row.readable" @change="changeReadable(row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="writeable">
          <template #header>
            <el-checkbox v-model="allWriteable" label="可写"/>
          </template>
          <template #default="{row}">
            <el-checkbox v-model="row.writeable" @change="changeWriteable(row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="required">
          <template #header>
            <el-checkbox v-model="allRequired" label="必填"/>
          </template>
          <template #default="{row}">
            <el-checkbox v-model="row.required" @change="changeRequired(row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="hidden">
          <template #header>
            <el-checkbox v-model="allHidden" label="隐藏"/>
          </template>
          <template #default="{row}">
            <el-checkbox v-model="row.hidden" @change="changeHidden(row)"/>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="操作权限" name="operationPermissions">
      待添加...
    </el-tab-pane>
  </segmented>
</template>

<style scoped lang="scss">

</style>
