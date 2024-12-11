import type { FilterRules } from '@/components/AdvancedFilter/type'

export type NodeType =
  | 'start'
  | 'approval'
  | 'cc'
  | 'exclusive'
  | 'timer'
  | 'notify'
  | 'service'
  | 'condition'
  | 'end'

export interface FlowNode {
  id: string
  pid?: string
  name: string
  type: NodeType
  executionListeners?: NodeListener[]
  next?: FlowNode
}

export interface NodeListener {
  event: string
  implementationType: 'class' | 'expression' | 'delegateExpression'
  implementation: string
}

export interface StartNode extends FlowNode {
  formProperties: FormProperty[]
}

export interface EndNode extends FlowNode {}

export interface AssigneeNode extends FlowNode {
  // 审批方式
  assigneeType:
    | 'user'
    | 'role'
    | 'choice'
    | 'self'
    | 'leader'
    | 'orgLeader'
    | 'formUser'
    | 'formRole'
    | 'autoRefuse'
  // 审批人
  users: string[]
  // 审批角色
  roles: string[]
  // 表单内人员
  formUser: string
  // 表单内角色
  formRole: string
  // 主管
  leader: number
  // 组织主管
  orgLeader: number
  // 自选：true-多选，false-单选
  choice: boolean
  // 发起人自己
  self: boolean
}

export interface CcNode extends AssigneeNode {
  formProperties: FormProperty[]
}

export interface NotifyNode extends AssigneeNode {
  types: ('site' | 'email' | 'sms' | 'wechat' | 'dingtalk' | 'feishu')[]
  subject: string
  content: string
}

export interface ApprovalNode extends AssigneeNode {
  // 多人审批方式
  multi: 'sequential' | 'joint' | 'single'
  // 审批人为空时处理方式：reject-拒绝，pass-通过，admin-管理员，assign-指定人员
  nobody: 'refuse' | 'pass' | 'admin' | 'assign'
  // 多人审批通过比例
  multiPercent: number
  // 审批人为空时,指定人员
  nobodyUsers: string[]
  // 表单字段
  formProperties: FormProperty[]
  // 操作权限
  operations: OperationPermissions
  // 任务监听器
  taskListeners?: NodeListener[]
}

export interface ServiceNode extends FlowNode {
  implementationType: string
  implementation: string
}

export interface TimerNode extends FlowNode {
  waitType: 'duration' | 'date'
  unit: 'PT%sS' | 'PT%sM' | 'PT%sH' | 'P%sD' | 'P%sW' | 'P%sM'
  duration: number
  timeDate?: string
}

export interface ConditionNode extends FlowNode {
  def: boolean
  conditions: FilterRules
}

export interface BranchNode extends FlowNode {
  branches: FlowNode[]
}

export interface ExclusiveNode extends BranchNode {
  branches: ConditionNode[]
}

export interface ErrorInfo {
  id: string
  name: string
  message: string
}

export interface FormProperty {
  // 字段ID
  id: string
  // 字段名称
  name: string
  // 只读
  readonly: boolean
  // 必填
  required: boolean
  // 隐藏
  hidden: boolean
}

export interface OperationPermissions {
  // 同意
  complete: boolean
  // 拒绝
  refuse: boolean
  // 回退
  back: boolean
  // 转交
  transfer: boolean
  // 委派
  delegate: boolean
  // 加签
  addMulti: boolean
  // 减签
  minusMulti: boolean
}
