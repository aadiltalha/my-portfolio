# Aadil Talha - Portfolio Website

A premium, modern React portfolio website showcasing full-stack development expertise with MERN Stack specialization.

## Features

- **Modern Design**: Dark-mode first with light mode support
- **Smooth Animations**: Framer Motion for engaging interactions
- **Responsive Layout**: Mobile-first design works on all devices
- **API Integration**: Connected to backend at `http://localhost:5000/api`
- **Performance**: Code-splitting with lazy loading using React.lazy
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Theme Toggle**: Dark/Light mode with localStorage persistence

## Pages

- **Home**: Hero section with call-to-action buttons and stats
- **About**: Bio, skill tags, experience timeline
- **Portfolio**: Projects with filtering by category
- **Blog**: Articles with modal detail view
- **Testimonials**: Auto-slider carousel
- **Contact**: Contact form with validation
- **404**: Custom error page

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router DOM
- Axios
- React Icons
- React Toastify

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

\`\`\`bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
\`\`\`

### Development

\`\`\`bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
\`\`\`

### Build

\`\`\`bash
# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## API Endpoints

The portfolio connects to a backend API at `http://localhost:5000/api`:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/projects` | GET | Fetch all projects |
| `/blogs` | GET | Fetch blog articles |
| `/testimonials` | GET | Fetch client testimonials |
| `/contact` | POST | Submit contact form |
| `/resume/resume.pdf` | GET | Download resume |

## Customization

### Update Personal Info

Edit `src/utils/constants.js` to update:
- Social media links
- Navigation links
- Skills and tech stack

### Update Styles

Modify CSS variables in `src/index.css`:
- Color scheme (primary, secondary, accent)
- Theme colors for dark/light mode

### Update Content

Replace mock data in component files:
- `src/pages/Portfolio.jsx` - mockProjects
- `src/pages/Blog.jsx` - mockBlogs
- `src/pages/Testimonials.jsx` - mockTestimonials

## Deployment

### Deploy to Vercel

\`\`\`bash
# Push to GitHub first
git push

# Connect repository to Vercel at vercel.com
# Auto-deploy on push
\`\`\`

### Deploy to Netlify

\`\`\`bash
# Build locally
npm run build

# Deploy dist folder to Netlify
netlify deploy --prod --dir=dist
\`\`\`

## Performance Tips

- Code is already split with lazy loading
- Images use responsive sizing
- Animations use GPU-accelerated transforms
- All assets are minified in production

## Future Enhancements

- [ ] Blog search functionality
- [ ] Project filtering with tags
- [ ] Newsletter subscription
- [ ] Analytics integration
- [ ] Comments on blog posts
- [ ] Dynamic theme customization

## Support

For issues or questions, please open a GitHub issue or contact hello@aadiltalha.com

---

Made with ❤️ using React and TailwindCSS
