# Balans Landing Page

A responsive Next.js landing page for Balans hormone health testing platform, built with Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with beautiful responsive layouts
- **Modern Components**: Hero, Timeline Curve, Feature Cards, How It Works, FAQ, and Footer
- **Interactive Elements**: Collapsible FAQ, mobile navigation, hover effects
- **Email Collection**: Functional email signup form with API endpoint
- **Beautiful Styling**: Gradient backgrounds, glass morphism effects, custom animations
- **Accessibility**: Semantic HTML, keyboard navigation, proper ARIA labels

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **Typography**: Work Sans font family
- **Icons**: Heroicons (via inline SVG)
- **Language**: TypeScript

## Design System

The design follows the specifications in `design.json`:

- **Colors**: Dark theme with purple/teal gradient accents
- **Typography**: Work Sans with responsive text sizing
- **Components**: Glass morphism cards, gradient buttons, curved timeline
- **Layout**: Max-width containers with consistent spacing

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/lead/route.ts    # Email collection API
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main landing page
├── components/
│   ├── Navigation.tsx       # Header navigation with mobile menu
│   ├── Hero.tsx             # Hero section with email signup
│   ├── TimelineCurve.tsx    # Animated process timeline
│   ├── FeatureCards.tsx     # Product kit showcase
│   ├── HowItWorks.tsx       # Step-by-step process
│   ├── FAQ.tsx              # Collapsible FAQ section
│   └── Footer.tsx           # Footer with links
├── design.json              # Design system specifications
└── tailwind.config.js       # Tailwind configuration
```

## Components

### Navigation
- Fixed header with logo and navigation links
- Dropdown menus for Product and Resources
- Mobile hamburger menu
- CTA buttons for login and signup

### Hero
- Full-screen hero with gradient background
- Animated blur blob effects
- Email collection form
- Responsive typography

### Timeline Curve
- SVG-based curved timeline visualization
- Gradient stroke with animated dots
- Four-step process explanation

### Feature Cards
- Product showcase with glass morphism cards
- Hover effects and animations
- Bullet point lists with checkmarks
- Call-to-action buttons

### How It Works
- Four-step process with numbered circles
- Responsive grid layout
- Hover animations

### FAQ
- Collapsible accordion interface
- Smooth expand/collapse animations
- Glass morphism styling

### Footer
- Multi-column link organization
- Contact information
- Copyright notice

## Customization

The design system is defined in `design.json` and implemented through:

1. **Tailwind Config**: Custom colors, spacing, and shadows
2. **CSS Variables**: Dynamic theming support
3. **Component Props**: Easy content updates
4. **Responsive Breakpoints**: Mobile-first responsive design

## API Endpoints

### POST /api/lead
Collects email addresses from the hero signup form.

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "message": "Email registered successfully"
}
```

## Deployment

The app is ready to deploy on Vercel, Netlify, or any platform supporting Next.js:

```bash
npm run build
npm start
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project for Balans.
