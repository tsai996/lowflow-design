<script setup lang="ts">
import {useVModels} from '@vueuse/core'
import {inject, Ref} from "vue";
import ConditionFilter from "~/components/Condition/index.vue";
import {ConditionNode} from "~/views/flowDesign/nodes/Condition/index";
import {Field} from "~/components/Render/interface";

export interface ConditionAttr {
  node: ConditionNode
}

const $props = defineProps<ConditionAttr>()
const $emits = defineEmits<{
  (e: 'update:node', modelValue: ConditionNode): void
}>()
const {node} = useVModels($props, $emits)
const {fields} = inject<{
  fields: Ref<Field[]>
}>('nodeHooks')!
</script>

<template>
  <ConditionFilter v-model="node.conditions" :filter-fields="fields"/>
</template>

<style scoped lang="scss">

</style>
