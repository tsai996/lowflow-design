import user from './user'
import role from './role'
import type { MockMethod } from 'vite-plugin-mock'

const mockModules: MockMethod[] = [...user, ...role]
export default mockModules
