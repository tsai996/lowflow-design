import http from '~/api/index'

export interface User {
    id: string,
    username: string,
    name: string,
    avatar: string
}

/**
 * 获取用户信息
 * @param username
 */
export const getByUsername = (username: string) => {
    return http.get<User>(`/user/info/${username}`)
}

/**
 * 查询用户列表
 */
export const getList = () => {
    return http.get<User[]>('/user/list')
}
