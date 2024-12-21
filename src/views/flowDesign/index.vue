<script setup lang="ts">
import TreeNode from './nodes/TreeNode.vue'
import Panel from './panels/index.vue'
import type { ErrorInfo, FlowNode, ServiceNode, TimerNode } from './nodes/type'
import type {
  ApprovalNode,
  BranchNode,
  CcNode,
  NotifyNode,
  ConditionNode,
  ExclusiveNode,
  NodeType
} from './nodes/type'
import type { FilterRules } from '@/components/AdvancedFilter/type'
import type { Field } from '@/components/Render/type'
import { useDraggableScroll } from '@/hooks/useDraggableScroll'

const props = withDefaults(
  defineProps<{
    process: FlowNode
    fields: Field[]
    readOnly?: boolean
    defaultZoom?: number
    bgColor?: string
  }>(),
  {
    readOnly: false,
    defaultZoom: 100,
    bgColor: 'var(--el-bg-color-page)'
  }
)

const flatFields = computed(() => {
  const all: Field[] = []
  const loop = (children: Field[]) => {
    children.forEach((field) => {
      if (field.type === 'formItem') {
        all.push(field)
      }
      if (Array.isArray(field.children)) {
        loop(field.children)
      }
    })
  }
  loop(props.fields)
  return all
})
const getScale = computed(() => zoom.value / 100)
const zoom = ref(props.defaultZoom)
const readOnly = computed(() => props.readOnly)
const activeData = ref<FlowNode>({
  id: '',
  name: '',
  type: 'start'
})
const penalVisible = ref(false)
const nodesError = ref<Recordable<ErrorInfo[]>>({})

const designerContainerRef = ref<HTMLElement | null>(null)
useDraggableScroll(designerContainerRef)
provide('flowDesign', {
  readOnly: readOnly,
  fields: flatFields,
  nodesError: nodesError
})
const openPenal = (node: FlowNode) => {
  activeData.value = node
  penalVisible.value = true
}
const nextId = (): string => {
  let id = `node_${Math.random().toString(36).substring(2, 7)}`
  const findId = (node: FlowNode, id: string): boolean => {
    if (node.id === id) {
      return true
    }
    if (node.next) {
      return findId(node.next, id)
    }
    if ('branches' in node) {
      const branchNode = node as BranchNode
      if (branchNode.branches && branchNode.branches.length > 0) {
        return branchNode.branches.some((item) => {
          return findId(item, id)
        })
      }
    }
    return false
  }
  if (findId(props.process, id)) {
    return nextId()
  }
  return id
}
const addExclusive = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  const exclusiveNode = {
    id: id,
    pid: node.id,
    type: 'exclusive',
    name: '独占网关',
    next: next,
    branches: []
  } as ExclusiveNode
  if (next) {
    next.pid = id
  }
  addCondition(exclusiveNode)
  addCondition(exclusiveNode)
  node.next = exclusiveNode
  if (exclusiveNode.branches.length > 0) {
    const condition = exclusiveNode.branches[exclusiveNode.branches.length - 1] as ConditionNode
    condition.def = true
    condition.name = '默认条件'
  }
}
const addCondition = (node: FlowNode) => {
  const exclusive = node as ExclusiveNode
  exclusive.branches.splice(exclusive.branches.length - 1, 0, {
    id: nextId(),
    pid: exclusive.id,
    type: 'condition',
    def: false,
    name: `条件${exclusive.branches.length + 1}`,
    conditions: {
      operator: 'and',
      conditions: [],
      groups: []
    } as FilterRules,
    next: undefined
  })
}
const addCc = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  node.next = {
    id: id,
    pid: node.id,
    type: 'cc',
    name: '抄送人',
    next: next,
    assigneeType: 'user',
    formUser: '',
    formRole: '',
    users: [],
    roles: [],
    leader: 1,
    orgLeader: 1,
    choice: false,
    self: false,
    formProperties: []
  } as CcNode
  if (next) {
    next.pid = id
  }
}
const addTimer = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  node.next = {
    id: id,
    pid: node.id,
    name: '计时等待',
    type: 'timer',
    next: next,
    waitType: 'duration',
    unit: 'PT%sS',
    duration: 0,
    timeDate: undefined
  } as TimerNode
  if (next) {
    next.pid = id
  }
}

const addNotify = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  node.next = {
    id: id,
    pid: node.id,
    name: '消息通知',
    type: 'notify',
    next: next,
    assigneeType: 'user',
    formUser: '',
    formRole: '',
    users: [],
    roles: [],
    leader: 1,
    orgLeader: 1,
    choice: false,
    self: false,
    types: ['site'],
    subject: '',
    content: ''
  } as NotifyNode
  if (next) {
    next.pid = id
  }
}
const addService = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  node.next = {
    id: id,
    pid: node.id,
    type: 'service',
    name: '服务节点',
    next: next,
    implementationType: '',
    implementation: ''
  } as ServiceNode
  if (next) {
    next.pid = id
  }
}
const addApproval = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  node.next = {
    id: id,
    pid: node.id,
    type: 'approval',
    name: '审批人',
    executionListeners: [],
    next: next,
    // 属性
    assigneeType: 'user',
    formUser: '',
    formRole: '',
    users: [],
    roles: [],
    leader: 1,
    orgLeader: 1,
    choice: false,
    self: false,
    multi: 'sequential',
    multiPercent: 100,
    nobody: 'pass',
    nobodyUsers: [],
    formProperties: [],
    operations: {
      complete: true,
      refuse: true,
      back: true,
      transfer: true,
      delegate: true,
      addMulti: false,
      minusMulti: false
    }
  } as ApprovalNode
  if (next) {
    next.pid = id
  }
}
const addNode = (type: NodeType, node: FlowNode) => {
  const addMap: Recordable<(node: FlowNode) => void> = {
    exclusive: addExclusive,
    condition: addCondition,
    cc: addCc,
    timer: addTimer,
    notify: addNotify,
    service: addService,
    approval: addApproval
  }
  const fun = addMap[type]
  fun && fun(node)
}
const delNode = (del: FlowNode) => {
  delete nodesError.value[del.id]
  delNodeNext(props.process, del)
}
const delNodeNext = (next: FlowNode, del: FlowNode) => {
  delete nodesError.value[del.id]
  if (next.id === del.pid) {
    if ('branches' in next && next.next?.id !== del.id) {
      const branchNode = next as BranchNode
      const index = branchNode.branches.findIndex((item) => item.id === del.id)
      if (index !== -1) {
        if (branchNode.branches.length <= 2) {
          delError(branchNode)
          delNode(branchNode)
        } else {
          delError(del)
          branchNode.branches.splice(index, 1)
        }
      }
    } else {
      if (del.next && del.next.pid) {
        del.next.pid = next.id
      }
      next.next = del.next
    }
  } else {
    if (next.next) {
      delNodeNext(next.next, del)
    }
    if ('branches' in next) {
      const nextBranch = next as BranchNode
      if (nextBranch.branches && nextBranch.branches.length > 0) {
        nextBranch.branches.forEach((item) => {
          delNodeNext(item, del)
        })
      }
    }
  }
}
const delError = (node: FlowNode) => {
  delete nodesError.value[node.id]
  if (node.next) {
    delError(node.next)
  }
  if ('branches' in node) {
    const branchNode = node as BranchNode
    if (branchNode.branches && branchNode.branches.length > 0) {
      branchNode.branches.forEach((item) => {
        delError(item)
      })
    }
  }
}
const validate = () => {
  return new Promise((resolve, reject) => {
    const errors = Object.values(nodesError.value).flat()
    if (errors.length > 0) {
      reject(errors)
    } else {
      resolve(true)
    }
  })
}
defineExpose({
  validate
})
</script>

<template>
  <div class="designer-container cursor-default active:cursor-grabbing" ref="designerContainerRef">
    <div class="tool">
      <slot></slot>
    </div>
    <!--放大/缩小-->
    <div class="zoom">
      <el-tooltip content="放大" placement="bottom-start">
        <el-button icon="plus" @click="zoom += 10" :disabled="zoom >= 170" circle></el-button>
      </el-tooltip>
      <span>{{ zoom }}%</span>
      <el-tooltip content="缩小" placement="bottom-start">
        <el-button icon="minus" @click="zoom -= 10" circle :disabled="zoom <= 50"></el-button>
      </el-tooltip>
    </div>
    <!--流程树-->
    <div class="node-container">
      <TreeNode :node="process" @addNode="addNode" @delNode="delNode" @activeNode="openPenal" />
    </div>
    <!--属性面板-->
    <Panel v-model="penalVisible" :active-data="activeData" />
  </div>
</template>

<style scoped lang="scss">
.designer-container {
  --flow-bg-color: v-bind(bgColor);
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: var(--flow-bg-color);

  .zoom {
    position: fixed;
    z-index: 999;
    top: 30px;
    right: 40px;

    span {
      margin: 0 10px;
    }
  }

  .tool {
    position: fixed;
    z-index: 999;
    top: 5px;
    left: 5px;
    display: flex;
    gap: 5px;
  }

  .node-container {
    margin: 0 auto;
    transform: scale(v-bind(getScale));
    transform-origin: 50% 0 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
