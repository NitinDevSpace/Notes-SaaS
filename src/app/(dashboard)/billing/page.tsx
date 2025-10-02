"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import useUser from '@/hooks/useUser'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, CreditCard, Calendar } from 'lucide-react'
import { PricingPlans } from '@/components/billing/pricing-plans'
import { BillingHistory } from '@/components/billing/billing-history'

export default function BillingPage() {
  const { user, isLoading: userLoading } = useUser()
  const [currentPlan, setCurrentPlan] = useState<any>(null)
  const [billingHistory, setBillingHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchBillingData = async () => {
      setLoading(true)
      try {
        // Get user's org_id
        const { data: memberData, error: memberError } = await supabase.from('members').select('org_id').eq('user_id', user.id).single()
        if (memberError || !memberData) throw memberError || new Error('No organization found')
        const orgId = memberData.org_id

        // Fetch current subscription
        const { data: subscriptionData, error: subscriptionError } = await supabase.from('subscriptions').select('*').eq('org_id', orgId).single()
        if (subscriptionError) throw subscriptionError

        setCurrentPlan(subscriptionData || {
          plan_name: 'Free',
          price: 0,
          billing_period: 'Monthly',
          next_billing_date: null,
          features: ['Limited notes', 'Up to 3 team members']
        })

        // Fetch billing history
        const { data: historyData } = await supabase.from('billing_history').select('*').eq('org_id', orgId).order('created_at', { ascending: false })
        setBillingHistory(historyData || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBillingData()
  }, [user])

  if (userLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

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
              <CardDescription>You are currently on the {currentPlan?.plan_name} plan</CardDescription>
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
                <p className="text-2xl font-bold mt-1">${currentPlan?.price}</p>
                <p className="text-xs text-muted-foreground mt-1">per {currentPlan?.billing_period || 'month'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Next Billing Date</p>
                <p className="text-lg font-semibold mt-1">{currentPlan?.next_billing_date || 'N/A'}</p>
                <p className="text-xs text-muted-foreground mt-1">Auto-renewal {currentPlan?.next_billing_date ? 'enabled' : 'disabled'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Plan Features</p>
                {currentPlan?.features?.map((f: string, idx: number) => (
                  <p key={idx} className="text-sm text-muted-foreground">{f}</p>
                ))}
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
        <BillingHistory billingData={billingHistory} />
      </div>
    </div>
  )
}
