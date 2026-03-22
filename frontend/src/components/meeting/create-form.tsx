import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Video, SendHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Create Meeting Form - Midnight Meridian Design System
 * 
 * Design Implementation:
 * - Card-First architecture with surface-container
 * - Tonal layering: form fields use surface-container-high on hover
 * - rounded-xl for container, rounded-lg for internal components
 * - shadow-card for elevation
 * - Left-aligned text with proper typography hierarchy
 * - Primary button with Shadow-LG for submit action
 */
const CreateMeetingForm = () => {
  return (
    <div className="min-h-screen bg-surface p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Card container - Card-First architecture */}
        <div className="bg-surface-container shadow-card rounded-xl p-6 md:p-8">
          {/* Header - left-aligned per design system */}
          <div className="mb-8">
            <h1 className="text-display text-foreground">Create Meeting</h1>
            <p className="text-body-standard text-muted-foreground mt-1">
              Schedule a new session and define the agenda.
            </p>
          </div>

          <form>
            <div className="flex flex-col gap-6">
              {/* Meeting Title */}
              <div className="space-y-2">
                <Label htmlFor="meeting-title">Meeting Title</Label>
                <Input
                  id="meeting-title"
                  placeholder="e.g., Q4 Product Roadmap Review"
                />
              </div>

              {/* Date and Time Row - responsive grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>

                {/* Start Time */}
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input id="start-time" type="time" />
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input id="end-time" type="time" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add agenda or meeting notes..."
                />
              </div>

              {/* Location - with icon */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <Video className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="location"
                    className="pl-10"
                    placeholder="Link or room location"
                  />
                </div>
              </div>

              {/* Action Buttons - Primary submit with elevated shadow */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <Button type="reset" variant="outline" className="sm:flex-1">
                  <X className="size-4 flex-none" />
                  Cancel
                </Button>
                <Button type="submit" className="sm:flex-1">
                  <SendHorizontal className="size-4 flex-none" />
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMeetingForm;
