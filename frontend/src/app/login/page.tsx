"use client";

import { CalendarDays, Eye, EyeOff, SendHorizontal } from "lucide-react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function LoginPage() {
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
                <div className="relative mt-1">
                  <Input
                    {...field}
                    id={field.name}
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                    placeholder="Enter your password"
                    onChange={(e) => {
                      field.onChange(e);
                      setIsPasswordTyping(e.target.value.length > 0);
                    }}
                  />
                  {isPasswordTyping && (
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                  )}
                </div>
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
