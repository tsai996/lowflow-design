<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'
import { getList } from '@/api/modules/user'
import type { TreeInstance } from 'element-plus'

export type ModelValueType = string | string[] | null | undefined

export interface UserDropdownProps {
  modelValue: ModelValueType
  multiple?: boolean
}

const treeProps = {
  label: 'name',
  children: 'children',
  isLeaf: 'leaf',
  class: (org: TreeNodeData) => renderClass(org)
}

export interface Org {
  id: string
  type: 'user' | 'dept'
  avatar?: string
  name: string
  leaf: boolean
}

const $props = withDefaults(defineProps<UserDropdownProps>(), {
  multiple: false
})

const $emits = defineEmits<{
  (e: 'update:modelValue', modelValue: ModelValueType): void
}>()

const value = useVModel($props, 'modelValue', $emits)

const userOptions = ref<Org[]>([])
const userOrgOptions = ref<Org[]>([])
const orgTreeRef = ref<TreeInstance>()
const expandedKeys = ref<string[]>([])

const renderClass = (org: TreeNodeData): string | { [key: string]: boolean } => {
  const val = userOptions.value.find((e) => e.id === org.id)
  if (val) {
    return 'is-active'
  } else {
    return ''
  }
}

const onNodeClick = (data: Org) => {
  if (data.type !== 'user') return
  if ($props.multiple) {
    const index = userOptions.value.findIndex((e) => e.id === data.id)
    if (index === -1) {
      userOptions.value.push(data)
      userOptions.value.sort((a, b) => a.id.localeCompare(b.id))
    } else {
      userOptions.value.splice(index, 1)
    }
  } else {
    const index = userOptions.value.findIndex((e) => e.id === data.id)
    if (index === -1) {
      userOptions.value = [data]
    } else {
      userOptions.value.splice(index, 1)
    }
  }
}
const dialogVisible = ref(false)
const queryForm = reactive({
  name: null
})

watch(
  () => queryForm.name,
  (val) => {
    orgTreeRef.value?.filter(val)
  }
)
const filterNode = (value: string, data: TreeNodeData): boolean => {
  if (!value) return true
  return data.name.includes(value)
}
const open = () => {
  dialogVisible.value = true
}
const onOpen = () => {
  getList().then((res) => {
    if (res.success) {
      userOrgOptions.value = res.data.map((e) => {
        return {
          id: e.username,
          name: e.name,
          type: 'user',
          leaf: true,
          avatar: e.avatar
        } as Org
      })
    }
  })

  let userIds: string[] = []
  if (Array.isArray(value.value)) {
    userIds.push(...value.value)
  } else if (value.value) {
    userIds.push(value.value)
  }
  if (userIds.length > 0) {
    getList(userIds).then((res) => {
      if (res.success) {
        userOptions.value = res.data.map((user) => {
          return {
            id: user.username,
            name: user.name,
            avatar: user.avatar,
            type: 'user',
            leaf: true
          } as Org
        })
        userOptions.value.sort((a, b) => a.id.localeCompare(b.id))
      }
    })
  } else {
    userOptions.value = []
  }
}
const handelConfirm = () => {
  if ($props.multiple) {
    value.value = userOptions.value.map((e) => e.id)
  } else {
    if (userOptions.value.length > 0) {
      value.value = userOptions.value[0].id
    } else {
      value.value = null
    }
  }
  dialogVisible.value = false
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    @open="onOpen"
    align-center
    draggable
    title="选择用户"
    width="30%"
  >
    <el-card shadow="never" class="org-card">
      <template #header>
        <el-input
          v-model="queryForm.name"
          placeholder="输入关键字进行查询"
          :style="{ width: '100%' }"
          suffix-icon="search"
          clearable
        >
        </el-input>
      </template>
      <el-scrollbar tag="div" class="org-tree">
        <el-tree
          ref="orgTreeRef"
          node-key="id"
          :data="userOrgOptions"
          :default-expanded-keys="expandedKeys"
          :props="treeProps"
          :filter-node-method="filterNode"
          @node-click="onNodeClick"
        >
          <template #default="{ data }">
            <div class="flex flex-1 flex-items-center flex-justify-between">
              <div class="flex-center">
                <el-avatar v-if="data.type === 'user'" :size="25" :src="data.avatar">
                  {{ data.name.charAt(0) }}
                </el-avatar>
                <el-icon v-else :size="16">
                  <School />
                </el-icon>
                &nbsp;{{ data.name }}
              </div>
              <el-icon class="is-selected">
                <Check />
              </el-icon>
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </el-card>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
:deep {
  .el-tree {
    --el-tree-node-content-height: 40px;

    .el-tree-node__content {
      border-radius: 8px;
      margin: 2px 0 2px 0;
    }

    .is-active {
      color: var(--el-color-primary);

      .is-selected {
        display: block;
      }
    }
  }
}

.el-card {
  background-color: transparent;

  :deep(.el-card__header) {
    padding: 10px !important;
  }

  :deep(.el-card__body) {
    padding: 0 !important;
  }
}

.org-tree {
  height: 270px;
  padding: 5px;
}

.is-selected {
  display: none;
  padding-right: 15px;
}
</style>
