import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const invoices = [
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
  {
    id: "INV-2024-003",
    date: "Oct 15, 2024",
    amount: "$29.00",
    status: "Paid",
    description: "Pro Plan - Monthly",
  },
  {
    id: "INV-2024-004",
    date: "Sep 15, 2024",
    amount: "$29.00",
    status: "Paid",
    description: "Pro Plan - Monthly",
  },
]

export function BillingHistory() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Invoice</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Description</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-4">
                    <span className="font-mono text-sm">{invoice.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{invoice.date}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{invoice.description}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium">{invoice.amount}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {invoice.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
