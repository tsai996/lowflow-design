<div align="center">
  <h1>lowflow-design</h1>
  <p>面向 Vue 3 的可视化低代码流程设计器。</p>
  <p>
    <strong>简体中文</strong> | <a href="./README.md">English</a>
  </p>
  <p>
    <a href="https://tsai996.github.io/lowflow-design/">在线预览</a> ·
    <a href="https://demo.lowflow.vip/">完整示例</a>
  </p>
</div>

## 项目简介

`lowflow-design` 是一个 Vue 3 流程编辑器，用于通过结构化 JSON 搭建审批流程。项目提供可视化流程树、节点属性面板、表单与操作权限、节点校验，以及将流程导出为 BPMN XML 的转换服务。

本仓库包含前端设计器和演示数据。BPMN 转换由独立后端项目 [lowflow-design-converter](https://github.com/tsai996/lowflow-design-converter) 提供。

## 功能特性

- 支持开始、审批、抄送、独占网关、条件、计时等待、消息通知、服务和结束节点。
- 审批对象支持用户、角色、发起人、发起人自选、主管、组织主管及表单字段。
- 支持依次审批、会签、或签、会签通过比例及审批人为空时的处理策略。
- 支持节点表单权限，以及同意、拒绝、退回、转交、委派、加签和减签等审批操作权限。
- 支持嵌套的 AND/OR 条件组、固定时长或指定时间计时器，以及六种消息通知渠道。
- 支持任务监听器、执行监听器，以及类、表达式和委托表达式服务任务。
- 内置节点校验、50%–170% 缩放、只读模式、暗黑模式和画布拖拽滚动。
- 支持简体中文和英文界面，可自动检测浏览器语言并持久化用户选择。
- 通过转换服务将流程 JSON 导出为 BPMN XML。

## 效果预览

<p>
  <img alt="流程设计器" src="public/flow.png" width="49%" />
  <img alt="节点属性面板" src="public/penal.png" width="49%" />
</p>

## 快速开始

```bash
git clone https://github.com/tsai996/lowflow-design.git
cd lowflow-design
pnpm install
pnpm dev
```

开发服务器会自动打开，访问地址为 <http://localhost:3200/lowflow-design/>。

构建并预览生产版本：

```bash
pnpm build
pnpm preview
```

## 使用设计器

```vue
<FlowDesign
  ref="designer"
  :process="process"
  :fields="fields"
  :read-only="false"
  :default-zoom="100"
/>
```

| 属性 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `process` | `FlowNode` | 是 | — | 可变的流程树 |
| `fields` | `Field[]` | 是 | — | 供条件和节点权限使用的表单字段 |
| `readOnly` | `boolean` | 否 | `false` | 禁止编辑流程 |
| `defaultZoom` | `number` | 否 | `100` | 初始缩放比例 |
| `bgColor` | `string` | 否 | Element Plus 页面背景色 | 画布背景色 |

组件暴露 `validate()` 方法：校验成功时返回 `true`，失败时拒绝并返回当前节点错误。完整示例见 [`src/views/home/index.vue`](src/views/home/index.vue)，流程数据结构见 [`src/views/flowDesign/nodes/type.ts`](src/views/flowDesign/nodes/type.ts)。

## 后端集成

演示项目使用本地 Mock 接口提供用户和角色数据。集成到业务系统时，请将 `src/api/modules/` 中的实现替换为实际服务。

**转 BPMN** 操作目前请求线上演示接口。如需私有化部署，请部署转换器项目并修改 `src/api/modules/model.ts`：

| 平台 | 前端 | 后端转换器 |
| --- | --- | --- |
| GitHub | [lowflow-design](https://github.com/tsai996/lowflow-design) | [lowflow-design-converter](https://github.com/tsai996/lowflow-design-converter) |
| Gitee | [lowflow-design](https://gitee.com/cai_xiao_feng/lowflow-design) | [lowflow-design-converter](https://gitee.com/cai_xiao_feng/lowflow-design-converter) |

如果需要传统的 `bpmn-js` 编辑器，可查看 [vue-bpmn-designer](https://github.com/tsai996/vue-bpmn-designer)。

## 技术栈

- Vue 3、TypeScript、Vite
- Element Plus、UnoCSS
- Pinia、Vue Router
- Vue I18n、Axios

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 类型检查并构建生产版本 |
| `pnpm build:dev` | 使用 development 模式构建 |
| `pnpm build:test` | 使用 test 模式构建 |
| `pnpm preview` | 预览生产构建产物 |
| `pnpm type-check` | 运行 `vue-tsc` 类型检查 |
| `pnpm lint` | 运行 ESLint 并自动修复 |
| `pnpm format` | 使用 Prettier 格式化 `src/` |

## 项目结构

```text
src/
├── api/                 # HTTP 客户端与后端接口
├── components/          # 表单渲染、条件筛选与选择器
├── languages/           # 中英文翻译
├── mock/                # 演示用户与角色接口
├── stores/              # Pinia 状态管理
└── views/
    ├── flowDesign/
    │   ├── nodes/       # 流程节点与数据类型
    │   ├── panels/      # 节点配置面板
    │   └── index.vue    # 设计器组件
    └── home/index.vue   # 集成示例
```

## 维护者

本项目由 [@tsai996](https://github.com/tsai996) 创建并独立维护。

## 交流与支持

<p>
  <img alt="微信群" src="public/wx.jpg" width="240" height="400" />
  <img alt="QQ 群" src="public/qq_qun.jpg" width="240" height="400" />
</p>

如果这个项目对你有帮助，欢迎赞助支持。

<p>
  <img alt="微信赞助" src="public/wxpay.png" width="240" height="240" />
  <img alt="支付宝赞助" src="public/alipay.png" width="240" height="240" />
</p>

## 推荐阅读

[《深入 Flowable 流程引擎：核心原理与高阶实战》](https://item.jd.com/14804836.html)

<img alt="Flowable 图书" src="public/flowable.jpg" width="320" />

## 开源许可

[MIT](LICENSE) © Victor Tsai
