<div align="center">

# 🎨 Creative Tech Stack

**A curated collection of posts and tools for creative coders and technologists**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![MDX](https://img.shields.io/badge/MDX-3-1B1F24?style=flat-square&logo=mdx)](https://mdxjs.com)

[**🌐 Visit Live Site**](https://creativetechstack.jonothan.dev/) • [**📝 Read the Blog**](https://creativetechstack.jonothan.dev/newsletter) • [**🛠️ Browse Tools**](https://creativetechstack.jonothan.dev/tools)

</div>

---

## 🤝 Creative Tech Stack is Open Source

Whether you're just starting out or an experienced technologist, please add a post or tool to the stack (or even improve the codebase)! Here's how:

### 🚀 Getting Started

#### Prerequisites

- **Node.js** 18+ or **pnpm** 10+
- **Git**

#### Installation

```bash
# Clone the repository
git clone https://github.com/jonothanhunt/creative-tech-stack.git
cd creative-tech-stack

# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site running locally! 🎉

---

<details>
<summary><strong>🛠️ Adding a Tool</strong></summary>

Tools are stored in a simple TypeScript file - no database needed!

1. **Open** `app/data/tools.ts`

2. **Add your tool** to the `tools` array:

```typescript
{
    "name": "Your Amazing Tool",
    "description": "A concise description of what it does and why it's awesome.",
    "image": "/images/tools/your-tool.png", // Add your image to public/images/tools/
    "type": "Tool", // Options: Tool, Library, Platform, Framework, Engine, API, etc.
    "categories": ["Creative Coding", "Real-time 3D"], // Pick from existing categories
    "stacks": ["WebGL", "JavaScript", "3D"], // Add relevant tech tags
    "featured": false, // Set to true if it's exceptional
    "links": [
        {
            "title": "Website",
            "url": "https://yourtool.com"
        },
        {
            "title": "Docs",
            "url": "https://docs.yourtool.com"
        }
    ]
}
```

> [!TIP]
> Look at existing tools in `tools.ts` for reference. Keep descriptions under 150 characters for best display.

3. **Add an image** (optional but recommended):
   - Place a high-quality screenshot or logo in `public/images/tools/`
   - Name it using kebab-case: `your-tool-name.png`
   - Recommended size: 1200x900px (4:3 aspect ratio)

4. **Submit a Pull Request:**

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/creative-tech-stack.git
cd creative-tech-stack

# Create a new branch for your changes
git checkout -b add-your-tool-name

# Make your changes, then commit
git add .
git commit -m "Add Your Tool Name to tools list"

# Push to your fork
git push origin add-your-tool-name
```

Then open a pull request on GitHub from your fork to the main repository.

</details>

<details>
<summary><strong>✍️ Writing a Blog Post</strong></summary>

Blog posts are written in **MDX** (Markdown + React components).

1. **Create a new file** in `posts/`:

```bash
posts/my-awesome-article.mdx
```

2. **Add frontmatter** at the top:

```yaml
---
title: "My Awesome Article Title"
date: "2026-01-12"
description: "A compelling summary that appears in previews and SEO."
image: "/images/posts/my-awesome-article/hero.png"
author: "Your Name"
---
```

3. **Write your content** using Markdown:

```markdown
## Introduction

Your amazing content here...

### Subheading

More great insights...
```

4. **Use custom components** (optional):

```jsx
<YouTubeEmbed url="https://youtube.com/watch?v=..." />

<VimeoEmbed url="https://vimeo.com/..." />

<LinkedInEmbed url="https://linkedin.com/embed/..." />

<InfoBlock>
💡 **Pro Tip:** This is a highlighted info block!
</InfoBlock>
```

5. **Add images** for your post:
   - Create a folder: `public/images/posts/my-awesome-article/`
   - Add your images there
   - Reference them: `![Alt text](/images/posts/my-awesome-article/image.png)`

6. **Submit a Pull Request**

> [!NOTE]
> MDX allows you to use React components directly in your Markdown. See the [MDX documentation](https://mdxjs.com) for more advanced usage.

<details>
<summary><strong>🔧 Advanced: Adding New MDX Components</strong></summary>

If you want to create a new reusable component for blog posts:

1. **Create the component** in `components/`:

```tsx
// components/MyCustomComponent.tsx
export default function MyCustomComponent({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-custom-styling">
            {children}
        </div>
    );
}
```

2. **Export it** from `mdx-components.tsx`:

```tsx
import MyCustomComponent from '@/components/MyCustomComponent';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        MyCustomComponent,
    };
}
```

3. **Use it** in any MDX file:

```jsx
<MyCustomComponent>
Your content here
</MyCustomComponent>
```

</details>

</details>

---

## 📁 Project Structure

```
creative-tech-stack/
├── app/
│   ├── data/
│   │   └── tools.ts          # Tools database
│   ├── tools/                # Tools page
│   ├── newsletter/           # Blog/newsletter pages
│   └── layout.tsx            # Root layout
├── components/               # Reusable React components
│   ├── YouTubeEmbed.tsx
│   ├── VimeoEmbed.tsx
│   ├── InfoBlock.tsx
│   └── ...
├── posts/                    # MDX blog posts
├── public/
│   └── images/
│       ├── tools/            # Tool images
│       └── posts/            # Blog post images
├── lib/                      # Utility functions
└── mdx-components.tsx        # MDX component registry
```

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) with App Router
- **Language:** [TypeScript 5](https://www.typescriptlang.org)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **Content:** [MDX 3](https://mdxjs.com) for blog posts
- **3D Graphics:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Three.js](https://threejs.org)
- **Animations:** [Motion](https://motion.dev)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment:** [Vercel](https://vercel.com)

---

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🌟 Contributors

Thank you to all our amazing contributors! 💖

<!-- Contributors are dynamically pulled from GitHub and displayed in the footer -->

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Get in Touch

- **Website:** [creativetechstack.jonothan.dev](https://creativetechstack.jonothan.dev)
- **GitHub:** [@jonothanhunt](https://github.com/jonothanhunt)
- **Issues:** [Report a bug or request a feature](https://github.com/jonothanhunt/creative-tech-stack/issues)

---

<div align="center">

[⬆ Back to Top](#-creative-tech-stack)

</div>
