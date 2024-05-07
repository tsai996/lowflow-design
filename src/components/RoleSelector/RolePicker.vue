<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'
import { type ElTree } from 'element-plus'
import { getList } from '@/api/modules/role'

export type ModelValueType = string | string[] | null | undefined

export interface RoleDropdownProps {
  modelValue: ModelValueType
  multiple?: boolean
}

const treeProps = {
  label: 'name',
  children: 'children',
  isLeaf: 'leaf',
  class: (role: TreeNodeData) => renderClass(role)
}

export interface Role {
  id: string
  name: string
}

const $props = withDefaults(defineProps<RoleDropdownProps>(), {
  multiple: false
})

const $emits = defineEmits<{
  (e: 'update:modelValue', modelValue: ModelValueType): void
}>()

const value = useVModel($props, 'modelValue', $emits)

const roleOptions = ref<Role[]>([])
const roleOrgOptions = ref<Role[]>([])
const orgTreeRef = ref<InstanceType<typeof ElTree>>()
const expandedKeys = ref<string[]>([])

const renderClass = (role: TreeNodeData): string | { [key: string]: boolean } => {
  const val = roleOptions.value.find((e) => e.id === role.id)
  if (val) {
    return 'is-active'
  } else {
    return ''
  }
}

const onNodeClick = (data: Role) => {
  if ($props.multiple) {
    const index = roleOptions.value.findIndex((e) => e.id === data.id)
    if (index === -1) {
      roleOptions.value.push(data)
      roleOptions.value.sort((a, b) => a.id.localeCompare(b.id))
    } else {
      roleOptions.value.splice(index, 1)
    }
  } else {
    const index = roleOptions.value.findIndex((e) => e.id === data.id)
    if (index === -1) {
      roleOptions.value = [data]
    } else {
      roleOptions.value.splice(index, 1)
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
      roleOrgOptions.value = res.data.map((e) => {
        return {
          id: e.id,
          name: e.name
        } as Role
      })
    }
  })

  let roleIds: string[] = []
  if (Array.isArray(value.value)) {
    roleIds.push(...value.value)
  } else if (value.value) {
    roleIds.push(value.value)
  }
  if (roleIds.length > 0) {
    getList(roleIds).then((res) => {
      if (res.success) {
        roleOptions.value = res.data.map((role) => {
          return {
            id: role.id,
            name: role.name
          } as Role
        })
        roleOptions.value.sort((a, b) => a.id.localeCompare(b.id))
      }
    })
  } else {
    roleOptions.value = []
  }
}
const handelConfirm = () => {
  if ($props.multiple) {
    value.value = roleOptions.value.map((e) => e.id)
  } else {
    if (roleOptions.value.length > 0) {
      value.value = roleOptions.value[0].id
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
    title="选择角色"
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
          :data="roleOrgOptions"
          :default-expanded-keys="expandedKeys"
          :props="treeProps"
          :filter-node-method="filterNode"
          @node-click="onNodeClick"
        >
          <template #default="{ data }">
            <div class="flex flex-1 flex-items-center flex-justify-between">
              <div class="flex-center">
                <el-icon :size="16">
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
