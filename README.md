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

Decap CMS允许你通过Web界面管理博客内容，无需在本地编辑文件并推送到GitHub。以下是完整的配置步骤：

#### 1. 修改配置文件

在你fork的仓库中，找到`public/admin/config.yml`文件，修改以下内容：

```yml
backend:
  name: github
  repo: your-username/your-repo-name # 修改为你的GitHub用户名和仓库名
  branch: main # 你的主分支名称（默认为main）
```

#### 2. 设置GitHub OAuth应用

为了让Decap CMS能够访问你的GitHub仓库，你需要创建一个GitHub OAuth应用：

1. 前往GitHub的[Developer Settings](https://github.com/settings/developers) > **OAuth Apps** > **New OAuth App**
2. 填写以下信息：
   - **Application name**: 你的博客名称（例如：My WhisperWind Blog）
   - **Homepage URL**: 你部署后的博客URL（例如：`https://your-username.github.io/your-repo-name`）
   - **Authorization callback URL**: **重要！**这必须是你部署后的域名加上`/callback`（例如：`https://your-username.github.io/your-repo-name/callback`）
3. 点击**Register application**
4. 创建后，你会得到**Client ID**。点击**Generate a new client secret**获取**Client Secret**

#### 3. 选择认证方式 - Netlify认证服务（推荐）

最简单的方法是使用Netlify提供的认证服务（你的网站仍然使用GitHub Pages托管）：

1. 注册[Netlify](https://app.netlify.com/)账号（免费）
2. 创建一个新站点，从你的GitHub仓库导入
3. 转到站点的**Settings** > **Identity** > 点击**Enable Identity**
4. 向下滚动到**Registration**，设置为**Invite only**
5. 转到**Services** > **Git Gateway** > 点击**Enable Git Gateway**
6. 在**Settings** > **Identity** > **External providers**下：
   - 点击**Add provider**，选择**GitHub**
   - 输入前面步骤中获取的**Client ID**和**Client Secret**
   - 点击**Install provider**

完成上述步骤后，Netlify将为你提供GitHub认证服务，而不影响你的GitHub Pages托管。

#### 4. 访问CMS管理界面

部署你的网站后，访问`https://your-username.github.io/your-repo-name/admin/`即可登录CMS管理界面。登录后，你可以创建、编辑和发布博客文章和页面内容。

### 自定义

- **内容**：通过CMS或直接编辑`src/content`目录中的文件
- **样式**：修改`tailwind.config.ts`和`src/styles/globals.css`
- **组件**：自定义`src/components`目录中的组件
- **配置**：更新`src/content/config.json`中的网站信息

## 📝 使用CMS发布内容

通过Decap CMS，你可以轻松地管理你的博客内容：

1. 访问你的网站`/admin/`路径（例如：`https://your-username.github.io/your-repo-name/admin/`）
2. 使用GitHub账号登录
3. 使用友好的界面创建和编辑内容：
   - **博客文章**：撰写新文章，设置标签和特色图片
   - **页面**：编辑"关于"等静态页面
   - **友链**：管理友情链接
   - **网站配置**：更新网站基本信息

当你保存更改时，CMS会自动创建一个提交，并推送到你的GitHub仓库。GitHub Actions会自动构建和部署更新后的网站。

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