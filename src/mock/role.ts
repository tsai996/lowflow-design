import type { MockMethod } from 'vite-plugin-mock'
import type { ResultData } from '@/api'

const roleList = [
  {
    id: '1',
    name: '项目经理'
  },
  {
    id: '2',
    name: '产品经理'
  },
  {
    id: '3',
    name: '高级开发工程师'
  },
  {
    id: '4',
    name: '中级开发工程师'
  },
  {
    id: '5',
    name: '项目总监'
  },
  {
    id: '6',
    name: '产品策划'
  },
  {
    id: '7',
    name: '客服'
  },
  {
    id: '8',
    name: '销售经理'
  }
]

const role = [
  {
    url: '/api/role/info',
    method: 'get',
    response: (req: any) => {
      const id = req.query.id
      return {
        code: 200,
        success: true,
        message: '操作成功',
        data: roleList.find((item) => item.id === id)
      } as ResultData
    }
  },
  {
    url: '/api/role/list',
    method: 'post',
    response: (req: any) => {
      const roleIds = req.body.roleIds
      return {
        code: 200,
        success: true,
        message: '操作成功',
        data: Array.isArray(roleIds)
          ? roleList.filter((item) => roleIds.includes(item.id))
          : roleList
      } as ResultData
    }
  }
] as MockMethod[]

export default role
