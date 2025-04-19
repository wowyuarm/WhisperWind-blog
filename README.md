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

Visit the [live demo](https://yucreate.netlify.app/) (Replace with your Netlify URL) to see it in action.

## 🚀 Quick Start

1. Click "Use this template" to create your own repository.
2. Sign up for a [Netlify](https://app.netlify.com/) account (free).
3. Click "New site from Git" on Netlify and select your GitHub repository.
4. Configure Netlify Identity and Git Gateway (see below).
5. Update the **single required configuration** in `public/admin/index.html` with your Netlify site URL (see below).
6. Netlify will automatically build and deploy your site.
7. Access your blog at your Netlify URL and log in to the CMS via the "Admin" link or `/admin/`.

### Setting Up Decap CMS with Netlify Identity

Decap CMS allows you to manage your blog content through a web interface. Netlify Identity provides the necessary authentication, and Git Gateway allows the CMS to commit changes directly to your repository.

#### 1. Set Up Netlify Site and Authentication

1. After creating your site on Netlify (Step 3 above), go to site settings:
   - Navigate to **Site configuration** > **Identity** > click **Enable Identity**.
   - Scroll down to **Registration** and set it to **Invite only** (recommended) or choose open registration.
   - Go to **Services** > **Git Gateway** > click **Enable Git Gateway**.

#### 2. Update the Required Configuration

In your repository, you **must** modify **one place** in `public/admin/index.html`:

```javascript
// **********************************************************
// ** User Configuration Area (Start) **
// **********************************************************

// !! IMPORTANT !!
// Replace "YOUR_NETLIFY_SITE.netlify.app" below with the actual domain name 
// of your site deployed on Netlify.
// Example: const NETLIFY_SITE = "my-awesome-blog.netlify.app";
const NETLIFY_SITE = "YOUR_NETLIFY_SITE.netlify.app"; 

// **********************************************************
// ** User Configuration Area (End) **
// **********************************************************
```

**That's the only mandatory configuration needed to get the CMS running!**

> 💡 **Media Storage**: This template is configured to store media files (like images) directly in your Git repository under the `public/uploads` directory. This simplifies setup as no external media library is needed. Be mindful of your Git provider's repository size limits.

> 💡 **Further Customization (Optional)**: If you need to change the main Git branch (`main` by default), content folder paths (`src/content/posts`, etc.), or CMS content fields, you can edit the `config` object within the `public/admin/index.html` file. Look for comments indicating these optional configuration points.

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

- **Content**: Manage through CMS (via `/admin/`) or directly edit files in the `src/content` directory.
- **Styles**: Modify `tailwind.config.ts` and `src/styles/globals.css`.
- **Components**: Customize components in the `src/components` directory.
- **Site Configuration**: Update site title, description, author, social links etc. within the CMS under "Website Configuration" > "Basic Configuration", which edits `src/content/config.json`.
- **CMS Configuration**: Modify content types, fields, or backend settings directly within the `config` object in `public/admin/index.html`.

## 📝 Using the CMS

- Access the CMS via the "Admin" link in the footer or by going to `/admin/` on your Netlify site.
- Log in using Netlify Identity.
- Create/edit posts, pages, links, and site configuration. **Media files will be uploaded directly to your Git repository.**
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
