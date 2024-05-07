import http from '@/api/index'

export interface Role {
  id: string
  name: string
}

/**
 * 获取角色信息
 * @param id
 */
export const getById = (id: string) => {
  return http.get<Role>(`/role/info`, { id: id })
}

/**
 * 查询角色列表
 */
export const getList = (roleIds?: string[]) => {
  const params = roleIds ? { roleIds: roleIds } : {}
  return http.post<Role[]>('/role/list', params)
}
