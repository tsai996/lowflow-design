/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_OPEN: boolean;
  readonly VITE_PORT: number;
  readonly VITE_GLOB_APP_TITLE: string;
  readonly VITE_API_URL: string;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_USER_NODE_ENV: string;
}

// 解决import.meta.env类型提示，参考https://cn.vitejs.dev/guide/env-and-mode.html#env-files
interface ImportMeta {
  readonly env: ImportMetaEnv
}
