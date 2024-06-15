<script setup lang="ts">
import type { ApprovalNode, FormProperty } from '../nodes/type'
import type { Field } from '@/components/Render/type'
import UserSelector from '@/components/UserSelector/index.vue'
import AssigneePanel from './AssigneePanel.vue'
import type { Ref } from 'vue'
import TaskListeners from './TaskListeners.vue'

const { fields } = inject<{ fields: Ref<Field[]>; admin: string[] }>('flowDesign', {
  fields: ref([]),
  admin: []
})
const props = defineProps<{
  activeData: ApprovalNode
}>()
const spacer = h(ElDivider)
const activeName = ref('properties')
const allReadonly = computed({
  get() {
    return props.activeData.formProperties.every((e) => e.readonly)
  },
  set(val) {
    props.activeData.formProperties.forEach((e) => (e.readonly = val))
    if (val) {
      allHidden.value = false
      allRequired.value = false
    }
  }
})
const allHidden = computed({
  get() {
    return props.activeData.formProperties.every((e) => e.hidden)
  },
  set(val) {
    props.activeData.formProperties.forEach((e) => (e.hidden = val))
    if (val) {
      allRequired.value = false
      allReadonly.value = false
    }
  }
})
const allRequired = computed({
  get() {
    return props.activeData.formProperties.every((e) => e.required)
  },
  set(val) {
    props.activeData.formProperties.forEach((e) => (e.required = val))
    if (val) {
      allReadonly.value = false
      allHidden.value = false
    }
  }
})

const changeReadonly = (row: FormProperty) => {
  if (row.readonly) {
    row.required = false
    row.hidden = false
  }
}
const changeRequired = (row: FormProperty) => {
  if (row.required) {
    row.readonly = false
    row.hidden = false
  }
}
const changeHidden = (row: FormProperty) => {
  if (row.hidden) {
    row.readonly = false
    row.required = false
  }
}

watchEffect(() => {
  const formProperties = props.activeData.formProperties
  props.activeData.formProperties = fields.value.map((field) => ({
    id: field.id,
    name: field.label,
    readonly: field.readonly || false,
    hidden: field.hidden,
    required: field.required || false
  }))
  props.activeData.formProperties.forEach((item) => {
    const properties = formProperties.find((f) => f.id === item.id)
    if (properties) {
      item.readonly = properties.readonly
      item.hidden = properties.hidden
      item.required = properties.required
    }
  })
})
</script>

<template>
  <el-tabs v-model="activeName" stretch class="el-segmented">
    <el-tab-pane label="审批人" name="properties">
      <el-form label-position="top" label-width="90px">
        <AssigneePanel :active-data="activeData" :fields="fields" type="审批">
          <el-col :span="8">
            <el-radio value="autoRefuse">自动拒绝</el-radio>
          </el-col>
        </AssigneePanel>
        <el-form-item prop="method" label="多人审批方式">
          <el-radio-group v-model="activeData.multi" class="flex-col important-items-start">
            <el-radio value="sequential">依次审批（按顺序审批）</el-radio>
            <el-radio value="joint">会签（需要所有审批人都通过）</el-radio>
            <el-radio value="single">或签（其中一名审批人通过即可）</el-radio>
          </el-radio-group>
          <el-text v-if="activeData.multi === 'joint'">
            需要 <el-input-number v-model="activeData.multiPercent" :min="1" :max="100" /> %人员通过
          </el-text>
        </el-form-item>
        <el-form-item prop="nobody" label="审批人为空">
          <el-radio-group v-model="activeData.nobody" class="w-full">
            <el-row>
              <el-col :span="12">
                <el-radio value="pass">自动通过</el-radio>
              </el-col>
              <el-col :span="12">
                <el-radio value="assign">指定人员</el-radio>
              </el-col>
              <el-col :span="12">
                <el-radio value="reject">自动拒绝</el-radio>
              </el-col>
              <el-col :span="12">
                <el-radio value="admin">转交流程管理员</el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
          <user-selector
            v-if="activeData.nobody === 'assign'"
            multiple
            v-model="activeData.nobodyUsers"
            placeholder="指定人员"
          />
        </el-form-item>
        <el-form-item prop="taskListeners" label="任务监听器">
          <TaskListeners :node="activeData" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="表单权限" name="formPermissions">
      <el-table :data="activeData.formProperties">
        <el-table-column prop="name" label="字段" />
        <el-table-column prop="readonly">
          <template #header>
            <el-checkbox v-model="allReadonly" label="只读" />
          </template>
          <template #default="{ row }">
            <el-checkbox v-model="row.readonly" @change="changeReadonly(row)" />
          </template>
        </el-table-column>
        <el-table-column prop="required">
          <template #header>
            <el-checkbox v-model="allRequired" label="必填" />
          </template>
          <template #default="{ row }">
            <el-checkbox v-model="row.required" @change="changeRequired(row)" />
          </template>
        </el-table-column>
        <el-table-column prop="hidden">
          <template #header>
            <el-checkbox v-model="allHidden" label="隐藏" />
          </template>
          <template #default="{ row }">
            <el-checkbox v-model="row.hidden" @change="changeHidden(row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="操作权限" name="operationPermissions">
      <el-space fill :size="0" direction="horizontal" :spacer="spacer">
        <div class="opt-item">
          <el-icon :size="32" class="opt-item__icon">
            <CircleCheck />
          </el-icon>
          <div class="opt-item__content">
            <el-text tag="b"> 同意</el-text>
            <div class="opt-item__second">审批通过，流转到下一个节点</div>
          </div>
          <el-switch
            v-model="activeData.operations.complete"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </div>
        <div class="opt-item">
          <el-icon :size="32" class="opt-item__icon">
            <CircleClose />
          </el-icon>
          <div class="opt-item__content">
            <el-text tag="b"> 拒绝</el-text>
            <div class="opt-item__second">当拒绝任务时，当前任务被终止，并结束整个流程</div>
          </div>
          <el-switch
            v-model="activeData.operations.refuse"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </div>
        <div class="opt-item">
          <el-icon :size="32" class="opt-item__icon">
            <Back />
          </el-icon>
          <div class="opt-item__content">
            <el-text tag="b"> 退回</el-text>
            <div class="opt-item__second">
              若审批内容存在问题，当前任务将中止并回退至特定历史任务节点
            </div>
          </div>
          <el-switch
            v-model="activeData.operations.back"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </div>
        <div class="opt-item">
          <el-icon :size="32" class="opt-item__icon">
            <Switch />
          </el-icon>
          <div class="opt-item__content">
            <el-text tag="b"> 转交</el-text>
            <div class="opt-item__second">
              将当前任务移交给其他人处理，以便他们继续执行所需的操作
            </div>
          </div>
          <el-switch
            v-model="activeData.operations.transfer"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </div>
        <div class="opt-item">
          <el-icon :size="32" class="opt-item__icon">
            <UserFilled />
          </el-icon>
          <div class="opt-item__content">
            <el-text tag="b"> 委派</el-text>
            <div class="opt-item__second">将当前任务暂时交由他人处理，待其完成后再交回自己处理</div>
          </div>
          <el-switch
            v-model="activeData.operations.delegate"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </div>
        <div class="opt-item">
          <svg-icon class-name="opt-item__icon" name="add-user" :size="32" />
          <div class="opt-item__content">
            <el-text tag="b"> 加签</el-text>
            <div class="opt-item__second">
              在当前任务上额外添加新人员，以处理相关事项或提供必要的审批或意见
            </div>
          </div>
          <el-switch
            v-model="activeData.operations.addMulti"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </div>
        <div class="opt-item">
          <svg-icon class-name="opt-item__icon" name="reduce-user" :size="32" />
          <div class="opt-item__content">
            <el-text tag="b"> 减签</el-text>
            <div class="opt-item__second">
              在当前任务中减少处理人员数量，以简化流程或重新分配责任
            </div>
          </div>
          <el-switch
            v-model="activeData.operations.minusMulti"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </div>
      </el-space>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
@import '@/styles/el-segmented.scss';

.opt-item {
  display: flex;
  align-items: center;

  .opt-item__icon {
    background: var(--el-color-primary);
    color: var(--el-color-white);
    border-radius: 7px;
    padding: 3px;
  }

  .opt-item__content {
    box-sizing: border-box;
    flex: 1;
    margin-left: 20px;
    font-size: 14px;

    .opt-item__second {
      margin-top: 3px;
      font-size: 12px;
      color: var(--el-text-color-placeholder);
    }
  }
}
</style>
