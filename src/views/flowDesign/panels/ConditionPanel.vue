<script setup lang="ts">
import type { ConditionNode } from '../nodes/type'
import type { Ref } from 'vue'
import type { Field } from '@/components/Render/type'

const { fields } = inject<{ fields: Ref<Field[]> }>('flowDesign', { fields: ref([]) })
defineProps<{
  activeData: ConditionNode
}>()
const initialFormFields = ref<Field[]>([
  {
    id: 'initiator',
    name: 'UserSelector',
    type: 'formItem',
    label: '发起人',
    value: null,
    readonly: false,
    required: true,
    hidden: false,
    props: {
      key: undefined,
      multiple: false,
      placeholder: '请选择发起人',
      class: [],
      style: {
        width: '100%'
      }
    }
  }
])
</script>

<template>
  <AdvancedFilter
    v-model="activeData.conditions"
    :filter-fields="[...initialFormFields, ...fields]"
  />
</template>

<style scoped lang="scss"></style>
