import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out",
    features: ["Up to 10 notes", "1 team member", "Basic support", "7-day history"],
    current: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing teams",
    features: [
      "Unlimited notes",
      "Up to 10 team members",
      "Priority support",
      "Unlimited history",
      "Advanced analytics",
    ],
    current: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large organizations",
    features: [
      "Unlimited everything",
      "Unlimited team members",
      "24/7 dedicated support",
      "Custom integrations",
      "Advanced security",
      "SLA guarantee",
    ],
    current: false,
  },
]

export function PricingPlans() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.name} className={plan.popular ? "border-primary shadow-lg" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>{plan.name}</CardTitle>
              {plan.popular && <Badge>Popular</Badge>}
              {plan.current && <Badge variant="secondary">Current Plan</Badge>}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== "$0" && <span className="text-muted-foreground">/month</span>}
            </div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={plan.current ? "outline" : "default"} disabled={plan.current}>
              {plan.current ? "Current Plan" : "Upgrade"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
