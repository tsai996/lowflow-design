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
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

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
const defaultNames = new WeakMap<
  FlowNode,
  { key: string; params?: Record<string, number>; value: string }
>()

const rememberDefaultName = (node: FlowNode, key: string, params?: Record<string, number>) => {
  const value = params ? t(key, params) : t(key)
  node.name = value
  defaultNames.set(node, { key, params, value })
}

const walkNodes = (node: FlowNode, visit: (node: FlowNode, branchIndex?: number) => void) => {
  visit(node)
  if ('branches' in node) {
    ;(node as BranchNode).branches.forEach((branch, index) => {
      visit(branch, index + 1)
      if (branch.next) walkNodes(branch.next, visit)
    })
  }
  if (node.next) walkNodes(node.next, visit)
}

const registerExistingDefaultNames = () => {
  const keys: Partial<Record<NodeType, string>> = {
    start: '发起人',
    end: '流程结束',
    exclusive: '独占网关',
    cc: '抄送人',
    timer: '计时等待',
    notify: '消息通知',
    service: '服务节点',
    approval: '审批人'
  }
  walkNodes(props.process, (node, branchIndex) => {
    const key =
      node.type === 'condition'
        ? (node as ConditionNode).def
          ? '默认条件'
          : '条件{index}'
        : keys[node.type]
    if (!key) return
    const params = key === '条件{index}' ? { index: branchIndex || 1 } : undefined
    const value = params ? t(key, params) : t(key)
    if (node.name === value) defaultNames.set(node, { key, params, value })
  })
}

registerExistingDefaultNames()
watch(locale, () => {
  walkNodes(props.process, (node) => {
    const current = defaultNames.get(node)
    if (!current) return
    if (node.name !== current.value) {
      defaultNames.delete(node)
      return
    }
    rememberDefaultName(node, current.key, current.params)
  })
})

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
    name: '',
    next: next,
    branches: []
  } as ExclusiveNode
  rememberDefaultName(exclusiveNode, '独占网关')
  if (next) {
    next.pid = id
  }
  addCondition(exclusiveNode)
  addCondition(exclusiveNode)
  node.next = exclusiveNode
  if (exclusiveNode.branches.length > 0) {
    const condition = exclusiveNode.branches[exclusiveNode.branches.length - 1] as ConditionNode
    condition.def = true
    rememberDefaultName(condition, '默认条件')
  }
}
const addCondition = (node: FlowNode) => {
  const exclusive = node as ExclusiveNode
  const conditionIndex = exclusive.branches.length + 1
  const condition = {
    id: nextId(),
    pid: exclusive.id,
    type: 'condition',
    def: false,
    name: '',
    conditions: {
      operator: 'and',
      conditions: [],
      groups: []
    } as FilterRules,
    next: undefined
  } as ConditionNode
  rememberDefaultName(condition, '条件{index}', { index: conditionIndex })
  exclusive.branches.splice(exclusive.branches.length - 1, 0, condition)
}
const addCc = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  const ccNode = {
    id: id,
    pid: node.id,
    type: 'cc',
    name: '',
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
  rememberDefaultName(ccNode, '抄送人')
  node.next = ccNode
  if (next) {
    next.pid = id
  }
}
const addTimer = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  const timerNode = {
    id: id,
    pid: node.id,
    name: '',
    type: 'timer',
    next: next,
    waitType: 'duration',
    unit: 'PT%sS',
    duration: 0,
    timeDate: undefined
  } as TimerNode
  rememberDefaultName(timerNode, '计时等待')
  node.next = timerNode
  if (next) {
    next.pid = id
  }
}

const addNotify = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  const notifyNode = {
    id: id,
    pid: node.id,
    name: '',
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
  rememberDefaultName(notifyNode, '消息通知')
  node.next = notifyNode
  if (next) {
    next.pid = id
  }
}
const addService = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  const serviceNode = {
    id: id,
    pid: node.id,
    type: 'service',
    name: '',
    next: next,
    implementationType: '',
    implementation: ''
  } as ServiceNode
  rememberDefaultName(serviceNode, '服务节点')
  node.next = serviceNode
  if (next) {
    next.pid = id
  }
}
const addApproval = (node: FlowNode) => {
  const next = node.next
  const id = nextId()
  const approvalNode = {
    id: id,
    pid: node.id,
    type: 'approval',
    name: '',
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
  rememberDefaultName(approvalNode, '审批人')
  node.next = approvalNode
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
      <el-tooltip :content="t('放大')" placement="bottom-start">
        <el-button icon="plus" @click="zoom += 10" :disabled="zoom >= 170" circle></el-button>
      </el-tooltip>
      <span>{{ zoom }}%</span>
      <el-tooltip :content="t('缩小')" placement="bottom-start">
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
