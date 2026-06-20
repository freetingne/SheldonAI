# SheldonAI

SheldonAI 是一个面向经营、增长和内容团队的 AI 工作台前端项目。当前版本先完成官网、登录入口和应用工作台 UI 框架，后续可以逐步接入真实 AI 对话、智能体编排、数据洞察、内容创作和自动化能力。

## 当前进度

- 官网首页：暗色科技风首页、产品矩阵、产品详情切换、FAQ、底部 CTA 和页脚。
- 登录入口：默认演示账号登录，进入工作台后可访问已完成的应用界面。
- 应用工作台：侧边栏导航、退出登录、无限画板、AI 对话、AI 智能体、AI 创作页面。
- 协议页面：用户协议、隐私政策、付费协议的路由和占位内容。
- 响应式 UI：适配桌面端和移动端基础布局。

## 已完成页面

### 官网

- `/`：SheldonAI 官网首页
- `#/protocol/agreement`：用户协议
- `#/protocol/privacy`：隐私政策
- `#/protocol/payment-agreement`：付费服务协议

### 登录与工作台

- `/login/#/`：登录页
- `/app/layout/#/board`：无限画板
- `/app/layout/#/chat`：AI 对话
- `/app/layout/#/agents`：AI 智能体
- `/app/layout/#/creation`：AI 创作

默认演示账号：

```text
账号：admin
密码：123456
```

## 技术栈

- Vite
- React
- TypeScript
- Lucide React
- CSS Modules 风格的全局样式组织

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认访问地址：

```text
http://127.0.0.1:5173/
```

构建生产版本：

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

## 项目结构

```text
Sheldonwangzhan/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── styles.css
    └── vite-env.d.ts
```

## 后续规划

- 接入真实 AI 对话模型和上下文管理。
- 增加智能体任务流配置、执行状态和结果归档。
- 接入数据文件上传、图表分析和 BI 看板能力。
- 完善 AI 创作的素材库、生成历史和多格式导出。
- 增加真实账号系统、权限管理和后台接口。
- 补充正式法务协议、隐私政策和付费协议内容。

## 说明

当前项目是 SheldonAI 第一阶段官网与应用 UI 框架，不包含真实支付、数据库、后台管理或 AI API 调用。所有工作台中的内容均为前端演示数据，便于后续按模块逐步接入真实能力。
