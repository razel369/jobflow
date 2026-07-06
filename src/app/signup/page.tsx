import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wrench } from "lucide-react";
import Link from "next/link";
import { signupAction } from "./actions";

export const metadata = {
  title: "Sign up — JobFlow",
  description: "Start your 14-day free trial of JobFlow. No credit card required.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const errorMessage = sp.error
    ? sp.error === "email_taken"
      ? "An account with this email already exists."
      : "Please check your inputs and try again."
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">JobFlow</span>
          </Link>
          <CardTitle className="mt-4">Start your 14-day free trial</CardTitle>
          <p className="text-sm text-muted-foreground">
            No credit card required. Cancel anytime.
          </p>
        </CardHeader>
        <CardContent>
          <form action={signupAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company name</Label>
              <Input id="companyName" name="companyName" placeholder="Cool Air HVAC" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Your name</Label>
              <Input id="fullName" name="fullName" placeholder="Mike Rodriguez" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" name="email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password (min 8 chars)</Label>
              <Input id="password" name="password" type="password" minLength={8} required />
            </div>
            {errorMessage && (
              <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{errorMessage}</p>
            )}
            <Button type="submit" className="w-full">
              Create free account
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/legal/terms" className="underline">Terms</Link> and{" "}
            <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}