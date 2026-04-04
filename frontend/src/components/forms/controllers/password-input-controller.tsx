"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Divide, Eye, EyeOff } from "lucide-react";
import {
  Controller,
  Path,
  type Control,
  type FieldValues,
} from "react-hook-form";

function PasswordInputController<T extends FieldValues>({
  control,
  name,
  placeholder = "Enter password",
  label = "Password",
}: {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  label?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Label htmlFor={name}>{label}</Label>
          <div>
            <Input />
          </div>
        </div>
      )}
    />
  );
}
