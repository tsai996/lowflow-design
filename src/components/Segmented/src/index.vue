<script setup lang="ts">

import {useVModel} from '@vueuse/core'

interface SegmentedProps {
  block?: boolean,
  modelValue?: string
}

const props = withDefaults(defineProps<SegmentedProps>(), {
  block: true
})
const emits = defineEmits<
    (e: 'update:modelValue', value: string) => void
>()
const data = useVModel(props, 'modelValue', emits)
</script>

<template>
  <el-tabs v-model="data" :class="['el-segmented',{'is-block': block}]">
    <slot/>
  </el-tabs>
</template>

<style scoped lang="scss">
.el-segmented {
  :deep {
    &.is-block {
      .el-tabs__header {
        display: inline-block;
      }
    }

    .el-tabs__header {
      margin: 0;
      box-sizing: border-box;
      background: var(--el-segmented-bg);
      border-radius: var(--el-segmented-radius);
      padding: var(--el-segmented-padding);
    }

    .el-tabs__nav-scroll, .el-tabs__nav-wrap {
      margin: 0;
      overflow: visible;
    }

    .el-tabs__nav-wrap {
      &:after {
        display: none;
      }
    }

    .el-tabs__nav {
      float: none;

      &:not(:has(.is-active)) {
        .el-tabs__active-bar {
          padding: 0;
        }
      }

      .el-tabs__item {
        padding: 0 var(--el-segmented-item-padding);
        color: var(--el-segmented-color);
        height: var(--el-segmented-height);
        line-height: var(--el-segmented-height);
        font-size: var(--el-segmented-font-size);
        border-radius: var(--el-segmented-radius);
        transition: color .2s, background-color .2s;
        background: none;
        z-index: 2;

        &:not(.is-disabled) {
          &.is-active {
            color: var(--el-segmented-active-color) !important;
            background: none !important;
          }

          &:hover {
            color: var(--el-segmented-active-color);
            background: var(--el-segmented-hover-bg);
          }
        }
      }
    }

    /* 活动栏属性 */
    .el-tabs__active-bar {
      padding: 0 var(--el-segmented-item-padding);
      margin-left: calc(0px - var(--el-segmented-item-padding));
      background: var(--el-segmented-active-bg);
      border-radius: var(--el-segmented-radius);
      box-shadow: var(--el-segmented-active-shadow);
      transform: translate(var(--el-segmented-item-padding));
      box-sizing: content-box;
      height: auto;
      bottom: 0;
      top: 0;
    }
  }

}
</style>
