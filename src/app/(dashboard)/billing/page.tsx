import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Calendar } from "lucide-react"
import { PricingPlans } from "@/components/billing/pricing-plans"
import { BillingHistory } from "@/components/billing/billing-history"

export default function BillingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the Pro plan</CardDescription>
            </div>
            <Badge className="w-fit">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Monthly Payment</p>
                <p className="text-2xl font-bold mt-1">$29</p>
                <p className="text-xs text-muted-foreground mt-1">per month</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Next Billing Date</p>
                <p className="text-lg font-semibold mt-1">Jan 15, 2025</p>
                <p className="text-xs text-muted-foreground mt-1">Auto-renewal enabled</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Plan Features</p>
                <p className="text-sm text-muted-foreground mt-1">Unlimited notes</p>
                <p className="text-sm text-muted-foreground">Up to 10 team members</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row mt-6">
            <Button variant="outline">Cancel Subscription</Button>
            <Button variant="outline">Update Payment Method</Button>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <PricingPlans />
      </div>

      {/* Billing History */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Billing History</h2>
        <BillingHistory />
      </div>
    </div>
  )
}
