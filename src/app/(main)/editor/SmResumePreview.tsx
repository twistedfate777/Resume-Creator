import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditorProps } from "@/lib/types";
import React from "react";

function SmResumePreview({ resumeData, setResumeData }: EditorProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>see resume preview</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resume Preview</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <ResumePreview resumeData={resumeData} />
        </ScrollArea>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default SmResumePreview;
