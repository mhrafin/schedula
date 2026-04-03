import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, Path, type Control, type FieldValues } from "react-hook-form";

function Username<T extends FieldValues>({ control, name }: { control: Control<T>, name: Path<T> }) {
    return (<Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <div>
                <Label htmlFor={name}>Username</Label>
                <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter a username"
                />
            </div>
        )}
    />)
}

export default Username