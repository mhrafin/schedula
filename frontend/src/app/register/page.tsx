"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CalendarDays } from "lucide-react";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import * as z from "zod";

import PasswordInputController from "@/components/forms/controllers/password-input-controller";
import TextInputController from "@/components/forms/controllers/text-input-controller";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const registerFormSchema = z
  .object({
    email: z.email({ error: "Invalid email format." }),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

interface ApiErrorPayload {
  [fieldName: string]: string | string[];
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isApiErrorPayload(value: unknown): value is ApiErrorPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  return Object.values(value).every(
    (fieldError) => typeof fieldError === "string" || isStringArray(fieldError),
  );
}

export default function RegisterPage() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: RegisterFormValues): Promise<void> {
    try {
      await api.post("/auth/users/", {
        email: data.email,
        username: data.username,
        password: data.password,
      });
      toast.success("Account created. You can sign in now.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;

        if (isApiErrorPayload(errorData)) {
          Object.values(errorData).forEach((fieldErrors) => {
            if (typeof fieldErrors === "string") {
              toast.error(fieldErrors);
              return;
            }

            fieldErrors.forEach((message) => toast.error(message));
          });
          return;
        }
      }

      toast.error("An error occurred during registration.");
    }
  }

  return (
    <div className="min-h-screen bg-surface p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col overflow-hidden rounded-xl bg-surface-container shadow-card md:min-h-[calc(100vh-3rem)] lg:min-h-0 lg:flex-row">
        <section className="relative flex min-h-[320px] flex-1 items-end lg:min-h-full lg:max-w-[52%]">
          <div className="absolute inset-0 bg-[url(/register/register.jpg)] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-primary opacity-90" />
          <div className="relative z-10 flex w-full flex-col gap-6 p-8 text-primary-foreground sm:p-10">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-8" />
              <h1 className="text-display">Schedula</h1>
            </div>

            <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
              Master your schedule, effortlessly
            </h2>

            <p className="max-w-xl text-body-standard text-primary-foreground/90">
              Join thousands of professionals who save hours every week by
              eliminating scheduling conflicts and endless email chains.
            </p>

            <div className="mt-2 flex items-center">
              <AvatarGroup className="mr-4 -space-x-3 *:data-[slot=avatar]:ring-primary-foreground/70">
                <Avatar>
                  <AvatarImage src="/register/avatar1.jpg" alt="Amanda C" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="/register/avatar2.jpg"
                    alt="Leo R"
                    className="object-cover object-center"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/register/avatar3.jpg" alt="Emi R" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <p className="text-body-standard text-primary-foreground/90">
                Over 50,000+ users
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-1 flex-col justify-center bg-surface-container p-8 sm:p-10">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-display text-foreground">
              Create your account
            </h2>
            <p className="text-body-standard text-muted-foreground">
              Start scheduling meetings without the hassle.
            </p>
          </div>

          <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <TextInputController
                control={form.control}
                name="username"
                placeholder="Enter username"
                label="Username"
              />

              <TextInputController
                control={form.control}
                name="email"
                placeholder="Enter your email"
                label="Email"
              />

              <PasswordInputController control={form.control} name="password" />

              <PasswordInputController
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
              />

              <Button
                type="submit"
                form="register-form"
                className="w-full mt-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Creating account..."
                  : "Create Account"}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-body-standard text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
