# WhisperWind Blog

🌬️ Open-source blog template inspired by Ghibli style, with easy content management and unique design & interaction experience

[简体中文](README.zh-CN.md) | English

## ✨ Features

- 🎨 **Ghibli-Inspired Design**: Soft, natural color palette creating a warm and peaceful visual experience
- 📱 **Responsive Layout**: Perfect display on any device
- ✍️ **Content Management**: Integrated Decap CMS for easy content management through a web interface
- 🚀 **One-Click Deploy**: Automatic deployment to GitHub Pages via GitHub Actions
- 🔍 **SEO Optimized**: Making your blog easily discoverable
- 📊 **Innovative Tag System**:
  - Dynamic circular tag cloud with size reflecting article count
  - Interactive hover effects and smooth animations
  - Tag filtering functionality
- 📝 **Markdown Support**: Write articles with easy formatting
- 🌩️ **Cloud Elements**: Beautiful cloud animations throughout the blog enhancing the Ghibli aesthetic

## 🖼️ Preview

Visit the [live demo](https://wowyuarm.github.io/WhisperWind-blog/) to see it in action.

## 🚀 Quick Start

1. Click "Use this template" to create your own repository
2. Set up a Netlify site and configure Identity/Git Gateway
3. Update configuration files with your Netlify site URL
4. Deploy to GitHub Pages via GitHub Actions
5. Access your blog and log in to the CMS

### Setting Up Decap CMS

Decap CMS allows you to manage your blog content through a web interface without editing files locally and pushing to GitHub. Here's how to set it up:

#### 1. Set Up Netlify Site and Authentication

While your blog content will be deployed on GitHub Pages, we need to use Netlify's authentication service for content management:

1. Sign up for a [Netlify](https://app.netlify.com/) account (free)
2. Click "New site from Git" and select your GitHub repository
3. Keep the deployment settings as default and click "Deploy site" (this is just for authentication, your actual blog will still be served through GitHub Pages)
4. Once deployed, note your Netlify site name (e.g., your-site-123456.netlify.app)
5. Go to site settings:
   - Navigate to **Site configuration** > **Identity** > click **Enable Identity**
   - Scroll down to **Registration** and set it to **Invite only** (recommended) or choose open registration
   - Go to **Services** > **Git Gateway** > click **Enable Git Gateway**

#### 2. Update Configuration Files with Your Netlify Site URL

In your forked repository, you need to modify the configuration in `public/admin/index.html`:

```javascript
// Define Netlify site URL - you only need to change this one place
const NETLIFY_SITE = "your-netlify-site-name.netlify.app";

// Pre-configure Netlify Identity API
window.netlifyIdentity = {
  api: {
    apiURL: `https://${NETLIFY_SITE}/.netlify/identity`
  }
};

// Also find and modify site URL configuration (around line 90)
site_url: "https://your-username.github.io/your-repo-name",
display_url: "https://your-username.github.io/your-repo-name",
```

Please replace the above URLs with your own GitHub Pages address, e.g., `https://your-username.github.io/your-repo-name/`.

> 💡 **Important Note**: This template embeds all CMS configuration directly in the `index.html` file to ensure it works correctly in the GitHub Pages environment. If you need to modify content types or other CMS configuration, edit the `config` object in the `index.html` file (approximately lines 70-180).

⚠️ **Configuration Tip:** This step is crucial! You must configure two types of URLs correctly:
1. Netlify Site URL - for authentication (e.g., `your-site-123456.netlify.app`)
2. GitHub Pages URL - for preview and site display (e.g., `your-username.github.io/your-repo-name`)

#### 3. Create Admin Account

After setting up the Identity service, you need to create an admin account:

1. In the Netlify dashboard, go to **Identity** > **Invite users**
2. Enter your email address and send the invitation
3. Check your email, accept the invitation, and set a password

#### 4. Access CMS Admin Interface

After completing the steps above and deploying your GitHub Pages website:

1. Visit your GitHub Pages site: `https://your-username.github.io/your-repo-name/`
2. Click the "Admin" link in the page footer
3. Click the "Login with Netlify Identity" button
4. Log in with your Netlify email and password
5. Once logged in, you can create and manage content through the friendly interface

### Customization

- **Content**: Manage through CMS or directly edit files in the `src/content` directory
- **Styles**: Modify `tailwind.config.ts` and `src/styles/globals.css`
- **Components**: Customize components in the `src/components` directory
- **Configuration**: Update site information in `src/content/config.json`

## 📝 Using the CMS

With Decap CMS, you can easily manage your blog content:

1. Visit your website's `/admin/` path
2. Log in with your Netlify Identity account
3. Create and edit content through a friendly interface:
   - Blog posts with tags and featured images
   - Static pages
   - Friend links
   - Site configuration

When you save changes, the CMS creates a commit and pushes it to your GitHub repository. GitHub Actions automatically builds and deploys the updated site.

## 📚 Tag System Features

WhisperWind Blog has a unique tag cloud layout with:

1. **Circular Dynamic Layout**: Tags arranged in a circular pattern, with main tags in the center
2. **Size Reflecting Article Count**: Tag size dynamically adjusts based on related article count
3. **Adaptive Animations**: Layout and animation effects automatically adjust to screen size
4. **Hover Effects**: Tags scale and display shadow effects on hover
5. **Smooth Transitions**: Silky animations using Framer Motion enhance user experience
6. **Tag Filtering**: Quickly filter tags via search box

## 🧩 Key Functions

- **Home Page**: Showcasing latest articles and site introduction
- **Article Detail Page**: Displaying full article content with Markdown rendering
- **Archive Page**: Listing all articles by date
- **Tag Page**: Displaying all tags in a circular cloud layout
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