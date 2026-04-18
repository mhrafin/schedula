import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

/**
 * Home Page - Midnight Meridian Design System
 * 
 * Simple landing page showcasing the design system
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-surface-container shadow-card rounded-xl p-8 max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-primary rounded-xl p-4">
            <CalendarDays className="size-10 text-white" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-display text-foreground mb-2">Schedula</h1>
        <p className="text-body-standard text-muted-foreground mb-8">
          Master your schedule, effortlessly
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Create Account</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/meeting/create">Create Meeting</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
