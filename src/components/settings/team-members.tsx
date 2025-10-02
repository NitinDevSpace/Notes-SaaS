"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { UserPlus, MoreVertical, Mail, Shield, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Member = {
  id: number
  name: string
  email: string
  role: "Owner" | "Admin" | "Member"
  status: "Active" | "Pending"
  initials: string
}

const initialMembers: Member[] = [
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
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@acme.com",
    role: "Member",
    status: "Active",
    initials: "SW",
  },
  {
    id: 5,
    name: "Alex Chen",
    email: "alex@acme.com",
    role: "Member",
    status: "Pending",
    initials: "AC",
  },
]

export function TeamMembers() {
  const [members] = useState<Member[]>(initialMembers)
  const [inviteEmail, setInviteEmail] = useState("")

  const handleInvite = () => {
    console.log("Inviting:", inviteEmail)
    setInviteEmail("")
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Owner":
        return <Shield className="w-4 h-4" />
      case "Admin":
        return <Shield className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleBadgeVariant = (role: string): "default" | "secondary" => {
    return role === "Owner" || role === "Admin" ? "default" : "secondary"
  }

  return (
    <div className="space-y-6">
      {/* Invite Member */}
      <Card>
        <CardHeader>
          <CardTitle>Invite Team Member</CardTitle>
          <CardDescription>Add new members to your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="email@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button onClick={handleInvite}>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({members.length})</CardTitle>
          <CardDescription>Manage your organization's team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50"
              >
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">{member.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{member.name}</p>
                    <Badge variant={getRoleBadgeVariant(member.role)} className="gap-1">
                      {getRoleIcon(member.role)}
                      {member.role}
                    </Badge>
                    {member.status === "Pending" && <Badge variant="outline">Pending</Badge>}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>
                {member.role !== "Owner" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
