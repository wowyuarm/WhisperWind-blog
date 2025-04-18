---
title: "WhisperWind Blog 使用指南"
publishDate: "2024-04-06 12:00:00"
tags: ["指南", "教程", "配置"]
excerpt: "全面的 WhisperWind Blog 使用指南，包括如何部署项目、配置 Decap CMS 和个性化定制。"
featuredImage: "/images/logo.png"
---

# 🍃 WhisperWind Blog 使用指南

欢迎使用 WhisperWind Blog！这是一个灵感来自吉卜力风格的静态博客模板，基于 Next.js、TypeScript 和 Tailwind CSS 构建。本指南将帮助你从零开始部署、配置和个性化你的博客。

## 📋 目录

- [项目部署](#项目部署)
- [Decap-CMS-配置](#decap-cms-配置)
- [个性化定制](#个性化定制)
- [绑定自定义域名](#绑定自定义域名)
- [常见问题](#常见问题)
- [未来计划](#未来计划)

## 🚀 项目部署

### 方式一：使用 Netlify (推荐)

这是最推荐的部署方式，可以完整使用 Decap CMS 功能。

1.  **使用模板创建仓库**: 访问 [WhisperWind Blog 仓库](https://github.com/wowyuarm/WhisperWind-blog)，点击 "Use this template" > "Create a new repository"。
2.  **注册 Netlify**: 注册 [Netlify](https://app.netlify.com/) 账号（免费）。
3.  **连接仓库**: 在 Netlify 上点击 "New site from Git" (或 "Add new site" > "Import an existing project")，选择你刚刚创建的 GitHub 仓库。
4.  **配置部署设置**: 
    *   构建命令通常会自动检测 (或设为 `npm run build` / `yarn build`)。
    *   发布目录 (Publish directory) 设置为 `.next`。
5.  **部署站点**: 点击 "Deploy site" (或类似按钮)。
6.  **配置身份验证**: 部署完成后，按照下一章节 "[Decap CMS 配置](#decap-cms-配置)" 中的步骤启用 Netlify Identity 和 Git Gateway。
7.  **配置站点 URL**: 同样在下一章节中，修改 `public/admin/index.html` 文件中的 `NETLIFY_SITE`。
8.  **访问站点**: 部署和配置完成后，你可以通过 Netlify 提供的 URL (例如 `your-site-name.netlify.app`) 访问你的博客和 CMS。

### 方式二：本地开发后部署到 Netlify

1.  **克隆仓库**: `git clone https://github.com/你的用户名/你的仓库名.git`
2.  **安装依赖**: `cd 你的仓库名 && npm install` (或 `yarn install`)
3.  **本地开发**: `npm run dev` (或 `yarn dev`)
4.  **修改配置**: 在 `public/admin/index.html` 中修改 `NETLIFY_SITE` 占位符（可以使用一个临时的 Netlify 站点名，部署后再改为最终的）。
5.  **提交并推送**: `git add . && git commit -m "你的修改" && git push`
6.  **连接 Netlify**: 按照 "方式一" 中的步骤 2-8 将你的仓库连接到 Netlify 并完成配置。

### 方式三：部署到 Vercel (CMS 功能可能受限)

Vercel 也可以部署 Next.js 项目，但 Decap CMS 依赖 Netlify 的 Identity 和 Git Gateway 服务。如果部署到 Vercel：

1.  按照类似 Netlify 的方式导入和部署项目 (输出目录为 `.next`)。
2.  你将无法使用基于 Netlify Identity 的 CMS 登录和内容管理功能。你需要寻找替代的 CMS 方案或直接在本地编辑 Markdown 文件。

### (可选) 部署到 GitHub Pages (CMS 功能不可用)

如果你不需要 CMS 功能，只想展示静态博客，可以按照模板原有的 GitHub Actions 流程部署到 GitHub Pages。

1.  **使用模板创建仓库** (同方式一)。
2.  **启用 GitHub Pages**: 前往 Settings > Pages > Source 选择 "GitHub Actions"。
3.  **注意**: 此方式下 `/admin` 路径将无法访问或登录。

## 🔧 Decap CMS 配置

本章节假设你已按照 "[项目部署](#项目部署)" 中的 **方式一** 或 **方式二** 将项目部署到了 **Netlify**。

WhisperWind Blog 集成了 Decap CMS (原 Netlify CMS)，让你能够通过友好的 Web 界面管理博客内容，而无需直接编辑代码文件。

### 配置 Netlify 身份验证

1.  登录你的 Netlify 账号，进入你部署好的站点。
2.  进入站点设置：
    *   转到 **Site configuration** > **Identity** > 点击 **Enable Identity**。
    *   向下滚动到 **Registration**，设置为 **Invite only**（推荐）。
    *   转到 **Services** > **Git Gateway** > 点击 **Enable Git Gateway**。

### 修改 CMS 配置文件

为了让 Decap CMS 知道你的 Netlify 站点地址并能正确通过 Git Gateway 与你的仓库交互，你 **必须** 在你的仓库中修改 `public/admin/index.html` 文件中的**一处地方**：

```javascript
// 找到文件中类似如下的代码块 (大约在第90行附近):

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

**将 `"YOUR_NETLIFY_SITE.netlify.app"` 替换为你自己真实的 Netlify 站点域名是让 CMS 正常工作的关键！**

提交此修改并等待 Netlify 重新部署。

> **重要说明:** 
> *   本模板使用 `public/admin/config.yml` 文件来定义 CMS 的内容结构和设置。如果你需要修改可管理的内容类型、字段等，请编辑 `config.yml` 文件。
> *   媒体文件（如图片）将通过 Git Gateway **直接存储在你的 Git 仓库** 的 `public/uploads` 目录下。这简化了设置，但请留意仓库大小。

### 创建管理员账号

设置好 Identity 服务后，创建管理员账号：

1.  在 Netlify 后台，转到 **Identity** > **Invite users**
2.  输入你的邮箱地址并发送邀请。
3.  检查你的邮箱，点击接受链接（通常会跳转到你的 Netlify 站点 `/admin/`），并设置密码。

### 访问 CMS 管理界面

1.  访问你的 **Netlify 站点 URL** (例如 `https://your-site-name.netlify.app/`)。
2.  点击页面底部的 "管理" 链接，或直接访问 `/admin/`。
3.  点击 "Login with Netlify Identity" 按钮。
4.  使用你在 Netlify 中设置的邮箱和密码登录。
5.  登录成功后，你可以通过界面创建和管理内容了。

## 🎨 个性化定制

### 基本网站信息

网站标题、描述、作者、Logo、社交链接等基本信息可以通过 CMS 进行修改：

1.  登录 CMS (`/admin/`)
2.  点击左侧导航栏的 "网站配置"
3.  选择 "基本配置"
4.  修改相应字段并保存。

(这些修改会更新 `src/content/config.json` 文件)

### 主页网站签名

网站签名位于主页的顶部，你可以通过修改 `src/pages/index.tsx` 文件来自定义：

```tsx
<div className="text-xl md:text-2xl font-light italic text-muted-foreground">
  "这里是你想要展示的签名或口号"
</div>
```

### 网站主要语言

网站的默认语言设置在 `src/pages/_document.tsx` 文件中：

```tsx
<Html lang="zh-CN"> {/* 设置全局语言 */}
```

你可以将 `zh-CN` 修改为其他语言代码，如 `en-US`（美式英语）、`en-GB`（英式英语）、`ja`（日语）等。

### 关闭动画效果

如果你想关闭某些动画效果，可以修改相应组件的代码。例如，要关闭页面切换时的过渡动画，可以修改 `src/pages/_app.tsx` 文件：

```tsx
// 将此处的 motion.div 替换为普通的 div
<div className="flex flex-col min-h-screen">
  <Component {...pageProps} />
</div>
```

### 自定义颜色主题

颜色主题定义在 `src/styles/globals.css` 文件中：

```css
:root {
  --background: 40 36% 97%;
  --foreground: 30 5% 15%;
  
  --primary: 142 41% 52%;
  --primary-foreground: 0 0% 98%;
  
  /* 更多颜色定义 */
}

.dark {
  --background: 30 5% 15%;
  --foreground: 0 0% 98%;
  
  /* 深色模式颜色定义 */
}
```

你可以根据自己的喜好调整这些 HSL 颜色值。

### 更改手绘风格的背景线条

背景线条的样式定义在 `src/styles/hand-drawn.css` 文件中，你可以调整线条的颜色、间距和透明度等属性：

```css
.hand-drawn-bg {
  /* 调整背景线条样式 */
}
```

### 添加或修改友情链接

友情链接信息可以通过 CMS 进行修改：

1.  登录 CMS (`/admin/`)
2.  点击左侧导航栏的 "网站配置"
3.  选择 "友情链接"
4.  添加、编辑或删除链接条目，然后保存。

(这些修改会更新 `src/content/links.json` 文件)

### 修改页脚显示

页脚显示内容可以在 `src/components/layout/Footer.tsx` 文件中修改。

## 🌐 绑定自定义域名

如果你有自己的域名，可以将其绑定到部署在 **Netlify** 上的 WhisperWind Blog：

### Netlify 绑定域名

1.  **在 Netlify 后台添加域名**: 进入 Netlify 站点设置 > **Domain management** > **Domains** > 点击 **Add custom domain**。
2.  **输入你的域名** 并验证。
3.  **设置 DNS 记录**: 根据 Netlify 提供的指导，在你的域名注册商处添加相应的 DNS 记录 (通常是 A 记录或 CNAME 记录)。
4.  **等待 DNS 生效**: 可能需要几分钟到几小时。
5.  **启用 HTTPS**: Netlify 通常会自动为自定义域名配置 SSL 证书。

### (可选) GitHub Pages 绑定域名

如果你选择部署到 GitHub Pages 且不需要 CMS 功能，可以按以下步骤绑定域名：

1.  **添加 CNAME 文件**: 在 `public` 目录下创建 `CNAME` 文件，内容为你的域名。
2.  **设置 DNS 记录**: (同之前说明)。
3.  **在 GitHub 中配置**: (同之前说明)。

## ❓ 常见问题

### Favicon 没有显示？

确保你已在 `public` 目录下放置了以下文件：
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

然后清除浏览器缓存，重新加载页面。

### 如何添加评论功能？

WhisperWind Blog 默认没有集成评论系统，但你可以轻松添加常见的评论服务：

1. **Disqus**：
   - 注册 [Disqus](https://disqus.com) 账号
   - 在 `src/components/blog/CommentSection.tsx` 中添加 Disqus 代码
   - 在文章页面引入评论组件

2. **Giscus (基于 GitHub Discussions)**：
   - 设置 [Giscus](https://giscus.app) 
   - 将生成的代码添加到文章模板中

### 如何调整代码高亮样式？

代码高亮使用 rehype-highlight 实现，你可以在 `src/styles/globals.css` 文件中修改高亮样式：

```css
/* 代码高亮主题样式 */
code[class*="language-"],
pre[class*="language-"] {
  /* 自定义样式 */
}
```

## 🚀 未来计划

WhisperWind Blog 正在持续改进中，以下是我们近期的开发计划：

### 即将到来的功能

- **深色/浅色模式切换**：更完善的主题切换功能，包括自动跟随系统设置
- **代码块显示优化**：改进代码块的显示效果，添加行号、复制按钮等功能
- **评论功能**：集成轻量级评论系统，方便读者与作者交流
- **动画效果优化**：改进现有动画效果，增加更多吉卜力风格的动画元素
- **国际化支持**：添加多语言支持，让更多人能够使用 WhisperWind Blog
- **性能优化**：继续优化网站性能，提升用户体验
- **更多主题选项**：提供多种主题风格可供选择

我们欢迎社区贡献！如果你有任何建议或想要参与开发，请访问我们的 [GitHub 仓库](https://github.com/wowyuarm/WhisperWind-blog)。

---

希望这份指南能帮助你充分利用 WhisperWind Blog 模板的各种功能。如果你有任何问题或需要进一步的帮助，请随时联系我们。

祝你创作愉快！🍃 