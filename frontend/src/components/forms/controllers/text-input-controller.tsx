import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Controller,
  Path,
  type Control,
  type FieldValues,
} from "react-hook-form";

function TextInputController<T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
}: {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  label: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Label htmlFor={name}>{label}</Label>
          <Input {...field} id={field.name} placeholder={placeholder} />
        </div>
      )}
    />
  );
}

export default TextInputController;
