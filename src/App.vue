<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElNotification } from 'element-plus'

onMounted(() => {
  setTimeout(() => {
    ElNotification({
      type: 'info',
      position: 'bottom-left',
      duration: 10000,
      title: '求职信息',
      message: h('div', [
        h('p', '96年失业（全栈开发）求收留'),
        h('p', '地点：杭州'),
        h('p', '微信：xfcai1216')
      ])
    })
  }, 2000)
})
</script>

<template>
  <el-config-provider namespace="el" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
#app {
  color: var(--el-text-color-primary);
}
</style>
