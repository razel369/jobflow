import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Jobs</h2>
          <p className="text-muted-foreground">Schedule and manage HVAC service jobs.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            New job
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: "1", time: "9:00 AM", title: "AC tune-up", customer: "Smith Residence", tech: "Mike R.", status: "completed" },
              { id: "2", time: "11:30 AM", title: "Furnace diagnostic", customer: "Johnson Family", tech: "Sarah T.", status: "in_progress" },
              { id: "3", time: "2:00 PM", title: "Heat pump install", customer: "Garcia Property", tech: "James L.", status: "scheduled" },
              { id: "4", time: "4:30 PM", title: "Refrigerant top-up", customer: "Lee Residence", tech: "Mike R.", status: "scheduled" },
            ].map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-semibold">{job.time}</p>
                  </div>
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.customer}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        View on map
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        Call
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{job.tech}</p>
                  <Badge
                    variant={job.status === "completed" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {job.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}