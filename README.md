<div align="center">
  <h1>lowflow-design</h1>
  <p>Low-code Workflow Designer</p>
  <p>
    <a href="./README.zh-CN.md">中文</a> | <a href="./README.md">English</a>
  </p>
</div>

## Overview
`lowflow-design` is a workflow designer built with `Vue 3`, `Vite`, `TypeScript`, and `Element Plus`. It is designed for low-code/no-code platforms that need visual workflow configuration.

You can create workflows visually and convert workflow JSON to BPMN XML with the backend converter project:
- Backend converter: [GitHub](https://github.com/tsai996/lowflow-design-converter) | [Gitee](https://gitee.com/cai_xiao_feng/lowflow-design-converter)
- Traditional `bpmn-js` workflow designer: [GitHub](https://github.com/tsai996/vue-bpmn-designer) | [Gitee](https://gitee.com/cai_xiao_feng/vue-bpmn-designer)

## Live Demo
- Preview: <https://tsai996.github.io/lowflow-design/>
- Full demo: <https://demo.lowflow.vip/>

## Screenshots
<p>
  <img alt="workflow designer" src="public/flow.png" style="display: inline-block"/>
  <img alt="property panel" src="public/penal.png" style="display: inline-block"/>
</p>

## Features
- Approval node: supports single user, multiple users, roles, departments, initiator, manager, and custom approvers.
- CC node: supports single user, multiple users, roles, departments, initiator, manager, and custom CC recipients.
- Conditional branches: supports condition groups and combination logic.
- Timer wait: supports second, minute, hour, day, week, month, and custom durations.
- Notification node: supports in-app, email, WeCom, DingTalk, Feishu, SMS, and more.

## Tech Stack
- Vue 3
- TypeScript
- Vite
- Element Plus
- Pinia
- Vue Router
- UnoCSS

## Quick Start
### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

## Scripts
```bash
npm run dev         # run dev server
npm run build       # production build (with type check)
npm run build:dev   # build in development mode
npm run build:test  # build in test mode
npm run preview     # preview production build
npm run type-check  # run type checking
npm run lint        # run ESLint (with --fix)
npm run format      # format src with Prettier
```

## Project Structure
```text
.
|-- public/
|-- src/
|   |-- api/
|   |-- assets/
|   |-- components/
|   |-- hooks/
|   |-- mock/
|   |-- router/
|   |-- stores/
|   |-- styles/
|   |-- typings/
|   |-- views/
|   |   |-- flowDesign/
|   |   |   |-- nodes/
|   |   |   |-- panels/
|   |   |   `-- index.vue
|   |-- App.vue
|   `-- main.ts
|-- package.json
|-- vite.config.ts
`-- README.md
```

## Repositories
| Platform | Frontend | Backend Converter |
| --- | --- | --- |
| GitHub | <https://github.com/tsai996/lowflow-design> | <https://github.com/tsai996/lowflow-design-converter> |
| Gitee | <https://gitee.com/cai_xiao_feng/lowflow-design> | <https://gitee.com/cai_xiao_feng/lowflow-design-converter> |

## Community and Support
### Community Groups
<p>
  <img alt="WeChat" src="public/wx.jpg" width="240" height="400" style="display: inline-block"/>
  <img alt="QQ Group" src="public/qq_qun.jpg" width="240" height="400" style="display: inline-block"/>
</p>

### Sponsor
If this project helps you, sponsorship is welcome.

<p>
  <img alt="WeChat Pay" src="public/wxpay.png" height="240" width="240" style="display: inline-block"/>
  <img alt="Alipay" src="public/alipay.png" height="240" width="240" style="display: inline-block"/>
</p>

## Recommended Reading
*In-depth Flowable Workflow Engine: Core Principles and Advanced Practice*:
<https://item.jd.com/14804836.html>

![flowable](public/flowable.jpg)
