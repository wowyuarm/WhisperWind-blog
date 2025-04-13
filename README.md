# WhisperWind Blog

🌬️ Open-source blog template inspired by Ghibli style, with easy content management and unique design & interaction experience

[简体中文](README.zh-CN.md) | English

## ✨ Features

- 🎨 **Ghibli-Inspired Design**: Soft, natural color palette creating a warm and peaceful visual experience
- ✍️ **Content Management**: Integrated Decap CMS for easy content management through a web interface
- 🚀 **One-Click Deploy**: Automatic deployment to GitHub Pages via GitHub Actions
- 📊 **Innovative Tag System**: Dynamic circular tag cloud with size reflecting article count
- 🌩️ **Cloud Elements**: Beautiful cloud animations throughout the blog enhancing the Ghibli aesthetic
- 🔍 **SEO Optimized**: Making your blog easily discoverable

## 🖼️ Preview

Visit the [live demo](https://wowyuarm.github.io/WhisperWind-blog/) to see it in action.

## 🚀 Quick Start

1. Click "Use this template" to create your own repository
2. **Important**: Go to your repository's Settings > Pages, and change the "Source" to "GitHub Actions" (this is crucial for deploying correctly)
3. Set up a Netlify site and configure Identity/Git Gateway
4. Update configuration files with your Netlify site URL
5. Deploy to GitHub Pages via GitHub Actions
6. Access your blog and log in to the CMS

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

> ⚠️ **Important Note About Netlify Deployment**: The template uses a minimalist deployment approach for Netlify. Only the authentication-related files (admin interface and identity page) are deployed to Netlify, not the entire blog. This is intentional, as the main blog content is served through GitHub Pages, while Netlify provides only the authentication service.

#### 2. Update Configuration Files with Your Netlify Site URL

In your forked repository, you need to modify two configuration files:

1. First, update `public/admin/index.html`:

```javascript
// Define Netlify site URL - you only need to change this one place
const NETLIFY_SITE = "your-netlify-site-name.netlify.app";

// Pre-configure Netlify Identity API
window.netlifyIdentity = {
  api: {
    apiURL: `https://${NETLIFY_SITE}/.netlify/identity`
  }
};

// Also find and modify site URL configuration (around line 230)
site_url: "https://your-username.github.io/your-repo-name",
display_url: "https://your-username.github.io/your-repo-name",
```

2. Similarly, update the same URL in `public/identity.html`:

```javascript
// Define site URL
const NETLIFY_SITE = "your-netlify-site-name.netlify.app"; // Replace with your Netlify site name
```

3. Then, update `src/content/config.json` to add your admin URL:

```json
{
  "title": "Your Blog Title",
  "description": "Your blog description",
  "author": "Your Name",
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

Please replace the above URLs with your own GitHub Pages address, e.g., `https://your-username.github.io/your-repo-name/` and your Netlify site URL.

> 💡 **Important Note**: This template embeds all CMS configuration directly in the `index.html` file to ensure it works correctly in the GitHub Pages environment. If you need to modify content types or other CMS configuration, edit the `config` object in the `index.html` file (approximately lines 70-180).

⚠️ **Configuration Tip:** This step is crucial! You must configure two types of URLs correctly:
1. Netlify Site URL - for authentication (e.g., `your-site-123456.netlify.app`)
2. GitHub Pages URL - for preview and site display (e.g., `your-username.github.io/your-repo-name`)

#### 3. Troubleshooting Identity Issues

If you encounter issues with Netlify identity (such as problems setting up your password or login):

1. When receiving invitation emails, make sure you click the link and it opens the `identity.html` page
2. If you see a blank page or errors when trying to set up your password:
   - Manually go to your Netlify site URL followed by `/identity.html` (e.g., `your-site-123456.netlify.app/identity.html`)
   - Use the "Open Login Window" button to manually trigger the authentication
   - Copy-paste your invite token from the email URL to your browser's address bar after `/identity.html#invite_token=`

3. If issues persist, check the browser console for specific errors, and ensure all URLs in your configuration match your actual Netlify domain

#### 4. Redirect "Admin" Link to Netlify

The "Admin" link in the footer of your blog should point to your Netlify admin interface. This is configured in two places:

1. In `src/content/config.json`, make sure to set the `adminUrl` field:
```json
"adminUrl": "https://your-netlify-site-name.netlify.app/admin/"
```

2. When you click the "Admin" link, it will now redirect you directly to your Netlify-hosted admin interface instead of trying to load the admin interface on GitHub Pages (which won't work due to authentication limitations).

#### 5. Create Admin Account

After setting up the Identity service, you need to create an admin account:

1. In the Netlify dashboard, go to **Identity** > **Invite users**
2. Enter your email address and send the invitation
3. Check your email, accept the invitation, and set a password

#### 6. Access CMS Admin Interface

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

1. Visit the "Admin" link in your site's footer to access the authentication page
2. Log in with your Netlify Identity account
3. Create and edit content through a friendly interface:
   - **Blog Posts**: Write new articles, set tags and featured images
   - **Pages**: Edit static pages like "About"
   - **Friend Links**: Manage friendship links
   - **Site Configuration**: Update basic site information

When you save changes, the CMS creates a commit and pushes it to your GitHub repository. GitHub Actions automatically builds and deploys the updated site.

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