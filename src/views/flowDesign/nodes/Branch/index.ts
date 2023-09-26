import {FlowNode} from '../Node/index'

export interface BranchNode extends FlowNode{
    children: FlowNode[];
}
