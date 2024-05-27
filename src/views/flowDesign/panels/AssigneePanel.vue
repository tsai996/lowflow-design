<script setup lang="ts">
import type { AssigneeNode } from '../nodes/type'
import type { Field } from '@/components/Render/type'

defineProps<{
  activeData: AssigneeNode
  fields: Field[]
  type: '审批' | '抄送' | '办理' | '通知'
}>()
</script>

<template>
  <el-form label-position="top" label-width="90px">
    <el-form-item prop="assigneeType" :label="`${type}对象`">
      <el-radio-group v-model="activeData.assigneeType">
        <el-row>
          <el-col :span="8">
            <el-radio value="user">指定人员</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="role">指定角色</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="choice">发起人自选</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="self">发起人自己</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="leader">直属上级</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="orgLeader">组织主管</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="formUser">表单内人员</el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio value="formRole">表单内角色</el-radio>
          </el-col>
          <slot></slot>
        </el-row>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="users" label="指定人员" v-if="activeData.assigneeType === 'user'">
      <user-selector v-model="activeData.users" multiple :placeholder="`请选择${type}人`" />
    </el-form-item>
    <el-form-item prop="choice" label="发起人自选择" v-if="activeData.assigneeType === 'choice'">
      <el-radio-group v-model="activeData.choice">
        <el-radio-button :value="false">单选</el-radio-button>
        <el-radio-button :value="true">多选</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="leader" label="多级上级" v-if="activeData.assigneeType === 'leader'">
      <el-select v-model="activeData.leader" style="width: 220px" placeholder="请选择多级上级">
        <el-option label="直属上级" :value="1"></el-option>
        <el-option label="2级上级" :value="2"></el-option>
        <el-option label="3级上级" :value="3"></el-option>
        <el-option label="4级上级" :value="4"></el-option>
        <el-option label="5级上级" :value="5"></el-option>
        <el-option label="6级上级" :value="6"></el-option>
        <el-option label="7级上级" :value="7"></el-option>
        <el-option label="8级上级" :value="8"></el-option>
        <el-option label="9级上级" :value="9"></el-option>
        <el-option label="10级上级" :value="10"></el-option>
        <el-option label="11级上级" :value="11"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="orgLeader" label="组织主管" v-if="activeData.assigneeType === 'orgLeader'">
      <el-select v-model="activeData.orgLeader" style="width: 220px" placeholder="请选择组织主管">
        <el-option label="直属主管" :value="1"></el-option>
        <el-option label="2级主管" :value="2"></el-option>
        <el-option label="3级主管" :value="3"></el-option>
        <el-option label="4级主管" :value="4"></el-option>
        <el-option label="5级主管" :value="5"></el-option>
        <el-option label="6级主管" :value="6"></el-option>
        <el-option label="7级主管" :value="7"></el-option>
        <el-option label="8级主管" :value="8"></el-option>
        <el-option label="9级主管" :value="9"></el-option>
        <el-option label="10级主管" :value="10"></el-option>
        <el-option label="11级主管" :value="11"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="roles" label="指定角色" v-if="activeData.assigneeType === 'role'">
      <RoleSelector
        v-model="activeData.roles"
        style="width: 220px"
        collapse-tags
        :max-collapse-tags="1"
        multiple
        clearable
        placeholder="请选择角色"
      />
    </el-form-item>
    <el-form-item prop="formUser" label="表单内人员" v-if="activeData.assigneeType === 'formUser'">
      <el-select placeholder="选择表单内人员" style="width: 220px" v-model="activeData.formUser">
        <el-option
          v-for="item in fields.filter((e) => e.name === 'UserSelector')"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="formRole" label="表单内角色" v-if="activeData.assigneeType === 'formRole'">
      <el-select placeholder="选择表单内角色" style="width: 220px" v-model="activeData.formRole">
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
