import { FlowNode } from '../Node/index'
export interface ConditionNode extends FlowNode {
    def: boolean
    conditions: FilterRules
}


/**
 * 筛选规则
 */
export interface FilterRules {
    logicalOperator: 'or' | 'and',
    conditions: Condition[]
    groups: FilterRules[]
}

/**
 * 字段筛选结果
 */
export interface Condition {
    // 筛选字段
    field: string | null,
    // 条件运算符
    operator: string,
    // 筛选值
    value: any | null
}
