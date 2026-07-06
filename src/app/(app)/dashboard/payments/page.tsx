"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ExternalLink, CheckCircle2 } from "lucide-react";

export default function PaymentsPage() {
  const [connectStatus, setConnectStatus] = useState<"not_started" | "pending" | "active">(
    "not_started"
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Payments</h2>
        <p className="text-muted-foreground">Set up embedded payments to accept customer payments through JobFlow.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stripe Connect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Accept payments directly through JobFlow</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                When a customer pays an invoice through JobFlow, funds land in your Stripe account
                in 1-2 business days. JobFlow charges only 0.5% on top of Stripe&apos;s standard fee.
              </p>
            </div>
            {connectStatus === "active" ? (
              <Badge>
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Active
              </Badge>
            ) : (
              <Button asChild>
                <a href="/api/stripe/connect/onboard">
                  Set up Stripe
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          {connectStatus === "not_started" && (
            <div className="rounded-lg border border-dashed p-6">
              <p className="text-sm text-muted-foreground">
                <strong>How it works:</strong> You complete a quick Stripe Connect onboarding form
                (5 minutes, your business + bank info). Once approved, customers see a &quot;Pay now&quot;
                button on every invoice you send, and can pay via credit card, debit card, ACH,
                Apple Pay, or Google Pay.
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-3">
            <Stat title="Fees" value="0.5% + Stripe's" />
            <Stat title="Payout speed" value="1-2 days" />
            <Stat title="Payment methods" value="Card, ACH, Apple/Google Pay" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent payments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Connect your Stripe account to start seeing payments here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}