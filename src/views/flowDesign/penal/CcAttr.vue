<script setup lang="ts">
import Segmented from '~/components/Segmented'
import {useVModels} from '@vueuse/core'
import {CcNode} from '../nodes/Cc/index'
import {computed, inject, Ref, ref, watchEffect} from "vue";
import {Field} from "~/components/Render/interface";

const activeName = ref('properties')

export interface ApprovalAttr {
  node: CcNode
}

const $props = defineProps<ApprovalAttr>()
const $emits = defineEmits<{
  (e: 'update:node', modelValue: CcNode): void
}>()
const {node} = useVModels($props, $emits)
const {fields} = inject<{
  fields: Ref<Field[]>
}>('nodeHooks')!
const allReadable = computed({
  get() {
    return node.value.formProperties.every(e => e.readable)
  },
  set(val) {
    node.value.formProperties.forEach(e => e.readable = val)
    allHidden.value = !val
  }
})
const allHidden = computed({
  get() {
    return node.value.formProperties.every(e => e.hidden)
  },
  set(val) {
    node.value.formProperties.forEach(e => e.hidden = val)
    allReadable.value = !val
  }
})

watchEffect(() => {
  const formProperties = node.value.formProperties
  node.value.formProperties = fields.value.filter(e => e.value !== undefined).map(e => ({
    id: e.id,
    name: e.title,
    readable: true,
    writeable: false,
    required: false,
    hidden: e.props.hidden || false,
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
    <el-tab-pane label="设置抄送人" name="properties">
      <el-form label-position="top" label-width="90px">
        <el-form-item prop="users" label="抄送人">
          <user-selection multiple placeholder="请选择人员" v-model="node.users"/>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="表单权限" name="formPermissions">
      <el-table :data="node.formProperties" style="width: 100%">
        <el-table-column prop="name" label="字段"/>
        <el-table-column prop="readable">
          <template #header>
            <el-checkbox v-model="allReadable" label="可读"/>
          </template>
          <template #default="{row}">
            <el-checkbox v-model="row.readable" @change="row.hidden=!$event"/>
          </template>
        </el-table-column>
        <el-table-column prop="hidden">
          <template #header>
            <el-checkbox v-model="allHidden" label="隐藏"/>
          </template>
          <template #default="{row}">
            <el-checkbox v-model="row.hidden" @change="row.readable=!$event"/>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </segmented>
</template>

<style scoped lang="scss">

</style>
