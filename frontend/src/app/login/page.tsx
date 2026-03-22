"use client";

import { CalendarDays, Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

/**
 * Login Page - Midnight Meridian Design System
 * 
 * Design Implementation:
 * - Card-First architecture with surface-container
 * - rounded-xl for major container
 * - shadow-card for elevation
 * - Left-aligned text (per Do's and Don'ts)
 * - Manrope typography hierarchy
 */
export default function LoginPage() {
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const loginFormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginFormSchema>) {
    console.log(data);
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      {/* Card container - Card-First architecture */}
      <div className="bg-surface-container shadow-card rounded-xl p-8 w-full max-w-sm">
        {/* Logo/Brand - centered icon with primary accent */}
        <div className="flex justify-center mb-6">
          <div className="bg-accent rounded-lg p-2.5">
            <CalendarDays className="size-6 text-primary" />
          </div>
        </div>

        {/* Header - left-aligned per design system */}
        <div className="text-left mb-8">
          <h1 className="text-display text-foreground">Welcome Back</h1>
          <p className="text-body-standard text-muted-foreground mt-1">
            Please enter your details to sign in.
          </p>
        </div>

        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            {/* Username Field */}
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your username"
                    aria-invalid={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <p className="text-xs font-medium text-destructive">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      className="pr-11"
                      placeholder="Enter your password"
                      aria-invalid={!!fieldState.error}
                      onChange={(e) => {
                        field.onChange(e);
                        setIsPasswordTyping(e.target.value.length > 0);
                      }}
                    />
                    {isPasswordTyping && (
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <Eye className="size-4" />
                        ) : (
                          <EyeOff className="size-4" />
                        )}
                      </button>
                    )}
                  </div>
                  {fieldState.error && (
                    <p className="text-xs font-medium text-destructive">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Submit Button - Primary with sapphire glow */}
            <Button type="submit" form="login-form" className="w-full mt-2">
              Sign In
            </Button>
          </div>
        </form>

        {/* Footer link */}
        <p className="text-body-standard text-muted-foreground text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
