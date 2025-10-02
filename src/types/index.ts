export type User = {
  id: string
  name: string
  email: string
  organizationId: string
}

export type Organization = {
  id: string
  name: string
  email: string
  website?: string
}

export type Note = {
  id: number
  title: string
  content: string
  category: string
  lastEdited: string
  author: string
  isFavorite: boolean
  organizationId: string
}

export type TeamMember = {
  id: number
  name: string
  email: string
  role: "Owner" | "Admin" | "Member"
  status: "Active" | "Pending"
  initials: string
}

export type Subscription = {
  id: string
  plan: "Free" | "Pro" | "Enterprise"
  status: "Active" | "Cancelled" | "Past Due"
  currentPeriodEnd: string
  amount: number
}

export type Invoice = {
  id: string
  date: string
  amount: string
  status: "Paid" | "Pending" | "Failed"
  description: string
}
