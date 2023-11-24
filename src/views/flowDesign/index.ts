/**
 * 操作权限
 */
export interface OperationPermissions {
    // 同意
    complete: boolean
    // 拒绝
    refuse: boolean
    // 保存
    save: boolean
    // 转办
    transfer: boolean
    // 加签
    addMulti: boolean
    // 减签
    minusMulti: boolean
}

/**
 * 表单字段权限
 */
export interface FormProperty {
    // 字段ID
    id: string
    // 字段名称
    name: string
    // 可读
    readable: boolean
    // 可写
    writeable: boolean
    // 必填
    required: boolean
    // 隐藏
    hidden: boolean
}