import axios, {
    AxiosInstance,
    AxiosError,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    AxiosResponse
} from 'axios'
import {ElNotification} from "element-plus";

export interface Result {
    code: number;
    success: boolean;
    message: string;
}

export interface ResultData<T = any> extends Result {
    data: T;
}

export interface ResultPage<T = any> extends ResultData {
    data: {
        rows: T[];
        total: number;
    }
}


/**
 * axios配置
 */
const config = {
    // 请求地址
    baseURL: import.meta.env.VITE_API_URL as string,
    // 设置超时时间
    timeout: 8000,
}

class RequestHttp {
    service: AxiosInstance

    /**
     * 请求构造函数
     * @param config
     */
    public constructor(config: AxiosRequestConfig) {
        // 创建axios实例
        this.service = axios.create(config)
        // 请求拦截
        this.service.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                config.headers['Authorization'] = "Bearer 87779e5a-3342-4df6-865d-d8828800d6fb"
                return config
            },
            (error: AxiosError) => {
                // 请求错误处理
                return Promise.reject(error)
            }
        )
        // 响应拦截
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const {data} = response
                // 响应拦截处理
                return data
            },
            (error: AxiosError) => {
                const {response, message} = error
                const data = response?.data as ResultData
                const errMsg = data ? data.message : message
                // 响应错误处理
                ElNotification.error(errMsg || '未知错误')
                return Promise.reject(response?.data || error)
            }
        )
    }

    /**
     * get请求
     * @param url 请求地址
     * @param params 请求参数
     */
    get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.get(url, {params, ..._object})
    }

    /**
     * post请求
     * @param url 请求地址
     * @param data 请求参数
     */
    post<T>(url: string, data?: object): Promise<ResultData<T>> {
        return this.service.post(url, data)
    }

    /**
     * put请求
     * @param url 请求地址
     * @param data 请求参数
     */
    put<T>(url: string, data?: object): Promise<ResultData<T>> {
        return this.service.put(url, data)
    }

    /**
     * delete请求
     * @param url 请求地址
     * @param params 请求参数
     */
    delete<T>(url: string, params?: any): Promise<ResultData<T>> {
        return this.service.delete(url, params)
    }

    /**
     * patch请求
     * @param url 请求地址
     * @param data 请求参数
     */
    patch<T>(url: string, data?: object): Promise<ResultData<T>> {
        return this.service.patch(url, data)
    }

    /**
     * head请求
     * @param url 请求地址
     */
    head<T>(url: string): Promise<ResultData<T>> {
        return this.service.head(url)
    }

    /**
     * options请求
     * @param url 请求地址
     * @param _object 其他配置
     */
    options<T>(url: string): Promise<ResultData<T>> {
        return this.service.options(url)
    }

    /**
     * request请求
     * @param config 请求配置
     */
    request<T>(config: AxiosRequestConfig): Promise<ResultData<T>> {
        return this.service.request(config)
    }

    /**
     * 下载文件
     * @param url 请求地址
     * @param params 请求参数
     */
    download(url: string, params?: object): Promise<BlobPart> {
        return this.service.post(url, params, {responseType: 'blob'})
    }
}

export default new RequestHttp(config)
