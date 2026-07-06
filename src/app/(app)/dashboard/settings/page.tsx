import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Manage your company and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company name</Label>
            <Input id="companyName" defaultValue="Cool Air HVAC" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <select
              id="timezone"
              defaultValue="America/New_York"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="America/New_York">Eastern (ET)</option>
              <option value="America/Chicago">Central (CT)</option>
              <option value="America/Denver">Mountain (MT)</option>
              <option value="America/Phoenix">Arizona (no DST)</option>
              <option value="America/Los_Angeles">Pacific (PT)</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Default hourly rate ($)</Label>
            <Input id="hourlyRate" type="number" step="0.01" defaultValue="125" />
          </div>
          <Button>Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Pro plan</p>
                <p className="text-sm text-muted-foreground">$99/month · 10 technicians</p>
              </div>
              <Button variant="outline">Manage subscription</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}