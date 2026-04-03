"use client";

import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarDays, Divide } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Username from "@/components/forms/controllers/username"

const registerFormSchema = z.object({
  email: z.string(),
  username: z.string().min(1, "Username is required"),
  password: z.string(),
  confirm_pass: z.string(),
});

export default function RegisterPage() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  function onSubmit(data: z.infer<typeof registerFormSchema>) {
    console.log(data);
  }

  return (
    <div className="bg-surface">
      <div className="m-4 rounded-xl flex flex-row bg-surface-container h-dvh">
        <div className="relative flex items-center w-1/2">
          <div className="bg-[url(/register/register.jpg)] bg-center bg-cover h-full w-full rounded-tl-2xl rounded-bl-2xl opacity-80 absolute" />
          <div className="bg-gradient-primary opacity-90 h-full w-full rounded-tl-xl rounded-bl-xl"></div>
          <div className="absolute flex flex-col gap-6 p-10 z-10 text-primary-foreground">
            <div className="flex flex-row items-center mb-8">
              <CalendarDays className="size-8 mr-2" />
              <h1 className="text-4xl text-dispay">Schedula</h1>
            </div>
            <h3 className="text-4xl font-bold">
              Master your schedule, effortlessly
            </h3>
            <p>
              Join thousands of professionals who save hours every week by
              eliminating scheduling conflicts and endless email chains.
            </p>
            <div className="flex flex-row items-center mt-8">
              <AvatarGroup className="mr-4">
                <Avatar>
                  <AvatarImage src="/register/avatar1.jpg" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="/register/avatar2.jpg"
                    alt="@maxleiter"
                    className="object-cover object-center"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/register/avatar3.jpg" alt="@evilrabbit" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <p className="text-sm">Over 50,000+ users</p>
            </div>
          </div>
        </div>
        <div className="flex-1 p-8 mt-10">
          <div className="flex flex-col mb-10 gap-2">
            <h2 className="text-4xl">Create Your Account</h2>
            <h3>Start scheduling meetings without the hassle.</h3>
          </div>
          <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter a username"
                    />
                  </div>
                )}
              /> */}
              <Username control={form.control} name={"username"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
