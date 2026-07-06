import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wrench } from "lucide-react";
import Link from "next/link";
import { loginAction } from "./actions";

export const metadata = {
  title: "Log in — JobFlow",
  description: "Log in to your JobFlow account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; return?: string }>;
}) {
  const sp = await searchParams;
  const errorMessage = sp.error
    ? "Invalid email or password."
    : null;
  const returnTo = sp.return || "/dashboard";

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
          <CardTitle className="mt-4">Log in to JobFlow</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="return" value={returnTo} />
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            {errorMessage && (
              <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{errorMessage}</p>
            )}
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up free
            </Link>
          </p>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            <strong>Demo account:</strong> demo@jobflow.app / password123
          </p>
        </CardContent>
      </Card>
    </main>
  );
}