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
- [Decap CMS 配置](#decap-cms-配置)
- [个性化定制](#个性化定制)
- [绑定自定义域名](#绑定自定义域名)
- [常见问题](#常见问题)
- [未来计划](#未来计划)

## 🚀 项目部署 {#项目部署}

### 方式一：直接使用模板 (最简单)

1. **使用模板**：访问 [WhisperWind Blog 仓库](https://github.com/wowyuarm/WhisperWind-blog)，点击 "Use this template" > "Create a new repository"
2. **设置仓库信息**：
   - 输入你想要的仓库名称
   - 选择公开仓库
   - 点击 "Create repository from template"
3. **启用 GitHub Pages**：
   - 进入新创建的仓库
   - 前往 Settings > Pages
   - Source 选择 "GitHub Actions"
   - 系统会自动使用仓库中的 GitHub Actions 工作流进行部署

项目会自动通过 GitHub Actions 构建并部署到 GitHub Pages。部署完成后，你可以通过 `https://你的用户名.github.io/仓库名称/` 访问你的博客。

### 方式二：本地开发后部署

如果你想先在本地进行一些修改后再部署：

1. **克隆仓库**：将仓库克隆到本地
   ```bash
   git clone https://github.com/你的用户名/仓库名称.git
   cd 仓库名称
   ```
2. **安装依赖**：
   ```bash
   npm install
   # 或使用 yarn 
   yarn install
   ```
3. **本地开发**：
   ```bash
   npm run dev
   # 或
   yarn dev
   ```
4. **提交并推送**：完成修改后，提交并推送你的更改
   ```bash
   git add .
   git commit -m "初始化自定义"
   git push
   ```

GitHub Actions 会自动构建并部署你的网站。在 GitHub 仓库的 Actions 标签下可以查看部署进度。

### 方式三：使用 Vercel 或 Netlify

1. 在 [Vercel](https://vercel.com) 或 [Netlify](https://netlify.com) 上注册账号
2. 导入你的 GitHub 仓库
3. 设置构建命令为 `npm run build` 或 `yarn build`
4. 设置输出目录为 `out`
5. 点击部署

## 🔧 Decap CMS 配置 {#decap-cms-配置}

WhisperWind Blog 集成了 Decap CMS (原 Netlify CMS)，让你能够通过友好的 Web 界面管理博客内容，而无需直接编辑代码文件。

### 配置 Netlify 身份验证

虽然你的博客可能部署在 GitHub Pages 上，但我们需要使用 Netlify 提供的身份验证服务：

1. 注册 [Netlify](https://app.netlify.com/) 账号（免费）
2. 点击 "New site from Git"，选择你的 GitHub 仓库
3. 部署设置保持默认值，点击 "Deploy site"
4. 部署完成后，记下你的 Netlify 站点名称（例如：your-site-123456.netlify.app）
5. 进入站点设置：
   - 转到 **Site configuration** > **Identity** > 点击 **Enable Identity**
   - 向下滚动到 **Registration**，设置为 **Invite only**（推荐）
   - 转到 **Services** > **Git Gateway** > 点击 **Enable Git Gateway**

### 修改 CMS 配置文件

在你的仓库中，需要修改 `public/admin/index.html` 文件：

```javascript
// 找到并修改大约第30行
const NETLIFY_SITE = "your-netlify-site-name.netlify.app";

// 同时找到并修改站点URL配置（约在180行左右）
site_url: "https://你的用户名.github.io/仓库名称",
display_url: "https://你的用户名.github.io/仓库名称",
```

### 创建管理员账号

设置好 Identity 服务后，创建管理员账号：

1. 在 Netlify 后台，转到 **Identity** > **Invite users**
2. 输入你的邮箱地址并发送邀请
3. 检查你的邮箱，接受邀请并设置密码

### 访问 CMS 管理界面

1. 访问你的博客站点：`https://你的用户名.github.io/仓库名称/`
2. 点击页面底部的 "管理" 链接
3. 使用你在 Netlify 中设置的邮箱和密码登录
4. 登录成功后，你可以通过界面创建和管理内容了

## 🎨 个性化定制 {#个性化定制}

### 基本网站信息

修改 `src/content/config.json` 文件以更新网站的基本信息：

```json
{
  "title": "你的博客名称",
  "description": "博客描述",
  "author": "你的名字",
  "logo": "/images/your-logo.png",
  "favicon": "/favicon.ico",
  "social": {
    "github": "https://github.com/你的用户名",

  }
}
```

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

友情链接存储在 `src/content/links.json` 文件中：

```json
{
  "links": [
    {
      "name": "链接名称",
      "url": "https://example.com",
      "description": "链接描述",
      "icon": "/images/links/icon.png",
      "type": "official" // 或 "personal"
    }
    // 添加更多链接
  ]
}
```

### 修改页脚显示

页脚显示内容可以在 `src/components/layout/Footer.tsx` 文件中修改。

## 🌐 绑定自定义域名 {#绑定自定义域名}

如果你有自己的域名，可以将其绑定到你的 WhisperWind Blog：

### GitHub Pages 绑定域名

1. **添加 CNAME 文件**：
   - 在 `public` 目录下创建一个名为 `CNAME` 的文件
   - 文件内容为你的域名，例如 `blog.example.com`

2. **设置 DNS 记录**：
   - 如果使用子域名（如 `blog.example.com`），添加一条 CNAME 记录，将子域名指向 `你的用户名.github.io`
   - 如果使用顶级域名（如 `example.com`），添加以下 A 记录指向 GitHub Pages 的 IP 地址：
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - 同时添加一条 CNAME 记录，将 `www` 指向 `你的用户名.github.io`

3. **在 GitHub 中配置**：
   - 进入你的仓库
   - 前往 Settings > Pages
   - 在 "Custom domain" 部分填入你的域名
   - 勾选 "Enforce HTTPS"（如果可用）

### Vercel 或 Netlify 绑定域名

1. **在服务商后台添加域名**：
   - 进入你的 Vercel/Netlify 项目
   - 找到域名或自定义域名设置
   - 添加你的域名

2. **设置 DNS 记录**：
   - 根据平台提供的指导，添加相应的 DNS 记录
   - 通常需要添加一条 CNAME 记录，将你的域名指向平台提供的值

3. **验证域名所有权**：
   - 按照平台的要求完成域名验证步骤
   - 可能需要添加 TXT 记录或通过其他方式验证

完成上述步骤后，等待 DNS 生效（可能需要几分钟到几小时），然后你就可以通过自定义域名访问你的博客了。

## ❓ 常见问题 {#常见问题}

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

## 🚀 未来计划 {#未来计划}

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