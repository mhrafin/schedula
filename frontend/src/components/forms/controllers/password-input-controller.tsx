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
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          <div className="relative">
            <Input
              {...field}
              id={field.name}
              type={showPassword ? "text" : "password"}
              className="pr-11"
              placeholder={placeholder}
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
  );
}

export default PasswordInputController;
