<script setup lang="ts">
import {Field} from "~/components/Render/index";
import {FilterRules} from "~/components/Condition/index";
import {useVModel} from "@vueuse/core";

const $props = defineProps<{
  modelValue: any,
  options: Field[],
  filterRules: FilterRules
}>()
const $emits = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()
const data = useVModel($props, 'modelValue', $emits)
</script>

<template>
  <el-select class="trigger-container" v-model="data" filterable placeholder="选择字段">
    <el-option
        v-for="item in $props.options"
        :key="item.id"
        :label="item.title"
        :value="item.id"
    />
  </el-select>
</template>

<style scoped lang="scss">

</style>