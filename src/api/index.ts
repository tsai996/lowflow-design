import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import { ElNotification } from 'element-plus'

export interface Result {
  code: number
  success: boolean
  message: string
}

export interface ResultData<T = any> extends Result {
  data: T
}

/**
 * axios配置
 */
const config = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000
}

class RequestHttp {
  service: AxiosInstance

  /**
   * 请求构造函数
   * @param config
   */
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        return data
      },
      (error: AxiosError) => {
        const { response, message } = error
        const data = response?.data as ResultData
        const errMsg = data ? data.message : message
        ElNotification.error(errMsg || '未知错误')
        return Promise.reject(response?.data || error)
      }
    )
  }

  /**
   * get请求
   * @param url
   * @param params
   * @param config
   */
  get<T>(url: string, params?: object, config = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ...config })
  }

  /**
   * post请求
   * @param url
   * @param data
   * @param config
   */
  post<T>(url: string, data?: object, config = {}): Promise<ResultData<T>> {
    return this.service.post(url, data, config)
  }

  /**
   * request请求
   * @param config
   */
  request<T>(config: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.service.request(config)
  }

  /**
   * 下载文件
   * @param url
   * @param data
   * @param config
   */
  download(url: string, data?: object, config = {}): Promise<BlobPart> {
    return this.service.post(url, data, { ...config, responseType: 'blob' })
  }
}

export default new RequestHttp(config)
