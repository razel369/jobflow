import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FileText, DollarSign } from "lucide-react";
import { getDashboardStats } from "./queries";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Jobs today"
          value={stats.jobsToday.toString()}
          icon={<Calendar className="h-5 w-5" />}
          trend="+12% vs yesterday"
        />
        <StatCard
          title="Customers"
          value={stats.customers.toString()}
          icon={<Users className="h-5 w-5" />}
          trend={`${stats.newCustomersThisWeek} new this week`}
        />
        <StatCard
          title="Outstanding invoices"
          value={stats.outstandingInvoices.toString()}
          icon={<FileText className="h-5 w-5" />}
          trend={`$${stats.outstandingAmount.toLocaleString()} due`}
        />
        <StatCard
          title="Revenue (MTD)"
          value={`$${stats.revenueMtd.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5" />}
          trend="+24% vs last month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.upcomingJobs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming jobs scheduled.</p>
            ) : (
              <ul className="space-y-3">
                {stats.upcomingJobs.map((job) => (
                  <li
                    key={job.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {new Date(job.scheduledStart).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                      <Badge variant="secondary" className="mt-1">{job.status}</Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {stats.recentActivity.map((activity) => (
                <li key={activity.id} className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p>{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="rounded-md bg-primary/10 p-2 text-primary">{icon}</div>
        </div>
        <p className="mt-3 text-2xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  );
}