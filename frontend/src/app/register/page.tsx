"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarDays } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"

const registerFormSchema = z.object({});

export default function RegisterPage() {
  const form = useForm<z.infer<typeof registerFormSchema>>({});
  return (
    <div className="bg-surface">
      <div className="m-4 rounded-xl flex flex-row bg-surface-container">
        <div className="relative flex items-center">
          <div className="bg-[url(/register/register.jpg)] bg-center bg-cover h-dvh w-dvh  rounded-tl-2xl rounded-bl-2xl opacity-80 absolute" />
          <div className="absolute flex flex-col gap-6 p-8 z-10 text-white">
            <div className="flex flex-row items-center mb-8">
              <CalendarDays className="size-10 mr-2" />
              <h3 className="text-5xl text-dispay">Schedula</h3>
            </div>
            <h3 className="text-4xl font-bold">
              Master your schedule, effortlessly
            </h3>
            <p className="text-2xl">
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
                  <AvatarImage src="/register/avatar2.jpg" alt="@maxleiter" className="object-cover object-center" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="/register/avatar3.jpg"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <p className="text-sm">Over 50,000+ users</p>
            </div>

          </div>
          <div className="bg-gradient-primary opacity-90 h-dvh w-dvh rounded-tl-xl rounded-bl-xl "></div>
        </div>
        <div>Register Form</div>
      </div>
    </div>
  );
}
