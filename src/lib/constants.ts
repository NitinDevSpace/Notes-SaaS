export const APP_NAME = "NotesApp"
export const APP_DESCRIPTION = "Modern team note management platform"

export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  NOTES: "/notes",
  BILLING: "/billing",
  SETTINGS: "/settings",
} as const

export const NOTE_CATEGORIES = ["Meetings", "Product", "Research", "Marketing", "Engineering", "General"] as const

export const USER_ROLES = {
  OWNER: "Owner",
  ADMIN: "Admin",
  MEMBER: "Member",
} as const

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    features: ["Up to 10 notes", "1 team member", "Basic support", "7-day history"],
  },
  PRO: {
    name: "Pro",
    price: 29,
    features: [
      "Unlimited notes",
      "Up to 10 team members",
      "Priority support",
      "Unlimited history",
      "Advanced analytics",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: 99,
    features: [
      "Unlimited everything",
      "Unlimited team members",
      "24/7 dedicated support",
      "Custom integrations",
      "Advanced security",
      "SLA guarantee",
    ],
  },
} as const
