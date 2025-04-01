# WhisperWind Blog

正在开发中......

WhisperWind Blog是一个现代化的博客平台，使用Next.js构建，提供了丰富的Markdown支持和优雅的UI设计。

## 项目概述

WhisperWind Blog旨在提供一个简洁、高效的博客发布平台，支持Markdown格式的内容创作，并提供良好的阅读体验。

### 主要功能

- Markdown内容渲染
- 代码语法高亮
- 响应式设计
- 暗黑模式支持
- 自动链接标题
- GitHub风格的Markdown支持

## 技术栈

- **框架**: Next.js 15
- **语言**: TypeScript
- **UI库**: 
  - Tailwind CSS
  - Radix UI
- **内容处理**:
  - gray-matter
  - react-markdown
  - rehype/remark 插件系列
- **开发工具**:
  - ESLint
  - TypeScript

## 快速开始

首先，克隆仓库并安装依赖：

```bash
git clone [repository-url]
cd whisperwind-blog
npm install
```

然后，运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
whisperwind-blog/
├── src/
│   ├── app/         # Next.js应用路由和页面
│   ├── components/  # React组件
│   ├── content/     # 博客内容文件
│   ├── lib/         # 工具函数和配置
│   └── types/       # TypeScript类型定义
├── public/          # 静态资源
└── ...配置文件
```

## 内容管理

博客内容存储在`src/content`目录中，使用Markdown格式。每篇文章需要包含Front Matter元数据部分，例如：

```markdown
---
title: 示例文章
date: 2023-04-01
description: 这是一篇示例文章
tags: [example, blog]
---

# 内容标题

文章内容...
```

## 开发指南

### 新增组件

在`src/components`目录中创建新组件，遵循现有的命名和结构约定。

### 样式调整

本项目使用Tailwind CSS进行样式管理，配置文件位于`tailwind.config.ts`。

### 内容创作

1. 在`src/content`目录中创建新的`.md`文件
2. 添加必要的Front Matter元数据
3. 编写Markdown内容

## 部署

推荐使用Vercel平台部署，只需连接GitHub仓库并配置部署设置即可。

```bash
npm run build
npm run start
```

## 贡献指南

欢迎提交Pull Request或Issues来改进这个项目！

## 许可证

[许可证信息]
