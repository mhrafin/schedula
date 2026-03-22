"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarDays } from "lucide-react";

const registerFormSchema = z.object({});

export default function RegisterPage() {
  const form = useForm<z.infer<typeof registerFormSchema>>({});
  return (
    <div className="m-4 p-4 rounded-xl flex flex-row">
      <div className="relative flex items-center">
        <div className="bg-[url(/register/register.jpg)] bg-center bg-cover h-dvh w-dvh  rounded-tl-2xl rounded-bl-2xl opacity-80 absolute" />
        <div className="absolute flex flex-col gap-4 p-8">
          <div className="flex flex-row items-center mb-8">
            <CalendarDays className="size-10 mr-2" />
            <h3 className="text-5xl">Schedula</h3>
          </div>
          <h3 className="text-4xl font-bold">
            Master your schedule, effortlessly
          </h3>
          <p className="text-2xl">
            Join thousands of professionals who save hours every week by
            eliminating scheduling conflicts and endless email chains.
          </p>
        </div>
        <div className="bg-primary h-dvh w-dvh mask-t-from-0% rounded-tl-2xl rounded-bl-2xl "></div>
      </div>
      <div>Register Form</div>
    </div>
  );
}
