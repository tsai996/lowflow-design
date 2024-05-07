<script setup lang="ts" name="AdvancedFilter">
import type { FilterRules } from './type'
import type { Field } from '@/components/Render/type'
import { useVModel } from '@vueuse/core'
import Trigger from './Trigger.vue'
import Operator from './Operator.vue'

const $props = defineProps<{
  filterFields: Field[]
  modelValue: FilterRules
}>()
const $emits = defineEmits<{
  (e: 'update:modelValue', modelValue: FilterRules): void
  (e: 'addCondition', index: number): void
  (e: 'delCondition', index: number): void
  (e: 'delGroup'): void
}>()
const filterRules = useVModel($props, 'modelValue', $emits)
/**
 * 添加条件
 */
const addRule = () => {
  filterRules.value.conditions.push({
    field: null,
    operator: 'eq',
    value: null
  })
}
/**
 * 删除条件
 * @param index
 */
const handleDel = (index: number) => {
  filterRules.value.conditions.splice(index, 1)
  if (filterRules.value.conditions.length <= 0) {
    $emits('delGroup')
  }
  $emits('delCondition', index)
}
/**
 * 条件条件组
 */
const addGroup = () => {
  filterRules.value.groups.push({
    operator: 'and',
    conditions: [
      {
        field: null,
        operator: '',
        value: null
      }
    ],
    groups: []
  })
}
/**
 * 删除条件组
 * @param index
 */
const delGroup = (index: number) => {
  filterRules.value.groups.splice(index, 1)
}
</script>

<template>
  <div class="filter-container">
    <div class="logical-operator">
      <div class="logical-operator__line"></div>
      <el-switch
        v-model="filterRules.operator"
        inline-prompt
        style="--el-switch-on-color: #409eff; --el-switch-off-color: #67c23a"
        active-value="and"
        inactive-value="or"
        active-text="且"
        inactive-text="或"
      />
    </div>
    <div class="filter-option-content">
      <el-form :label-width="0" :inline="true" :model="filterRules">
        <el-row
          v-for="(item, index) in filterRules.conditions"
          :key="`${item.field}-${index}`"
          :gutter="5"
          class="filter-item-rule"
        >
          <el-col :xs="24" :sm="7">
            <el-form-item :prop="'conditions.' + index + '.field'" style="width: 100%">
              <trigger
                ref="triggerRef"
                :options="$props.filterFields.filter((e) => e.value !== undefined)"
                :filter-rules="filterRules"
                v-model="item.field"
                @update:model-value="item.value = null"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="5" v-if="item.field">
            <el-form-item :prop="'conditions.' + index + '.operator'" style="width: 100%">
              <operator ref="operatorRef" v-model="item.operator" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="10" v-if="item.field">
            <el-form-item :prop="'conditions.' + index + '.value'" style="width: 100%">
              <Render
                :field="$props.filterFields.find((e) => e.id === item.field) as Field"
                v-model="item.value"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="2"
            style="display: flex; align-items: center; flex-direction: row-reverse"
          >
            <el-button plain circle type="danger" icon="Delete" @click="handleDel(index)" />
          </el-col>
        </el-row>
        <AdvancedFilter
          v-for="(item, index) in filterRules.groups"
          :key="index"
          @delGroup="delGroup(index)"
          v-model="filterRules.groups[index]"
          :filterFields="filterFields"
        >
          <el-button @click="delGroup(index)" icon="CircleClose" class="filter-filter-item__add">
            删除条件组
          </el-button>
        </AdvancedFilter>
        <div
          v-if="filterRules.groups.length === 0 && filterRules.conditions.length === 0"
          class="filter-item-rule"
        />
      </el-form>
      <div class="filter-item-rule">
        <el-button @click="addRule" icon="CirclePlus" class="filter-filter-item__add">
          添加条件
        </el-button>
        <el-button @click="addGroup" icon="CirclePlus" class="filter-filter-item__add">
          添加条件组
        </el-button>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item) {
  margin-right: 0;
  margin-bottom: 0;
}

.filter-container {
  background-color: var(--el-fill-color-blank);
  border-radius: 3px;
  display: flex;

  .logical-operator {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    min-width: 60px;
    padding-right: 5px;

    .logical-operator__line {
      position: absolute;
      left: calc(32% - 1px);
      width: 30px;
      border-width: 1px 0 1px 1px;
      border-top-style: solid;
      border-bottom-style: solid;
      border-left-style: solid;
      border-top-color: var(--el-border-color);
      border-bottom-color: var(--el-border-color);
      border-left-color: var(--el-border-color);
      border-image: initial;
      border-right-style: initial;
      border-right-color: initial;
      border-radius: 5px 0 0 5px;
      height: calc(100% - 48px);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(100%) translateY(-50%);
        width: 6px;
        height: 6px;
        border: var(--el-border);
        border-radius: 50%;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translateX(100%) translateY(50%);
        width: 6px;
        height: 6px;
        border: var(--el-border);
        border-radius: 50%;
      }
    }
  }

  .filter-option-content {
    position: relative;
    width: 100%;

    .filter-item-rule {
      display: flex;
      align-items: center;
      min-height: 48px;
    }

    .filter-filter-item__add {
      border-style: dashed;
      width: 100%;
    }
  }
}
</style>
