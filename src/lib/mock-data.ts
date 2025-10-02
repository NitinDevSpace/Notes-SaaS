import type { Note, TeamMember, Invoice } from "@/types"

export const mockNotes: Note[] = [
  {
    id: 1,
    title: "Q4 Planning Meeting Notes",
    content:
      "Discussed goals and objectives for Q4. Key focus areas include product development, customer acquisition, and team expansion. Action items assigned to respective team leads.",
    category: "Meetings",
    lastEdited: "2 hours ago",
    author: "John Doe",
    isFavorite: true,
    organizationId: "org_1",
  },
  {
    id: 2,
    title: "Product Roadmap Ideas",
    content:
      "New features to consider for next release: dark mode, advanced search, API integrations, mobile app, and collaboration tools. Need to prioritize based on customer feedback.",
    category: "Product",
    lastEdited: "5 hours ago",
    author: "Jane Smith",
    isFavorite: false,
    organizationId: "org_1",
  },
  {
    id: 3,
    title: "Customer Feedback Summary",
    content:
      "Key insights from customer interviews conducted last week. Users love the simplicity but want more customization options. Performance is excellent. Need better onboarding.",
    category: "Research",
    lastEdited: "1 day ago",
    author: "Mike Johnson",
    isFavorite: true,
    organizationId: "org_1",
  },
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@acme.com",
    role: "Owner",
    status: "Active",
    initials: "JD",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@acme.com",
    role: "Admin",
    status: "Active",
    initials: "JS",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@acme.com",
    role: "Member",
    status: "Active",
    initials: "MJ",
  },
]

export const mockInvoices: Invoice[] = [
  {
    id: "INV-2024-001",
    date: "Dec 15, 2024",
    amount: "$29.00",
    status: "Paid",
    description: "Pro Plan - Monthly",
  },
  {
    id: "INV-2024-002",
    date: "Nov 15, 2024",
    amount: "$29.00",
    status: "Paid",
    description: "Pro Plan - Monthly",
  },
]
