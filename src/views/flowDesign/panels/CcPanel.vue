<script setup lang="ts">
import type { CcNode } from '../nodes/type'
import type { Ref } from 'vue'
import type { Field } from '@/components/Render/type'
import type { FormProperty } from '../nodes/type'
import AssigneePanel from './AssigneePanel.vue'

const { fields } = inject<{ fields: Ref<Field[]> }>('flowDesign', { fields: ref([]) })
const props = defineProps<{
  activeData: CcNode
}>()
const activeName = ref('properties')
const allReadonly = computed({
  get() {
    return props.activeData.formProperties.every((e) => e.readonly)
  },
  set(val) {
    props.activeData.formProperties.forEach((e) => (e.readonly = val))
    if (val) {
      allHidden.value = false
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
      allReadonly.value = false
    }
  }
})

const changeReadonly = (row: FormProperty) => {
  if (row.readonly) {
    row.hidden = false
  }
}
const changeHidden = (row: FormProperty) => {
  if (row.hidden) {
    row.readonly = false
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
    <el-tab-pane label="抄送人" name="properties">
      <el-form label-position="top" label-width="90px">
        <AssigneePanel :active-data="activeData" :fields="fields" type="抄送" />
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
