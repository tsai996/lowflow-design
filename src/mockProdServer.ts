import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import mock from './mock'

export function setupProdMockServer() {
  createProdMockServer(mock)
}
