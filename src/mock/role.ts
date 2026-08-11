import type { MockMethod } from 'vite-plugin-mock'
import type { ResultData } from '@/api'

const roleList = [
  {
    id: '1',
    name: 'Operations Lead'
  },
  {
    id: '2',
    name: 'Product Strategist'
  },
  {
    id: '3',
    name: 'Solutions Architect'
  },
  {
    id: '4',
    name: 'Quality Analyst'
  },
  {
    id: '5',
    name: 'Program Director'
  },
  {
    id: '6',
    name: 'Growth Specialist'
  },
  {
    id: '7',
    name: 'Customer Advocate'
  },
  {
    id: '8',
    name: 'Account Executive'
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
