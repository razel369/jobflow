import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign } from "lucide-react";
import Link from "next/link";

const MOCK_INVOICES = [
  {
    id: "1",
    number: "INV-1042",
    customer: "Smith Residence",
    amount: 487.5,
    status: "paid",
    issueDate: "2026-07-01",
    dueDate: "2026-07-15",
  },
  {
    id: "2",
    number: "INV-1043",
    customer: "Johnson Family",
    amount: 1280.0,
    status: "sent",
    issueDate: "2026-07-02",
    dueDate: "2026-07-16",
  },
  {
    id: "3",
    number: "INV-1044",
    customer: "Garcia Property",
    amount: 215.0,
    status: "overdue",
    issueDate: "2026-06-20",
    dueDate: "2026-07-04",
  },
  {
    id: "4",
    number: "INV-1045",
    customer: "Lee Residence",
    amount: 695.0,
    status: "paid",
    issueDate: "2026-07-03",
    dueDate: "2026-07-17",
  },
];

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-muted-foreground">Track HVAC service invoices and payments.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/invoices/new">
            <Plus className="mr-2 h-4 w-4" />
            New invoice
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat title="Total outstanding" value="$2,295" subtitle="3 unpaid invoices" />
        <Stat title="Paid this month" value="$14,628" subtitle="22 invoices" />
        <Stat title="Average days to pay" value="9.4 days" subtitle="vs 21.2 industry avg" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {MOCK_INVOICES.map((inv) => (
              <Link
                key={inv.id}
                href={`/dashboard/invoices/${inv.id}`}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent"
              >
                <div>
                  <p className="font-medium">{inv.number}</p>
                  <p className="text-sm text-muted-foreground">{inv.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${inv.amount.toLocaleString()}</p>
                  <Badge
                    variant={
                      inv.status === "paid"
                        ? "default"
                        : inv.status === "overdue"
                        ? "destructive"
                        : "secondary"
                    }
                    className="mt-1"
                  >
                    {inv.status}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-2 text-2xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}