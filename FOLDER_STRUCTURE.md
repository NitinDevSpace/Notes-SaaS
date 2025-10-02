# Complete Folder Structure

\`\`\`
notes-saas-platform/
├── app/
│   ├── (auth)/                      # Authentication routes (no sidebar)
│   │   ├── sign-in/
│   │   │   └── page.tsx            # Sign in page
│   │   └── sign-up/
│   │       └── page.tsx            # Sign up page
│   │
│   ├── (dashboard)/                 # Dashboard routes (with sidebar)
│   │   ├── layout.tsx              # Dashboard layout with sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Main dashboard
│   │   ├── notes/
│   │   │   ├── page.tsx            # Notes list page
│   │   │   └── loading.tsx         # Loading state
│   │   ├── billing/
│   │   │   └── page.tsx            # Billing & subscription
│   │   └── settings/
│   │       └── page.tsx            # Settings page
│   │
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page (redirects to dashboard)
│   └── globals.css                  # Global styles & theme
│
├── components/
│   ├── auth/
│   │   ├── sign-in-form.tsx        # Sign in form component
│   │   └── sign-up-form.tsx        # Sign up form component
│   │
│   ├── billing/
│   │   ├── pricing-plans.tsx       # Pricing plan cards
│   │   └── billing-history.tsx     # Invoice history table
│   │
│   ├── layout/
│   │   ├── app-sidebar.tsx         # Main sidebar navigation
│   │   └── app-header.tsx          # Top header with search
│   │
│   ├── notes/
│   │   └── note-modal.tsx          # Create/edit note modal
│   │
│   ├── settings/
│   │   └── team-members.tsx        # Team management component
│   │
│   └── ui/                          # Reusable UI components
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── tabs.tsx
│       └── textarea.tsx
│
├── lib/
│   ├── utils.ts                     # Utility functions (cn, etc.)
│   ├── constants.ts                 # App constants
│   ├── mock-data.ts                 # Mock data for development
│   └── utils/
│       └── format.ts                # Formatting utilities
│
├── types/
│   └── index.ts                     # TypeScript type definitions
│
├── hooks/
│   ├── use-mobile.tsx              # Mobile detection hook
│   └── use-toast.ts                # Toast notification hook
│
├── public/                          # Static assets
│
├── .env.example                     # Environment variables template
├── .gitignore
├── next.config.mjs                  # Next.js configuration
├── package.json
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.ts              # Tailwind configuration
├── README.md                        # Project documentation
└── FOLDER_STRUCTURE.md             # This file
\`\`\`

## Route Groups

### (auth)
Routes without the dashboard layout (sidebar/header). Used for authentication pages.

### (dashboard)
Routes with the full dashboard layout including sidebar and header navigation.

## Key Files

- **app/layout.tsx** - Root layout with fonts and analytics
- **app/(dashboard)/layout.tsx** - Dashboard layout with sidebar and header
- **app/globals.css** - Theme variables and Tailwind configuration
- **components/layout/app-sidebar.tsx** - Main navigation sidebar
- **types/index.ts** - All TypeScript type definitions
- **lib/constants.ts** - Application constants and configuration
