import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

const CreateMeetingForm = () => {
  return (
    <div className="bg-blue-100 m-2 p-2 rounded-md">
      <h1 className="text-3xl font-semibold">Create Meeting</h1>
      <h2 className="font-stretch-ultra-condensed text-gray-500">
        Schedule a new session and define the agenda.
      </h2>
      <form>
        <div className="flex flex-col gap-4 mt-4">
          {/* Meeting Title */}
          <div>
            <Label htmlFor="meeting-title">Meeting Title</Label>
            <div>
              <Input
                id="meeting-title"
                className="bg-white mt-1"
                placeholder="e.g., Q4 Product Roadmap Review"
              />
            </div>
          </div>
          {/* Date */}
          <div>
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input id="date" className="bg-white mt-1" type="date" />
            </div>
          </div>
          {/* Start Time */}
          <div>
            <Label htmlFor="start-time">Start Time</Label>
            <div>
              <Input id="start-time" className="bg-white mt-1" type="time" />
            </div>
          </div>
          {/* End Time */}
          <div>
            <Label htmlFor="end-time">End Time</Label>
            <div>
              <Input id="end-time" className="bg-white mt-1" type="time" />
            </div>
          </div>
          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <div>
              <Textarea
                id="description"
                className="bg-white mt-1"
                placeholder="Add agenda or meeting notes..."
              />
            </div>
          </div>
          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative mt-1">
              <Input
                id="location"
                className="bg-white pl-10"
                placeholder="Link or room location"
              />
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none" />
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-row mt-1 gap-4">
            <div className="flex-1">
              <Button type="submit" variant="outline" className="w-full">
                <SendHorizontal className="size-4 flex-none" />
                Schedule Meeting
              </Button>
            </div>

            <Button type="button" variant="outline">Cancel</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMeetingForm;
