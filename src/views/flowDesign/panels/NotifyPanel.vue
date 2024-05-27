<script setup lang="ts">
import type { NotifyNode } from '../nodes/type'
import type { Ref } from 'vue'
import type { Field } from '@/components/Render/type'
import AssigneePanel from './AssigneePanel.vue'

const { fields } = inject<{ fields: Ref<Field[]> }>('flowDesign', { fields: ref([]) })
defineProps<{
  activeData: NotifyNode
}>()
</script>

<template>
  <el-form label-position="top" label-width="90px">
    <AssigneePanel :active-data="activeData" :fields="fields" type="通知" />
    <el-form-item prop="types" label="通知类型">
      <el-checkbox-group v-model="activeData.types">
        <el-checkbox label="站内" value="site" />
        <el-checkbox label="邮件" value="email" />
        <el-checkbox label="短信" value="sms" />
        <el-checkbox label="企业微信" value="wechat" />
        <el-checkbox label="钉钉" value="dingtalk" />
        <el-checkbox label="飞书" value="feishu" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item prop="subject" label="消息主题">
      <template #label>
        <div class="flex-items-center gap3px">
          <el-tooltip content="可以使用 ${字段名} 字段名填充内容" placement="top">
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
          <span>消息主题</span>
        </div>
      </template>
      <el-input
        v-model="activeData.subject"
        :maxlength="255"
        clearable
        placeholder="请输入消息主题"
      />
    </el-form-item>
    <el-form-item prop="content" label="消息内容">
      <template #label>
        <div class="flex-items-center gap3px">
          <el-tooltip content="可以使用 ${字段名} 字段名填充内容" placement="top">
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
          <span>消息内容</span>
        </div>
      </template>
      <el-input
        v-model="activeData.content"
        :autosize="{ minRows: 6, maxRows: 8 }"
        type="textarea"
        :maxlength="1000"
        show-word-limit
        placeholder="请输入消息内容"
      >
      </el-input>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
