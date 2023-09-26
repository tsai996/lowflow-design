import { FlowNode } from '../Node/index'
export interface CcNode extends FlowNode {
    users: string[]
}