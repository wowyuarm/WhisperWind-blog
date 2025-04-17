# WhisperWind Blog

🌬️ Open-source blog template inspired by Ghibli style, with easy content management and unique design & interaction experience

[简体中文](README.zh-CN.md) | English

## ✨ Features

- 🎨 **Ghibli-Inspired Design**: Soft, natural color palette creating a warm and peaceful visual experience
- ✍️ **Content Management**: Integrated Decap CMS for easy content management through a web interface
- 🚀 **One-Click Deploy**: Optimized for easy deployment on Netlify
- 📊 **Innovative Tag System**: Dynamic circular tag cloud with size reflecting article count
- 🌩️ **Cloud Elements**: Beautiful cloud animations throughout the blog enhancing the Ghibli aesthetic
- 🔍 **SEO Optimized**: Making your blog easily discoverable

## 🖼️ Preview

Visit the [live demo](https://your-netlify-site-name.netlify.app/) (Replace with your Netlify URL) to see it in action.

## 🚀 Quick Start

1. Click "Use this template" to create your own repository.
2. Sign up for a [Netlify](https://app.netlify.com/) account (free).
3. Click "New site from Git" on Netlify and select your GitHub repository.
4. Configure Netlify Identity and Git Gateway (see below).
5. Update configuration files with your Netlify site URL (see below).
6. Netlify will automatically build and deploy your site.
7. Access your blog at your Netlify URL and log in to the CMS.

### Setting Up Decap CMS with Netlify Identity

Decap CMS allows you to manage your blog content through a web interface. Netlify Identity provides the necessary authentication.

#### 1. Set Up Netlify Site and Authentication

1. After creating your site on Netlify (Step 3 above), go to site settings:
   - Navigate to **Site configuration** > **Identity** > click **Enable Identity**.
   - Scroll down to **Registration** and set it to **Invite only** (recommended) or choose open registration.
   - Go to **Services** > **Git Gateway** > click **Enable Git Gateway**.

#### 2. Update Configuration Files with Your Netlify Site URL

In your repository, you need to modify two configuration files:

1. First, update `public/admin/index.html`:

```javascript
// Define Netlify site URL - **MUST** replace with your actual Netlify site name
const NETLIFY_SITE = "YOUR_NETLIFY_SITE.netlify.app";


2. Then, update `src/content/config.json` to add your admin URL:

```json
{
  "title": "Your Blog Title",
  "description": "Your blog description",
  "author": "Your Name",
  "logo": "/images/logo.png", // Ensure paths are correct for Netlify
  "favicon": "/favicon.ico",
  "adminUrl": "", // **MUST** be manually set to: https://your-netlify-site-name.netlify.app/admin/
  "social": {
    "github": "https://github.com/your-username/your-repo",
    "twitter": "",
    "weibo": "",
    "zhihu": ""
  }
}
```

**Important:** Replace `YOUR_NETLIFY_SITE.netlify.app` in both files with your actual Netlify site URL.

> 💡 **Note**: This template embeds all CMS configuration directly in the `admin/index.html` file. If you need to modify content types or other CMS configuration, edit the `config` object within this file.

#### 3. Create Admin Account

After setting up the Identity service:

1. In the Netlify dashboard, go to **Identity** > **Invite users**.
2. Enter your email address and send the invitation.
3. Check your email, click the acceptance link (which should take you to your Netlify site's admin page or prompt login), and set a password.

#### 4. Access CMS Admin Interface

1. Visit your Netlify site URL: `https://your-netlify-site-name.netlify.app/`
2. Click the "Admin" link in the page footer (or go directly to `/admin/`).
3. Click the "Login with Netlify Identity" button.
4. Log in with your Netlify email and password.
5. Manage your content.

### Customization

- **Content**: Manage through CMS or directly edit files in the `src/content` directory.
- **Styles**: Modify `tailwind.config.ts` and `src/styles/globals.css`.
- **Components**: Customize components in the `src/components` directory.
- **Configuration**: Update site information in `src/content/config.json`.

## 📝 Using the CMS

- Access the CMS via the "Admin" link or by going to `/admin/` on your Netlify site.
- Log in using Netlify Identity.
- Create/edit posts, pages, links, and site configuration.
- Changes saved in the CMS will trigger a new build and deployment on Netlify.

## 📚 Tag System Features

WhisperWind Blog has a unique tag cloud layout with:

1. **Circular Dynamic Layout**: Tags arranged in a circular pattern, with main tags in the center
2. **Size Reflecting Article Count**: Tag size dynamically adjusts based on related article count
3. **Adaptive Animations**: Layout and animation effects automatically adjust to screen size
4. **Hover Effects**: Tags scale and display shadow effects on hover
5. **Smooth Transitions**: Silky animations using Framer Motion enhance user experience
6. **Tag Filtering**: Quickly filter tags via search box

## 🧩 Main Functions

- **Home Page**: Showcasing latest articles and site introduction
- **Article Detail Page**: Displaying full article content with Markdown rendering
- **Archive Page**: Listing all articles by date
- **Tag Page**: Displaying all tags in a circular cloud layout, click to view related articles
- **About Page**: Static page about the website
- **Friend Links Page**: Displaying friendship links

## 🤝 Contributing

Contributions are welcome! Please check the [Contribution Guidelines](CONTRIBUTING.md).

## 📃 License

This project is licensed under the [MIT License](LICENSE).

## 📧 Contact

If you have any questions, please contact us through [GitHub Issues](https://github.com/wowyuarm/WhisperWind-blog/issues).

---

🌟 If you like this project, please give it a Star!

## Acknowledgements

Some UI design and style elements are inspired by the open-source project [Ghibli Style Shadcn/ui](https://github.com/cefeng06/Ghibli-Shadcn-Theme)