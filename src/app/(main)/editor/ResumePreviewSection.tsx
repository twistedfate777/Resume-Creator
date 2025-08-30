import ColorPicker from "@/components/ColorPicker";
import ResumePreview from "@/components/ResumePreview";
import useSave from "@/hooks/useSave";
import { ResumeValues } from "@/lib/validation";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
 
  return (
    <div className="relative hidden w-1/2 md:flex">
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 lg:left-3 lg:top-3">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}

export default ResumePreviewSection;
