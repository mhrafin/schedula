import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

const CreateMeetingForm = () => {
  return (
    <div className="bg-blue-100 m-2 p-2 rounded-md">
      <h1 className="text-4xl">Create Meeting</h1>
      <h2 className="font-stretch-ultra-condensed text-gray-500">
        Schedule a new session and define the agenda
      </h2>
      <form>
        <div className="flex flex-col gap-4 mt-4">
          {/* Meeting Title */}
          <div>
            <Label htmlFor="meeting-title">Meeting Title</Label>
            <Input id="meeting-title" />
          </div>
          {/* Date */}
          <div>
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input id="date" className="bg-white" type="date" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMeetingForm;
