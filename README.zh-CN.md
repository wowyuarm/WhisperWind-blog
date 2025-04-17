# WhisperWind Blog

🌬️ 开源博客模板，灵感来自于吉卜力风格，内容方便管理，独特的风格设计与交互体验

[English](README.md) | 简体中文

## ✨ 特性

- 🎨 **吉卜力风格设计**：柔和、自然的色彩系统，带来温暖、宁静的视觉体验
- ✍️ **内容管理系统**：集成Decap CMS，通过Web界面轻松管理内容，无需本地Git命令
- 🚀 **一键部署**：优化为在Netlify上轻松部署
- 📊 **创新标签系统**：动态圆形标签云，大小反映文章数量
- 📝 **Markdown支持**：使用Markdown编写文章，轻松排版
- 🌩️ **云朵元素**：整个博客中都融入了精美的云朵动画元素，增强吉卜力风格体验
- 🔍 **SEO优化**：搜索引擎优化，让你的博客更容易被发现

## 🖼️ 预览

访问[在线演示](https://your-netlify-site-name.netlify.app/) (请替换为你的Netlify URL)查看实际效果。

## 🚀 快速开始

1. 点击"Use this template"创建自己的仓库。
2. 注册[Netlify](https://app.netlify.com/)账号（免费）。
3. 在Netlify上点击"New site from Git"，选择你的GitHub仓库。
4. 配置Netlify Identity和Git Gateway（见下文）。
5. 更新`public/admin/index.html`中**唯一必需的配置**：你的Netlify站点URL（见下文）。
6. Netlify将自动构建和部署你的站点。
7. 通过你的Netlify URL访问博客，并通过页面底部的"管理"链接或直接访问`/admin/`来登录CMS。

### 配置Decap CMS与Netlify Identity

Decap CMS允许你通过Web界面管理博客内容。Netlify Identity提供必要的身份验证，而Git Gateway则允许CMS直接向你的仓库提交更改。

#### 1. 设置Netlify站点和身份验证

1. 在Netlify上创建站点后（步骤3），进入站点设置：
   - 转到**Site configuration** > **Identity** > 点击**Enable Identity**。
   - 向下滚动到**Registration**，设置为**Invite only**（推荐）或选择开放注册。
   - 转到**Services** > **Git Gateway** > 点击**Enable Git Gateway**。

#### 2. 更新必需的配置

在你的仓库中，你**必须**修改`public/admin/index.html`文件中的**一处地方**：

```javascript
// **********************************************************
// ** 用户配置区域 (开始) **
// **********************************************************

// !! 重要 !!
// 请将下面的 "YOUR_NETLIFY_SITE.netlify.app" 替换为您在 Netlify 上部署此站点的实际域名。
// 例如：const NETLIFY_SITE = "my-awesome-blog.netlify.app";
const NETLIFY_SITE = "YOUR_NETLIFY_SITE.netlify.app"; 

// **********************************************************
// ** 用户配置区域 (结束) **
// **********************************************************
```

**这是让CMS正常运行所需的唯一强制性配置！**

> 💡 **媒体文件存储**: 此模板配置为将媒体文件（如图片）直接存储在您的Git仓库的`public/uploads`目录下。这简化了初始设置，因为不需要外部媒体库。请留意您的Git提供商对仓库大小的限制。

> 💡 **进一步定制 (可选)**: 如果您需要更改主要的Git分支（默认为`main`）、内容文件夹路径（如`src/content/posts`等）或CMS的内容字段，您可以编辑`public/admin/index.html`文件中的`config`对象。请查找指示这些可选配置点的注释。

#### 3. 创建管理员账号

设置好Identity服务后：

1. 在Netlify后台，转到**Identity** > **Invite users**。
2. 输入你的邮箱地址并发送邀请。
3. 检查你的邮箱，点击接受链接（应跳转到你的Netlify站点的管理页面或登录提示），并设置密码。

#### 4. 访问CMS管理界面

1. 访问你的Netlify站点URL：`https://your-netlify-site-name.netlify.app/`
2. 点击页面底部的"管理"链接（或直接访问`/admin/`）。
3. 点击"Login with Netlify Identity"按钮。
4. 使用你的Netlify邮箱和密码登录。
5. 管理你的内容。

### 自定义

- **内容**：通过CMS（访问`/admin/`）或直接编辑`src/content`目录中的文件。
- **样式**：修改`tailwind.config.ts`和`src/styles/globals.css`。
- **组件**：自定义`src/components`目录中的组件。
- **网站配置**：在CMS的"网站配置">"基本配置"中更新网站标题、描述、作者、社交链接等，这将编辑`src/content/config.json`文件。
- **CMS配置**：直接在`public/admin/index.html`的`config`对象中修改内容类型、字段或后端设置。

## 📝 使用CMS发布内容

- 通过你的Netlify站点页脚的"管理"链接或直接访问`/admin/`来进入CMS。
- 使用Netlify Identity登录。
- 创建/编辑文章、页面、友链和网站配置。**媒体文件将直接上传到您的Git仓库。**
- 在CMS中保存的更改将触发Netlify上的新构建和部署。

## 🧩 主要功能

- **首页**：展示最新文章和网站介绍
- **文章详情页**：显示完整文章内容，支持Markdown渲染
- **归档页**：按日期列出所有文章
- **标签页**：以圆形云布局展示所有标签，点击可查看相关文章
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

## 致谢

部分UI设计及风格样式来自开源项目[Ghibli Style Shadcn/ui](https://github.com/cefeng06/Ghibli-Shadcn-Theme)