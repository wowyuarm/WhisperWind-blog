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

### 完整流程：

1. 点击"Use this template"创建自己的仓库
2. 在Netlify上创建站点并设置Identity/Git Gateway
3. 更新两处配置文件，替换为自己的Netlify站点URL（这是关键步骤）
4. 通过GitHub Actions部署到GitHub Pages
5. 访问博客，点击"管理"链接，使用Netlify Identity登录CMS

### 配置Decap CMS

Decap CMS允许你通过Web界面管理博客内容，无需在本地编辑文件并推送到GitHub。以下是完整的配置步骤：

#### 1. 设置Netlify站点和身份验证

虽然博客内容会部署在GitHub Pages上，但我们需要使用Netlify提供的身份验证服务来管理内容：

1. 注册[Netlify](https://app.netlify.com/)账号（免费）
2. 点击"New site from Git"，选择你的GitHub仓库
3. 部署设置保持默认值，点击"Deploy site"（这只是为了身份验证，实际博客仍会通过GitHub Pages提供）
4. 部署完成后，记下你的Netlify站点名称（例如：your-site-123456.netlify.app）
5. 进入站点设置：
   - 转到**Site configuration** > **Identity** > 点击**Enable Identity**
   - 向下滚动到**Registration**，设置为**Invite only**（推荐）或选择开放注册
   - 转到**Services** > **Git Gateway** > 点击**Enable Git Gateway**

#### 2. 修改配置文件指向你的Netlify站点

在你fork的仓库中，需要修改以下文件：

1. 在`public/admin/config.yml`文件中，找到并修改：

```yml
backend:
  name: git-gateway
  branch: main
  site_domain: your-netlify-site-name.netlify.app  # 修改为你的Netlify站点URL（不需要https://前缀）
```

2. 在`public/admin/index.html`文件中，找到以下代码并修改：

```javascript
window.netlifyIdentity.init({
  APIUrl: "https://your-netlify-site-name.netlify.app/.netlify/identity"  # 修改为你的Netlify站点URL（需要https://前缀）
});
```

#### 3. 创建管理员账号

设置好Identity服务后，你需要创建一个管理员账号：

1. 在Netlify后台，转到**Identity** > **Invite users**
2. 输入你的邮箱地址并发送邀请
3. 检查你的邮箱，接受邀请并设置密码

#### 4. 访问CMS管理界面

完成上述步骤并部署你的GitHub Pages网站后：

1. 访问你的GitHub Pages站点：`https://your-username.github.io/your-repo-name/`
2. 点击页面底部的"管理"链接
3. 点击"Login with Netlify Identity"按钮
4. 使用你在Netlify中设置的邮箱和密码登录
5. 登录成功后，你可以通过友好的界面创建和管理内容了

### 自定义

- **内容**：通过CMS或直接编辑`src/content`目录中的文件
- **样式**：修改`tailwind.config.ts`和`src/styles/globals.css`
- **组件**：自定义`src/components`目录中的组件
- **配置**：更新`src/content/config.json`中的网站信息

## 📝 使用CMS发布内容

通过Decap CMS，你可以轻松地管理你的博客内容：

1. 访问你的网站`/admin/`路径（例如：`https://your-username.github.io/your-repo-name/admin/`）
2. 使用Netlify Identity账号登录
3. 使用友好的界面创建和编辑内容：
   - **博客文章**：撰写新文章，设置标签和特色图片
   - **页面**：编辑"关于"等静态页面
   - **友链**：管理友情链接
   - **网站配置**：更新网站基本信息

当你保存更改时，CMS会通过Git Gateway创建一个提交，并推送到你的GitHub仓库。GitHub Actions会自动构建和部署更新后的网站。

## 🏗️ 项目结构

```
whisperwind-blog/
├── .github/                 # GitHub Actions配置
├── public/                  # 静态资源
│   ├── admin/              # Decap CMS配置
│   │   ├── index.html      # CMS入口页面
│   │   └── config.yml      # CMS配置文件
│   ├── uploads/            # 上传的媒体文件
│   └── images/             # 图片资源
├── src/
│   ├── pages/              # Next.js页面
│   ├── components/         # React组件
│   ├── content/            # 博客内容
│   │   ├── posts/         # 博客文章Markdown文件
│   │   ├── pages/         # 静态页面Markdown文件
│   │   ├── config.json    # 网站配置
│   │   └── links.json     # 友情链接配置
│   ├── lib/                # 工具函数
│   ├── styles/             # 全局样式
│   └── types/              # TypeScript类型定义
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