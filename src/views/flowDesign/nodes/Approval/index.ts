import {FlowNode} from '../Node/index'

export interface ApprovalNode extends FlowNode {
    // 审批方式
    assigneeType: 'user' | 'role' | 'chooser' | 'self' | 'leader' | 'formUser'
    // 审批人
    users: string[]
    // 审批角色
    roles: string[]
    // 主管
    leader: number
    // 自选：true-多选，false-单选
    chooser: boolean
    // 发起人自己
    self: boolean
    // 多人审批方式
    method: "sequential" | "multi" | "anyone"
    // 审批人为空时处理方式：reject-驳回，admin-管理员，pass-通过
    nobody: 'reject' | 'pass'
}
