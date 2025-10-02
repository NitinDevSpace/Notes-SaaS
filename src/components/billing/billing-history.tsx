import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, CheckCircle, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BillingItem {
  id: string
  date: string
  description: string
  amount: string
  status: string
}

interface BillingHistoryProps {
  billingData: BillingItem[]
}

export function BillingHistory({ billingData }: BillingHistoryProps) {
  if (billingData.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-1">No billing history found</p>
          <p className="text-sm text-muted-foreground">Once you have payments, they will appear here.</p>
        </CardContent>
      </Card>
    )
  }

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
              {billingData.map((invoice) => (
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
