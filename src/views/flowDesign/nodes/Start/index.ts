import { FlowNode } from '../Node/index'
import {FormProperty} from "~/views/flowDesign/index";
export interface StartNode extends FlowNode {
    // 表单字段
    formProperties: FormProperty[]
}
