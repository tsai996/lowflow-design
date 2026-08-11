<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '@/stores/language'

const { locale } = storeToRefs(useLanguageStore())
const elementLocale = computed(() => (locale.value === 'zh-CN' ? zhCn : en))
</script>

<template>
  <el-config-provider namespace="el" :locale="elementLocale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
#app {
  color: var(--el-text-color-primary);
}
</style>
