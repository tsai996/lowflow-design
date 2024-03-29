<script setup lang="ts">
import Segmented from '~/components/Segmented'
import {useVModels} from '@vueuse/core'
import {ApprovalNode} from '../nodes/Approval/index'
import {computed, inject, Ref, ref, onMounted} from "vue"
import {CircleCheck, CircleClose, Switch, Plus, Minus} from "@element-plus/icons-vue";
import {Field} from "~/components/Render/interface";
import {FormProperty} from "~/views/flowDesign/index";
import UserSelection from "~/components/UserSelection";
import RoleSelection from "~/components/RoleSelection";

const activeName = ref('properties')

export interface ApprovalAttr {
  node: ApprovalNode
}

const $props = defineProps<ApprovalAttr>()
const $emits = defineEmits<{
  (e: 'update:node', modelValue: ApprovalNode): void
}>()
const {node} = useVModels($props, $emits)
const {fields} = inject<{
  fields: Ref<Field[]>
}>('nodeHooks')!
// 全部可写
const allWriteable = computed({
  get() {
    return node.value.formProperties.every(e => e.writeable)
  },
  set(val) {
    node.value.formProperties.forEach(e => e.writeable = val)
    if (val) {
      allReadable.value = false
      allHidden.value = false
    } else {
      allRequired.value = false
    }
  }
})
// 全部必填
const allRequired = computed({
  get() {
    return node.value.formProperties.every(e => e.required)
  },
  set(val) {
    node.value.formProperties.forEach(e => e.required = val)
    if (val) {
      allWriteable.value = true
      allReadable.value = false
      allHidden.value = false
    }
  }
})
// 全部可读
const allReadable = computed({
  get() {
    return node.value.formProperties.every(e => e.readable)
  },
  set(val) {
    node.value.formProperties.forEach(e => e.readable = val)
    if (val) {
      allWriteable.value = false
      allHidden.value = false
      allRequired.value = false
    }
  }
})
// 全部隐藏
const allHidden = computed({
  get() {
    return node.value.formProperties.every(e => e.hidden)
  },
  set(val) {
    node.value.formProperties.forEach(e => e.hidden = val)
    if (val) {
      allWriteable.value = false
      allRequired.value = false
      allReadable.value = false
    }
  }
})
/**
 * 更改可读
 * @param row
 */
const changeReadable = (row: FormProperty) => {
  if (row.readable) {
    row.writeable = false
    row.required = false
    row.hidden = false
  }
}
/**
 * 更改必填
 * @param row
 */
const changeRequired = (row: FormProperty) => {
  if (row.required) {
    row.writeable = true
    row.readable = false
    row.hidden = false
  }
}
/**
 * 更改可写
 * @param row
 */
const changeWriteable = (row: FormProperty) => {
  if (row.writeable) {
    row.readable = false
    row.hidden = false
  } else {
    row.required = false
  }
}
/**
 * 更改隐藏
 * @param row
 */
const changeHidden = (row: FormProperty) => {
  if (row.hidden) {
    row.readable = false
    row.writeable = false
    row.required = false
  }
}
onMounted(() => {
  const formProperties = node.value.formProperties
  node.value.formProperties = fields.value.filter(e => e.value !== undefined).map(e => ({
    id: e.id,
    name: e.title,
    readable: e.props.disabled || false,
    writeable: !e.props.disabled || false,
    hidden: e.props.hidden || false,
    required: (e.props.required && !e.props.disabled) || false
  }))
  node.value.formProperties.forEach(item => {
    const properties = formProperties.find(f => f.id === item.id)
    if (properties) {
      item.readable = properties.readable
      item.writeable = properties.writeable
      item.hidden = properties.hidden
      item.required = properties.required
    }
  })
})
</script>

<template>
  <segmented v-model="activeName" stretch :block="false">
    <el-tab-pane label="设置审批人" name="properties">
      <el-form label-position="top" label-width="90px">
        <el-form-item prop="assigneeType" label="审批对象">
          <el-radio-group v-model="node.assigneeType">
            <el-radio label="user">指定人员</el-radio>
            <el-radio label="role">指定角色</el-radio>
            <el-radio label="choice">发起人自选</el-radio>
            <el-radio label="self">发起人自己</el-radio>
            <el-radio label="leader">多级上级</el-radio>
            <el-radio label="formUser">表单内人员</el-radio>
            <el-radio label="formRole">表单内角色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="users" label="指定人员" v-if="node.assigneeType === 'user'">
          <user-selection multiple placeholder="请选择人员" v-model="node.users"/>
        </el-form-item>
        <el-form-item prop="selfSelect" label="发起人自选择" v-if="node.assigneeType === 'choice'">
          <el-radio-group v-model="node.choice">
            <el-radio-button :label="false">单选</el-radio-button>
            <el-radio-button :label="true">多选</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="self" label="发起人自己" v-if="node.assigneeType === 'self'">
          <el-text>
            发起人自己作为审批人进行审批
          </el-text>
        </el-form-item>
        <el-form-item prop="leader" label="多级上级" v-if="node.assigneeType === 'leader'">
          <el-select v-model="node.leader" placeholder="请选择多级上级">
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
        <el-form-item prop="roles" label="指定角色" v-if="node.assigneeType === 'role'">
          <role-selection multiple placeholder="请选择角色" v-model="node.roles"/>
        </el-form-item>
        <el-form-item prop="formUser" label="表单内人员" v-if="node.assigneeType === 'formUser'">
          <el-select placeholder="选择表单内人员" v-model="node.formUser">
            <el-option
                v-for="item in fields.filter(e=>e.name === 'UserSelection')"
                :key="item.id"
                :label="item.title"
                :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="formRole" label="表单内角色" v-if="node.assigneeType === 'formRole'">
          <el-select placeholder="选择表单内角色" v-model="node.formRole">
            <el-option
                v-for="item in fields.filter(e=>e.name === 'RoleSelection')"
                :key="item.id"
                :label="item.title"
                :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="method" label="多人审批方式">
          <el-radio-group class="flex-column" v-model="node.multi">
            <el-radio label="sequential">依次审批（按顺序审批）</el-radio>
            <el-radio label="joint">会签（需要所有审批人都通过才可通过）</el-radio>
            <el-radio label="single">或签（其中一名审批人通过或驳回即可）</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="nobody" label="审批人为空">
          <el-radio-group v-model="node.nobody">
            <el-radio label="pass">自动通过</el-radio>
            <el-radio label="reject">自动驳回</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="表单权限" name="formPermissions">
      <el-table :data="node.formProperties" style="width: 100%">
        <el-table-column prop="name" label="字段"/>
        <el-table-column prop="readable">
          <template #header>
            <el-checkbox v-model="allReadable" label="可读"/>
          </template>
          <template #default="{row}">
            <el-checkbox v-model="row.readable" @change="changeReadable(row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="writeable">
          <template #header>
            <el-checkbox v-model="allWriteable" label="可写"/>
          </template>
          <template #default="{row}">
            <el-checkbox v-model="row.writeable" @change="changeWriteable(row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="required">
          <template #header>
            <el-checkbox v-model="allRequired" label="必填"/>
          </template>
          <template #default="{row}">
            <el-checkbox v-model="row.required" @change="changeRequired(row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="hidden">
          <template #header>
            <el-checkbox v-model="allHidden" label="隐藏"/>
          </template>
          <template #default="{row}">
            <el-checkbox v-model="row.hidden" @change="changeHidden(row)"/>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="操作权限" name="operationPermissions">
      <div class="flow-opt-item">
        <el-icon :size="32" class="flow-opt-item__icon">
          <CircleCheck/>
        </el-icon>
        <div class="flow-opt-item__content">
          <el-text tag="b">
            同意
          </el-text>
          <div class="flow-opt-item__second">
            同意描述、同意描述、同意描述、同意描述、同意描述、同意描述
          </div>
        </div>
        <el-switch
            v-model="node.operations.complete"
            inline-prompt
            active-text="开"
            inactive-text="关"
        />
      </div>
      <el-divider/>
      <div class="flow-opt-item">
        <el-icon :size="32" class="flow-opt-item__icon">
          <CircleClose/>
        </el-icon>
        <div class="flow-opt-item__content">
          <el-text tag="b">
            拒绝
          </el-text>
          <div class="flow-opt-item__second">
            拒绝描述、拒绝描述、拒绝描述、拒绝描述、拒绝描述、拒绝描述
          </div>
        </div>
        <el-switch
            v-model="node.operations.refuse"
            inline-prompt
            active-text="开"
            inactive-text="关"
        />
      </div>
      <el-divider/>
      <div class="flow-opt-item">
        <el-icon :size="32" class="flow-opt-item__icon">
          <Switch/>
        </el-icon>
        <div class="flow-opt-item__content">
          <el-text tag="b">
            转办
          </el-text>
          <div class="flow-opt-item__second">
            转办描述、转办描述、转办描述、转办描述、转办描述、转办描述
          </div>
        </div>
        <el-switch
            v-model="node.operations.transfer"
            inline-prompt
            active-text="开"
            inactive-text="关"
        />
      </div>
      <el-divider/>
      <div class="flow-opt-item">
        <el-icon :size="32" class="flow-opt-item__icon">
          <Plus/>
        </el-icon>
        <div class="flow-opt-item__content">
          <el-text tag="b">
            加签
          </el-text>
          <div class="flow-opt-item__second">
            加签描述、加签描述、加签描述、加签描述、加签描述、加签描述
          </div>
        </div>
        <el-switch
            v-model="node.operations.addMulti"
            inline-prompt
            active-text="开"
            inactive-text="关"
        />
      </div>
      <el-divider/>
      <div class="flow-opt-item">
        <el-icon :size="32" class="flow-opt-item__icon">
          <Minus/>
        </el-icon>
        <div class="flow-opt-item__content">
          <el-text tag="b">
            减签
          </el-text>
          <div class="flow-opt-item__second">
            减签描述、减签描述、减签描述、减签描述、减签描述、减签描述
          </div>
        </div>
        <el-switch
            v-model="node.operations.minusMulti"
            inline-prompt
            active-text="开"
            inactive-text="关"
        />
      </div>
      <el-divider/>
    </el-tab-pane>
  </segmented>
</template>

<style scoped lang="scss">
.flex-column {
  display: flex !important;
  align-items: flex-start !important;
  flex-direction: column !important;
}

.flow-opt-item {
  display: flex;
  align-items: center;

  .flow-opt-item__icon {
    background: var(--el-color-primary);
    color: #fff;
    border-radius: 7px;
    padding: 3px;
  }

  .flow-opt-item__content {
    box-sizing: border-box;
    flex: 1;
    margin-left: 20px;
    font-size: 14px;

    .flow-opt-item__second {
      margin-top: 3px;
      font-size: 12px;
      color: var(--el-text-color-placeholder);
    }
  }
}
</style>
