"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamMembers } from "@/components/settings/team-members"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const [orgName, setOrgName] = useState("Acme Inc.")
  const [orgEmail, setOrgEmail] = useState("contact@acme.com")
  const [orgWebsite, setOrgWebsite] = useState("https://acme.com")

  const handleSaveOrg = () => {
    // Save organization settings
    console.log("Saving organization settings...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your organization and team settings</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Organization Tab */}
        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
              <CardDescription>Update your organization's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-email">Contact Email</Label>
                <Input id="org-email" type="email" value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-website">Website</Label>
                <Input id="org-website" type="url" value={orgWebsite} onChange={(e) => setOrgWebsite(e.target.value)} />
              </div>
              <Button onClick={handleSaveOrg}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization ID</CardTitle>
              <CardDescription>Your unique organization identifier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono">org_2NxKj8fH3kL9mP4qR7sT</code>
                <Button variant="outline" size="sm">
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Organization</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your organization and all data</p>
                </div>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Members Tab */}
        <TabsContent value="team">
          <TeamMembers />
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the app looks for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start bg-transparent">
                    Light
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    Dark
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email updates about your notes</p>
                </div>
                <Button variant="outline" size="sm">
                  Enabled
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Desktop Notifications</p>
                  <p className="text-sm text-muted-foreground">Get browser notifications for updates</p>
                </div>
                <Button variant="outline" size="sm">
                  Disabled
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
