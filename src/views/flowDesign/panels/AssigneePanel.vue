<script setup lang="ts">
import type { AssigneeNode } from '../nodes/type'
import type { Field } from '@/components/Render/type'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineProps<{
  activeData: AssigneeNode
  fields: Field[]
  type: '审批' | '抄送' | '办理' | '通知'
}>()
</script>

<template>
  <el-form label-position="top" label-width="90px">
    <el-form-item prop="assigneeType" :label="t('{type}对象', { type: t(type) })">
      <el-radio-group v-model="activeData.assigneeType">
        <el-row>
          <el-col :span="8">
            <el-radio value="user">{{ t('指定人员') }}</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="role">{{ t('指定角色') }}</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="choice">{{ t('发起人自选') }}</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="self">{{ t('发起人自己') }}</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="leader">{{ t('直属上级') }}</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="orgLeader">{{ t('组织主管') }}</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="formUser">{{ t('表单内人员') }}</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="formRole">{{ t('表单内角色') }}</el-radio>
          </el-col>
          <slot></slot>
        </el-row>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="users" :label="t('指定人员')" v-if="activeData.assigneeType === 'user'">
      <user-selector
        v-model="activeData.users"
        multiple
        :placeholder="t('请选择{type}人', { type: t(type) })"
      />
    </el-form-item>
    <el-form-item
      prop="choice"
      :label="t('发起人自选择')"
      v-if="activeData.assigneeType === 'choice'"
    >
      <el-radio-group v-model="activeData.choice">
        <el-radio-button :value="false">{{ t('单选') }}</el-radio-button>
        <el-radio-button :value="true">{{ t('多选') }}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="leader" :label="t('多级上级')" v-if="activeData.assigneeType === 'leader'">
      <el-select
        v-model="activeData.leader"
        style="width: 220px"
        :placeholder="t('请选择多级上级')"
      >
        <el-option
          v-for="level in 11"
          :key="level"
          :label="level === 1 ? t('直属上级') : t('{level}级上级', { level })"
          :value="level"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      prop="orgLeader"
      :label="t('组织主管')"
      v-if="activeData.assigneeType === 'orgLeader'"
    >
      <el-select
        v-model="activeData.orgLeader"
        style="width: 220px"
        :placeholder="t('请选择组织主管')"
      >
        <el-option
          v-for="level in 11"
          :key="level"
          :label="level === 1 ? t('直属主管') : t('{level}级主管', { level })"
          :value="level"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="roles" :label="t('指定角色')" v-if="activeData.assigneeType === 'role'">
      <RoleSelector
        v-model="activeData.roles"
        style="width: 220px"
        collapse-tags
        :max-collapse-tags="1"
        multiple
        clearable
        :placeholder="t('请选择角色')"
      />
    </el-form-item>
    <el-form-item
      prop="formUser"
      :label="t('表单内人员')"
      v-if="activeData.assigneeType === 'formUser'"
    >
      <el-select
        :placeholder="t('选择表单内人员')"
        style="width: 220px"
        v-model="activeData.formUser"
      >
        <el-option
          v-for="item in fields.filter((e) => e.name === 'UserSelector')"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      prop="formRole"
      :label="t('表单内角色')"
      v-if="activeData.assigneeType === 'formRole'"
    >
      <el-select
        :placeholder="t('选择表单内角色')"
        style="width: 220px"
        v-model="activeData.formRole"
      >
        <el-option
          v-for="item in fields.filter((e) => e.name === 'RoleSelector')"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
