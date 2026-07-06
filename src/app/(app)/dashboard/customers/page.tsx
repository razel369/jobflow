import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const MOCK_CUSTOMERS = [
  {
    id: "1",
    name: "Smith Residence",
    phone: "(555) 123-4567",
    email: "smith@example.com",
    city: "Houston",
    state: "TX",
    systemType: "Central AC + Furnace",
    systemBrand: "Trane",
    jobsCount: 12,
    lifetimeValue: 4250,
  },
  {
    id: "2",
    name: "Johnson Family",
    phone: "(555) 234-5678",
    email: "johnson@example.com",
    city: "Houston",
    state: "TX",
    systemType: "Heat Pump",
    systemBrand: "Carrier",
    jobsCount: 7,
    lifetimeValue: 2890,
  },
  {
    id: "3",
    name: "Garcia Property",
    phone: "(555) 345-6789",
    email: "garcia@example.com",
    city: "Sugar Land",
    state: "TX",
    systemType: "Central AC",
    systemBrand: "Lennox",
    jobsCount: 4,
    lifetimeValue: 1650,
  },
  {
    id: "4",
    name: "Lee Residence",
    phone: "(555) 456-7890",
    email: null,
    city: "Katy",
    state: "TX",
    systemType: "Mini-Split",
    systemBrand: "Mitsubishi",
    jobsCount: 2,
    lifetimeValue: 580,
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customers</h2>
          <p className="text-muted-foreground">HVAC customers and property records.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/customers/new">
            <Plus className="mr-2 h-4 w-4" />
            New customer
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MOCK_CUSTOMERS.map((customer) => (
          <Card key={customer.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{customer.name}</h3>
                  <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </div>
                    {customer.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {customer.city}, {customer.state}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">${customer.lifetimeValue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">LTV</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <div>
                  <Badge variant="outline">{customer.systemBrand}</Badge>
                  <p className="mt-1 text-xs text-muted-foreground">{customer.systemType}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {customer.jobsCount} jobs
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}