# WhisperWind Blog

🌬️ 开源博客模板，灵感来自于吉卜力风格，内容方便管理，独特的风格设计与交互体验

[English](README.md) | 简体中文

## ✨ 特性

- 🎨 **吉卜力风格设计**：柔和、自然的色彩系统，带来温暖、宁静的视觉体验
- ✍️ **内容管理系统**：集成Decap CMS，通过Web界面轻松管理内容，无需本地Git命令
- 🚀 **一键部署**：通过GitHub Actions自动部署到GitHub Pages
- 📊 **创新标签系统**：动态圆形标签云，大小反映文章数量
- 📝 **Markdown支持**：使用Markdown编写文章，轻松排版
- 🌩️ **云朵元素**：整个博客中都融入了精美的云朵动画元素，增强吉卜力风格体验
- 🔍 **SEO优化**：搜索引擎优化，让你的博客更容易被发现

## 🖼️ 预览

访问[在线演示](https://wowyuarm.github.io/WhisperWind-blog/)查看实际效果。

## 🚀 快速开始

1. 点击"Use this template"创建自己的仓库
2. **重要**: 进入你的仓库的 Settings > Pages 页面，将"Source"更改为"GitHub Actions"（这对于正确部署至关重要）
3. 在Netlify上创建站点并设置Identity/Git Gateway
4. 更新配置文件，替换为自己的Netlify站点URL
5. 通过GitHub Actions部署到GitHub Pages
6. 访问博客，登录CMS管理内容

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

在你fork的仓库中，主要需要修改两个配置文件：

1. 首先修改`public/admin/index.html`文件：

```javascript
// 定义Netlify站点URL - 这里只需要修改这一处即可
const NETLIFY_SITE = "your-netlify-site-name.netlify.app";

// 预配置Netlify Identity API
window.netlifyIdentity = {
  api: {
    apiURL: `https://${NETLIFY_SITE}/.netlify/identity`
  }
};

// 同时找到并修改站点URL配置（约在180行左右）
site_url: "https://your-username.github.io/your-repo-name",
display_url: "https://your-username.github.io/your-repo-name",
```

2. 然后更新`src/content/config.json`添加管理页面URL：

```json
{
  "title": "你的博客标题",
  "description": "博客描述",
  "author": "你的名字",
  "logo": "/images/logo.png",
  "favicon": "/favicon.ico",
  "adminUrl": "https://your-netlify-site-name.netlify.app/admin/",
  "social": {
    "github": "https://github.com/your-username/your-repo",
    "twitter": "",
    "weibo": "",
    "zhihu": ""
  }
}
```

请将上述URL替换为你自己的GitHub Pages地址（例如`https://your-username.github.io/your-repo-name/`）和你的Netlify站点URL。

> 💡 **重要说明**：本模板将所有CMS配置直接内嵌在`index.html`文件中，这样可以确保在GitHub Pages环境下正确运行。如果需要修改内容类型或其他CMS配置，请直接编辑`index.html`文件中的`config`对象（约在第70-180行）。

⚠️ **配置提示：** 这一步非常关键！必须正确配置两种URL：
1. Netlify站点URL - 用于身份验证（如`your-site-123456.netlify.app`）
2. GitHub Pages URL - 用于预览和站点显示（如`your-username.github.io/your-repo-name`）

#### 3. 将"管理"链接指向Netlify

博客底部的"管理"链接应该指向你的Netlify管理界面。这在两个地方配置：

1. 在`src/content/config.json`中，确保设置了`adminUrl`字段：
```json
"adminUrl": "https://your-netlify-site-name.netlify.app/admin/"
```

2. 当你点击"管理"链接时，它会直接重定向到你的Netlify托管的管理界面，而不是尝试在GitHub Pages上加载管理界面（这不会起作用，因为身份验证限制）。

#### 4. 创建管理员账号

设置好Identity服务后，你需要创建一个管理员账号：

1. 在Netlify后台，转到**Identity** > **Invite users**
2. 输入你的邮箱地址并发送邀请
3. 检查你的邮箱，接受邀请并设置密码

#### 5. 访问CMS管理界面

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

1. 访问你的主页底部的"管理"链接到认证页面
2. 使用Netlify Identity账号登录
3. 使用友好的界面创建和编辑内容：
   - **博客文章**：撰写新文章，设置标签和特色图片
   - **页面**：编辑"关于"等静态页面
   - **友链**：管理友情链接
   - **网站配置**：更新网站基本信息

当你保存更改时，CMS会通过Git Gateway创建一个提交，并推送到你的GitHub仓库。GitHub Actions会自动构建和部署更新后的网站。


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