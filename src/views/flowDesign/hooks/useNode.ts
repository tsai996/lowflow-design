import {FlowNode} from '../nodes/Node/index'
import {ExclusiveNode} from '../nodes/Exclusive/index'
import {BranchNode} from '../nodes/Branch/index'
import {ConditionNode} from '../nodes/Condition/index'
import {ApprovalNode} from '../nodes/Approval/index'
import {CcNode} from '../nodes/Cc/index'

const useNode = (node: FlowNode) => {
    /**
     * 生成节点id
     */
    const generateId = (): string => {
        return `node-${Math.random().toString(36).substr(5)}`
    }
    /**
     * 添加条件
     * @param currentNode
     */
    const addConnection = (currentNode: FlowNode) => {
        const exclusive = currentNode as ExclusiveNode
        exclusive.children.unshift({
            id: generateId(),
            pid: currentNode.id,
            type: 'condition',
            def: false,
            name: `条件${exclusive.children.length + 1}`,
            child: null
        } as ConditionNode)
    }
    /**
     * 添加审批
     * @param currentNode
     */
    const addApproval = (currentNode: FlowNode) => {
        const child = currentNode.child
        const id = generateId()
        currentNode.child = {
            id: id,
            pid: currentNode.id,
            type: 'approval',
            name: '审批人',
            child: child,
            // 属性
            assigneeType: 'user',
            users: [],
            roles: [],
            leader: 1,
            self: false,
            nobody: 'reject'
        } as ApprovalNode
        if (child) {
            child.pid = id
        }
    }
    /**
     * 添加抄送
     * @param currentNode
     */
    const addCc = (currentNode: FlowNode) => {
        const child = currentNode.child
        const id = generateId()
        currentNode.child = {
            id: id,
            pid: currentNode.id,
            type: 'cc',
            name: '抄送人',
            child: child,
            users: []
        } as CcNode
        if (child) {
            child.pid = id
        }
    }
    /**
     * 添加网关
     * @param currentNode
     */
    const addExclusive = (currentNode: FlowNode) => {
        const child = currentNode.child
        const id = generateId()
        const exclusiveNode = {
            id: id,
            pid: currentNode.id,
            type: 'exclusive',
            name: '独占网关',
            child: child,
            children: []
        } as ExclusiveNode
        currentNode.child = exclusiveNode
        if (child) {
            child.pid = id
        }
        addConnection(currentNode.child)
        addConnection(currentNode.child)
        if (exclusiveNode.children.length > 0) {
            const condition = exclusiveNode.children[exclusiveNode.children.length - 1] as ConditionNode
            condition.def = true
            condition.name = '默认条件'
        }
    }

    const addNodes: Record<string, (currentNode: FlowNode) => void> = {
        condition: addConnection,
        approval: addApproval,
        cc: addCc,
        exclusive: addExclusive
    }

    const addNode = (type: string, currentNode: FlowNode) => {
        const fun = addNodes[type]
        if (fun) {
            fun(currentNode)
        }
    }

    const delNode = (del: FlowNode) => {
        delNodeNext(node, del)
    }
    const delNodeNext = (next: FlowNode, del: FlowNode) => {
        if (next.id === del.pid) {
            if ('children' in next && next.child?.id !== del.id) {
                const branchNode = next as BranchNode
                const index = branchNode.children.findIndex(item => item.id === del.id)
                if (index !== -1) {
                    if (branchNode.children.length <= 2) {
                        delNode(branchNode)
                    } else {
                        branchNode.children.splice(index, 1)
                    }
                }
            } else {
                if (del.child && del.child.pid) {
                    del.child.pid = next.id
                }
                next.child = del.child
            }
        } else {
            if (next.child) {
                delNodeNext(next.child, del)
            }
            if ('children' in next) {
                const nextBranch = next as BranchNode
                if (nextBranch.children && nextBranch.children.length > 0) {
                    nextBranch.children.forEach(item => {
                        delNodeNext(item, del)
                    })
                }
            }

        }
    }

    return {
        addNode,
        delNode
    }
}

export default useNode
