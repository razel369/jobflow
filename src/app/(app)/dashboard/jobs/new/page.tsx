import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createJob } from "../actions";
import Link from "next/link";

export default function NewJobPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/dashboard/jobs" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to jobs
        </Link>
        <h2 className="mt-2 text-2xl font-bold">New job</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createJob} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer</Label>
              <select
                id="customerId"
                name="customerId"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select a customer</option>
                <option value="1">Smith Residence</option>
                <option value="2">Johnson Family</option>
                <option value="3">Garcia Property</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Job title</Label>
              <Input id="title" name="title" placeholder="AC tune-up" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="jobType">Type</Label>
                <select
                  id="jobType"
                  name="jobType"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="repair">Repair</option>
                  <option value="install">Install</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inspection">Inspection</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  name="priority"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="low">Low</option>
                  <option value="normal" defaultChecked>Normal</option>
                  <option value="high">High</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledStart">Scheduled date & time</Label>
              <Input
                id="scheduledStart"
                name="scheduledStart"
                type="datetime-local"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated hours</Label>
                <Input
                  id="estimatedHours"
                  name="estimatedHours"
                  type="number"
                  step="0.25"
                  min="0"
                  defaultValue="2"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly rate ($)</Label>
                <Input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  step="0.01"
                  defaultValue="125"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Describe the issue or work to be done..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit">Create job</Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/jobs">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}