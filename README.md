# NotesApp - Multi-Tenant SaaS Notes Platform

A modern, full-featured SaaS application for team note management built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Authentication
- Sign up with organization creation
- Sign in with email/password
- Password recovery flow
- Multi-tenant architecture

### Dashboard
- Overview statistics (notes, team members, projects)
- Recent activity feed
- Quick action shortcuts
- Responsive design

### Notes Management
- Create, edit, and delete notes
- Category organization
- Search and filter functionality
- Favorite notes
- Rich text content
- Real-time collaboration ready

### Billing & Subscriptions
- Multiple pricing tiers (Free, Pro, Enterprise)
- Subscription management
- Payment method updates
- Billing history with downloadable invoices
- Usage tracking

### Settings & Team Management
- Organization profile management
- Team member invitations
- Role-based access control (Owner, Admin, Member)
- User preferences
- Notification settings
- Theme customization

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI + shadcn/ui
- **Icons:** Lucide React
- **Fonts:** Geist Sans & Geist Mono

## Project Structure

\`\`\`
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── notes/
│   │   ├── billing/
│   │   └── settings/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── auth/
│   ├── billing/
│   ├── layout/
│   ├── notes/
│   ├── settings/
│   └── ui/
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
└── hooks/
\`\`\`

## Getting Started

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Key Components

### Layout Components
- `AppSidebar` - Responsive sidebar navigation with mobile menu
- `AppHeader` - Top header with search and notifications

### Feature Components
- `SignInForm` / `SignUpForm` - Authentication forms
- `NoteModal` - Create/edit note dialog
- `PricingPlans` - Subscription plan cards
- `TeamMembers` - Team management interface

### UI Components
All UI components are built with Radix UI primitives and styled with Tailwind CSS:
- Button, Card, Input, Label
- Dialog, DropdownMenu, Select
- Badge, Avatar, Tabs
- And more...

## Customization

### Theme
Edit `app/globals.css` to customize the color scheme. The app uses CSS variables for theming with support for light and dark modes.

### Branding
- Update the logo in `components/layout/app-sidebar.tsx`
- Modify organization name and metadata in `app/layout.tsx`

## Database Integration

This project is ready for database integration. Add your preferred database:
- Supabase (recommended for auth + database)
- Neon (PostgreSQL)
- PlanetScale (MySQL)

Update the mock data in pages with real API calls to your backend.

## Deployment

Deploy to Vercel with one click:

\`\`\`bash
vercel deploy
\`\`\`

Or use the Vercel dashboard to connect your GitHub repository.

## Environment Variables

Create a `.env.local` file:

\`\`\`env
# Database
DATABASE_URL=your_database_url

# Authentication (if using external provider)
AUTH_SECRET=your_auth_secret

# Stripe (for payments)
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
\`\`\`

## License

MIT License - feel free to use this project for your own SaaS applications.
