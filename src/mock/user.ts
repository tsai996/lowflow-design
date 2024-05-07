import type { MockMethod } from 'vite-plugin-mock'
import type { ResultData } from '@/api'

const userList = [
  {
    id: 1,
    name: '张三',
    username: 'admin',
    avatar: 'https://avatars.githubusercontent.com/u/44080404?v=4'
  },
  {
    id: 2,
    name: '李四',
    username: 'lisi',
    avatar: 'https://avatars.githubusercontent.com/u/44080404?v=4'
  },
  {
    id: 3,
    name: '王五',
    username: 'wangwu',
    avatar: 'https://avatars.githubusercontent.com/u/44080404?v=4'
  },
  {
    id: 4,
    name: '赵六',
    username: 'zhaoliu',
    avatar: 'https://avatars.githubusercontent.com/u/44080404?v=4'
  },
  {
    id: 5,
    name: '孙七',
    username: 'sunqi',
    avatar: 'https://avatars.githubusercontent.com/u/44080404?v=4'
  },
  {
    id: 6,
    name: '周八',
    username: 'zhouba',
    avatar: 'https://avatars.githubusercontent.com/u/44080404?v=4'
  },
  {
    id: 7,
    name: '吴九',
    username: 'wujui',
    avatar: 'https://avatars.githubusercontent.com/u/44080404?v=4'
  },
  {
    id: 8,
    name: '郑十',
    username: 'zhengshi',
    avatar: 'https://avatars.githubusercontent.com/u/44080404?v=4'
  }
]

const user = [
  {
    url: '/api/user/info',
    method: 'get',
    response: (req: any) => {
      const username = req.query.username
      return {
        code: 200,
        success: true,
        message: '操作成功',
        data: userList.find((item) => item.username === username)
      } as ResultData
    }
  },
  {
    url: '/api/user/list',
    method: 'post',
    response: (req: any) => {
      const userIds = req.body.userIds
      return {
        code: 200,
        success: true,
        message: '操作成功',
        data: Array.isArray(userIds)
          ? userList.filter((item) => userIds.includes(item.username))
          : userList
      } as ResultData
    }
  }
] as MockMethod[]

export default user
