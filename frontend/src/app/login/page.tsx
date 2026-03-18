"use client";

import { CalendarDays, SendHorizontal } from "lucide-react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export default function LoginPage() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    console.log(data);
  }
  return (
    <div className="bg-muted text-primary m-4 p-4 rounded-xl">
      <div className="flex flex-col">
        <div className="bg-accent rounded-md self-center">
          <CalendarDays className="m-1" />
        </div>
        <h1 className="self-center text-2xl">Welcome Back</h1>
        <h2 className="text-center text-[15px] text-muted-foreground">
          Please enter your details to sign in.
        </h2>
      </div>
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 mt-6">
          {/* Username */}
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  {...field}
                  id={field.name}
                  className="mt-1"
                  placeholder="Enter your username"
                />
              </div>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <Label htmlFor="username">Password</Label>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  className="mt-1"
                  placeholder="Enter your password"
                />
              </div>
            )}
          />
          {/* Action Buttons */}
          <div className="flex flex-row mt-1 gap-4 mb-2">
            <div className="flex-1">
              <Button
                type="submit"
                form="login-form"
                variant="outline"
                className="w-full bg-accent"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
