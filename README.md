<div align="center">
  <h1>lowflow-design</h1>
  <p>A visual low-code workflow designer for Vue 3.</p>
  <p>
    <a href="./README.zh-CN.md">简体中文</a> | <strong>English</strong>
  </p>
  <p>
    <a href="https://tsai996.github.io/lowflow-design/">Live Demo</a> ·
    <a href="https://demo.lowflow.vip/">Full Demo</a>
  </p>
</div>

## Overview

`lowflow-design` is a Vue 3 workflow editor for building approval processes as structured JSON. It provides a visual flow tree, node property panels, form and operation permissions, validation, and a converter service for exporting BPMN XML.

This repository contains the frontend designer and demo data. BPMN conversion is provided by the separate [lowflow-design-converter](https://github.com/tsai996/lowflow-design-converter) backend.

## Features

- Start, approval, CC, exclusive gateway, condition, timer, notification, service, and end nodes.
- Assignees from users, roles, the initiator, self-selection, leaders, organization leaders, or form fields.
- Sequential approval, countersign, or-sign, configurable pass percentage, and empty-assignee handling.
- Per-node form permissions and approval actions such as approve, reject, return, transfer, delegate, add-sign, and remove-sign.
- Nested AND/OR condition groups, duration or fixed-date timers, and six notification channels.
- Task and execution listeners plus class, expression, and delegate-expression service tasks.
- Built-in node validation, 50%–170% zoom, read-only mode, dark mode, and draggable canvas scrolling.
- English and Simplified Chinese UI with browser-language detection and persisted selection.
- Workflow JSON to BPMN XML export through the converter service.

## Screenshots

<p>
  <img alt="Workflow designer" src="public/flow.png" width="49%" />
  <img alt="Node property panel" src="public/penal.png" width="49%" />
</p>

## Quick Start

```bash
git clone https://github.com/tsai996/lowflow-design.git
cd lowflow-design
pnpm install
pnpm dev
```

The development server runs at <http://localhost:3200/lowflow-design/> and opens automatically.

To create and preview a production build:

```bash
pnpm build
pnpm preview
```

## Using the Designer

```vue
<FlowDesign
  ref="designer"
  :process="process"
  :fields="fields"
  :read-only="false"
  :default-zoom="100"
/>
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `process` | `FlowNode` | Yes | — | Mutable workflow tree |
| `fields` | `Field[]` | Yes | — | Form fields available to conditions and node permissions |
| `readOnly` | `boolean` | No | `false` | Disables editing |
| `defaultZoom` | `number` | No | `100` | Initial zoom percentage |
| `bgColor` | `string` | No | Element Plus page background | Canvas background |

The component exposes `validate()`, which resolves with `true` or rejects with the current node errors. See [`src/views/home/index.vue`](src/views/home/index.vue) for a complete example and [`src/views/flowDesign/nodes/type.ts`](src/views/flowDesign/nodes/type.ts) for the workflow data model.

## Backend Integration

The demo uses local mock endpoints for users and roles. Replace the implementations in `src/api/modules/` with your own services when integrating the designer.

The **Convert to BPMN** action currently posts to the hosted demo endpoint. For self-hosting, deploy one of the converter projects and update `src/api/modules/model.ts`:

| Platform | Frontend | Backend Converter |
| --- | --- | --- |
| GitHub | [lowflow-design](https://github.com/tsai996/lowflow-design) | [lowflow-design-converter](https://github.com/tsai996/lowflow-design-converter) |
| Gitee | [lowflow-design](https://gitee.com/cai_xiao_feng/lowflow-design) | [lowflow-design-converter](https://gitee.com/cai_xiao_feng/lowflow-design-converter) |

For a traditional `bpmn-js` editor, see [vue-bpmn-designer](https://github.com/tsai996/vue-bpmn-designer).

## Tech Stack

- Vue 3, TypeScript, and Vite
- Element Plus and UnoCSS
- Pinia and Vue Router
- Vue I18n and Axios

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Type-check and build for production |
| `pnpm build:dev` | Build in development mode |
| `pnpm build:test` | Build in test mode |
| `pnpm preview` | Preview the production build |
| `pnpm type-check` | Run `vue-tsc` |
| `pnpm lint` | Run ESLint with automatic fixes |
| `pnpm format` | Format `src/` with Prettier |

## Project Structure

```text
src/
├── api/                 # HTTP client and backend modules
├── components/          # Form rendering, filters, and selectors
├── languages/           # English and Chinese translations
├── mock/                # Demo user and role APIs
├── stores/              # Pinia stores
└── views/
    ├── flowDesign/
    │   ├── nodes/       # Workflow nodes and data types
    │   ├── panels/      # Node configuration panels
    │   └── index.vue    # Designer component
    └── home/index.vue   # Integration demo
```

## Maintainer

This project was created and is solely maintained by [@tsai996](https://github.com/tsai996).

## Community and Support

<p>
  <img alt="WeChat group" src="public/wx.jpg" width="240" height="400" />
  <img alt="QQ group" src="public/qq_qun.jpg" width="240" height="400" />
</p>

If this project helps you, sponsorship is welcome.

<p>
  <img alt="WeChat Pay" src="public/wxpay.png" width="240" height="240" />
  <img alt="Alipay" src="public/alipay.png" width="240" height="240" />
</p>

## Recommended Reading

[*In-depth Flowable Workflow Engine: Core Principles and Advanced Practice*](https://item.jd.com/14804836.html)

<img alt="Flowable book" src="public/flowable.jpg" width="320" />

## License

[MIT](LICENSE) © Victor Tsai
