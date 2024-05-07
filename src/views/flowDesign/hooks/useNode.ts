import {ErrorInfo, FlowNode} from '../nodes/Node/index'
import {ExclusiveNode} from '../nodes/Exclusive/index'
import {BranchNode} from '../nodes/Branch/index'
import {ConditionNode, FilterRules} from '../nodes/Condition/index'
import {ApprovalNode} from '../nodes/Approval/index'
import {CcNode} from '../nodes/Cc/index'
import {ref, Ref} from "vue";
import {FormProperty} from "~/views/flowDesign/index";
import {Field} from "~/components/Render/interface";

const useNode = (node: Ref<FlowNode>, fields: Ref<Field[]>) => {
    /**
     * 节点错误信息
     */
    const nodeErrors = ref(new Map<string, string>())
    /**
     * 每个节点的ref
     */
    const nodeRefs = ref(new Map<string, any>())
    /**
     * 校验所有节点
     */
    const validateNodes = () => {
        nodeErrors.value.clear()
        nodeRefs.value.forEach((ref, id) => {
            const validate = ref?.validate
            if (validate) {
                const error: ErrorInfo | undefined = validate()
                if (error && error.showError) {
                    nodeErrors.value.set(id, error.message)
                }
            }
        })
        return nodeErrors
    }
    /**
     * 添加节点ref
     * @param id
     * @param ref
     */
    const addNodeRef = (id: string, ref: any) => {
        nodeRefs.value.set(id, ref)
    }
    /**
     * 生成唯一节点id
     */
    const generateId = (): string => {
        let id = `node-${Math.random().toString(36).substring(2, 7)}`
        const findId = (node: FlowNode, id: string): boolean => {
            if (node.id === id) {
                return true
            }
            if (node.child) {
                return findId(node.child, id)
            }
            if ('children' in node) {
                const branchNode = node as BranchNode
                if (branchNode.children && branchNode.children.length > 0) {
                    return branchNode.children.some(item => {
                        return findId(item, id)
                    })
                }
            }
            return false
        }
        if (findId(node.value, id)) {
            return generateId()
        }
        return id
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
            conditions: {
                operator: 'and',
                conditions: [],
                groups: []
            } as FilterRules,
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
            formUser: '',
            formRole: '',
            users: [],
            roles: [],
            leader: 1,
            choice: false,
            self: false,
            multi: 'sequential',
            nobody: 'pass',
            formProperties: fields.value.map(item => {
                return {
                    id: item.id,
                    name: item.title,
                    readable: true,
                    writeable: false,
                    hidden: false,
                    required: false
                } as FormProperty
            }),
            operations: {
                complete: true,
                refuse: true,
                save: true,
                transfer: false,
                addMulti: false,
                minusMulti: false
            }
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
            users: [],
            formProperties: fields.value.map(item => {
                return {
                    id: item.id,
                    name: item.title,
                    readable: true,
                    writeable: false,
                    hidden: false,
                    required: false
                } as FormProperty
            })
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
        delNodeNext(node.value, del)
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
        delNode,
        addNodeRef,
        validateNodes,
        nodeErrors
    }
}

export default useNode
