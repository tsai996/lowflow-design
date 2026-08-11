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
    <el-form-item prop="types" :label="$t('通知类型')">
      <el-checkbox-group v-model="activeData.types">
        <el-checkbox :label="$t('站内')" value="site" />
        <el-checkbox :label="$t('邮件')" value="email" />
        <el-checkbox :label="$t('短信')" value="sms" />
        <el-checkbox :label="$t('企业微信')" value="wechat" />
        <el-checkbox :label="$t('钉钉')" value="dingtalk" />
        <el-checkbox :label="$t('飞书')" value="feishu" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item prop="subject" :label="$t('消息主题')">
      <template #label>
        <div class="flex-items-center gap3px">
          <el-tooltip
            :content="$t('字段占位提示', { 字段名: '{字段名}', fieldName: '{fieldName}' })"
            placement="top"
          >
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
          <span>{{ $t('消息主题') }}</span>
        </div>
      </template>
      <el-input
        v-model="activeData.subject"
        :maxlength="255"
        clearable
        :placeholder="$t('请输入消息主题')"
      />
    </el-form-item>
    <el-form-item prop="content" :label="$t('消息内容')">
      <template #label>
        <div class="flex-items-center gap3px">
          <el-tooltip
            :content="$t('字段占位提示', { 字段名: '{字段名}', fieldName: '{fieldName}' })"
            placement="top"
          >
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
          <span>{{ $t('消息内容') }}</span>
        </div>
      </template>
      <el-input
        v-model="activeData.content"
        :autosize="{ minRows: 6, maxRows: 8 }"
        type="textarea"
        :maxlength="1000"
        show-word-limit
        :placeholder="$t('请输入消息内容')"
      >
      </el-input>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
