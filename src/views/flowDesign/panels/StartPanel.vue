<script setup lang="ts">
import type { FormProperty, StartNode } from '../nodes/type'
import type { Field } from '@/components/Render/type'
import type { Ref } from 'vue'
import ExecutionListeners from './ExecutionListeners.vue'

const { fields } = inject<{ fields: Ref<Field[]> }>('flowDesign', { fields: ref([]) })
const props = defineProps<{
  activeData: StartNode
}>()
const activeName = ref('basicSettings')
const allReadonly = computed({
  get() {
    return props.activeData.formProperties.every((e) => e.readonly)
  },
  set(val) {
    props.activeData.formProperties.forEach((e) => (e.readonly = val))
    if (val) {
      allHidden.value = false
      allRequired.value = false
    }
  }
})
const allHidden = computed({
  get() {
    return props.activeData.formProperties.every((e) => e.hidden)
  },
  set(val) {
    props.activeData.formProperties.forEach((e) => (e.hidden = val))
    if (val) {
      allRequired.value = false
      allReadonly.value = false
    }
  }
})
const allRequired = computed({
  get() {
    return props.activeData.formProperties.every((e) => e.required)
  },
  set(val) {
    props.activeData.formProperties.forEach((e) => (e.required = val))
    if (val) {
      allReadonly.value = false
      allHidden.value = false
    }
  }
})

const changeReadonly = (row: FormProperty) => {
  if (row.readonly) {
    row.required = false
    row.hidden = false
  }
}
const changeRequired = (row: FormProperty) => {
  if (row.required) {
    row.readonly = false
    row.hidden = false
  }
}
const changeHidden = (row: FormProperty) => {
  if (row.hidden) {
    row.readonly = false
    row.required = false
  }
}

watchEffect(() => {
  const formProperties = props.activeData.formProperties
  props.activeData.formProperties = fields.value.map((field) => ({
    id: field.id,
    name: field.label,
    readonly: field.readonly || false,
    hidden: field.hidden,
    required: field.required || false
  }))
  props.activeData.formProperties.forEach((item) => {
    const properties = formProperties.find((f) => f.id === item.id)
    if (properties) {
      item.readonly = properties.readonly
      item.hidden = properties.hidden
      item.required = properties.required
    }
  })
})
</script>

<template>
  <el-tabs v-model="activeName" stretch class="el-segmented">
    <el-tab-pane label="基础设置" name="basicSettings">
      <el-form label-position="top" label-width="90px">
        <el-form-item prop="executionListeners" label="执行监听器">
          <ExecutionListeners :node="activeData" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="表单权限" name="formPermissions">
      <el-table :data="activeData.formProperties">
        <el-table-column prop="name" label="字段" />
        <el-table-column prop="readonly">
          <template #header>
            <el-checkbox v-model="allReadonly" label="只读" />
          </template>
          <template #default="{ row }">
            <el-checkbox v-model="row.readonly" @change="changeReadonly(row)" />
          </template>
        </el-table-column>
        <el-table-column prop="required">
          <template #header>
            <el-checkbox v-model="allRequired" label="必填" />
          </template>
          <template #default="{ row }">
            <el-checkbox v-model="row.required" @change="changeRequired(row)" />
          </template>
        </el-table-column>
        <el-table-column prop="hidden">
          <template #header>
            <el-checkbox v-model="allHidden" label="隐藏" />
          </template>
          <template #default="{ row }">
            <el-checkbox v-model="row.hidden" @change="changeHidden(row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
@import '@/styles/el-segmented.scss';
</style>
