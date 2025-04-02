# WhisperWind Blog

🌬️ 一个具有吉卜力风格的开源博客模板，基于Next.js 15、TypeScript、Tailwind CSS和shadcn/ui构建，集成Decap CMS实现内容管理。

## ✨ 特性

- 🎨 **吉卜力风格设计**：柔和、自然的色彩系统，带来温暖、宁静的视觉体验
- 📱 **响应式设计**：在任何设备上都有完美的显示效果
- ✍️ **内容管理系统**：集成Decap CMS，通过Web界面轻松管理内容，无需本地Git命令
- 🚀 **一键部署**：通过GitHub Actions自动部署到GitHub Pages
- 🔍 **SEO优化**：搜索引擎优化，让你的博客更容易被发现
- 📊 **标签系统**：按标签分类文章，方便导航
- 📝 **Markdown支持**：使用Markdown编写文章，轻松排版

## 🖼️ 预览

访问[在线演示](https://wowyuarm.github.io/WhisperWind-blog/)查看实际效果。

## 🛠️ 技术栈

- **框架**：[Next.js 15](https://nextjs.org/)
- **语言**：[TypeScript](https://www.typescriptlang.org/)
- **样式**：[Tailwind CSS](https://tailwindcss.com/)
- **UI组件**：[shadcn/ui](https://ui.shadcn.com/)
- **CMS**：[Decap CMS](https://decapcms.org/)（原Netlify CMS）
- **部署**：[GitHub Pages](https://pages.github.com/)
- **CI/CD**：[GitHub Actions](https://github.com/features/actions)

## 🚀 快速开始

### 使用模板

1. 点击仓库右上角的**Use this template**按钮，创建你自己的仓库
2. 克隆你的仓库到本地
3. 安装依赖：`npm install`
4. 启动开发服务器：`npm run dev`
5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 配置Decap CMS

1. 在`public/admin/config.yml`中修改`backend.repo`为你的GitHub用户名和仓库名：

```yml
backend:
  name: github
  repo: your-username/your-repo-name
  branch: main
```

2. 设置GitHub OAuth应用，用于CMS认证：
   - 在GitHub中创建一个新的OAuth应用：[https://github.com/settings/developers](https://github.com/settings/developers)
   - 将Authorization callback URL设置为`https://api.netlify.com/auth/done`
   - 获取Client ID和Client Secret
   - 使用Netlify提供的认证服务或自行设置认证服务器

3. 部署你的站点后，访问`/admin/`路径登录CMS

### 自定义

- **内容**：通过CMS或直接编辑`src/content`目录中的文件
- **样式**：修改`tailwind.config.ts`和`src/app/globals.css`
- **组件**：自定义`src/components`目录中的组件
- **配置**：更新`src/content/config.json`中的网站信息

## 📝 使用CMS发布内容

1. 访问你的网站`/admin/`路径
2. 使用GitHub账号登录
3. 使用友好的界面创建和编辑内容：
   - **博客文章**：撰写新文章，设置标签和特色图片
   - **页面**：编辑"关于"等静态页面
   - **友链**：管理友情链接
   - **网站配置**：更新网站基本信息

## 🏗️ 项目结构

```
whisperwind-blog/
├── .github/                 # GitHub Actions配置
├── public/                  # 静态资源
│   ├── admin/              # Decap CMS配置
│   ├── uploads/            # 上传的媒体文件
│   └── images/             # 图片资源
├── src/
│   ├── app/                # Next.js页面
│   ├── components/         # React组件
│   ├── content/            # 博客内容
│   │   ├── posts/         # 博客文章Markdown文件
│   │   ├── pages/         # 静态页面Markdown文件
│   │   ├── config.json    # 网站配置
│   │   └── links.json     # 友情链接配置
│   ├── lib/                # 工具函数
│   └── types/              # TypeScript类型
├── tailwind.config.ts      # Tailwind CSS配置
└── next.config.ts          # Next.js配置
```

## 🧩 主要功能

- **首页**：展示最新文章和网站介绍
- **文章详情页**：显示完整文章内容，支持Markdown渲染
- **归档页**：按日期列出所有文章
- **标签页**：按标签分类文章
- **关于页**：关于网站的静态页面
- **友链页**：友情链接展示

## 🤝 贡献

欢迎贡献代码、报告问题或提出改进建议！请查看[贡献指南](CONTRIBUTING.md)。

## 📃 许可证

本项目采用[MIT许可证](LICENSE)。

## 📧 联系

如有任何问题，请通过[GitHub Issues](https://github.com/wowyuarm/WhisperWind-blog/issues)联系我们。

---

🌟 如果你喜欢这个项目，请给它一个Star！