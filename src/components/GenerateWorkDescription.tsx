import {
  ResumeValues,
  workExperience,
  workExperienceValue,
} from "@/lib/validation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { generateWorkDescription } from "@/app/actions/ai.actions";
import { Loader } from "lucide-react";
import { usePremiumStore } from "@/hooks/usePremiumDialog";

function GenerateWorkDescription({
  resumeData,
  setResumeData,
  index,
}: {
  resumeData: ResumeValues;
  setResumeData: (resumeData: ResumeValues) => void;
  index: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { subscriptionLevel, setIsOpen } = usePremiumStore();

  const workExperience = { workExperience: resumeData.workExperiences![index] };
  const enableAiFeature =
    subscriptionLevel !== null && subscriptionLevel !== "free";

  const handleGenerate = async () => {
    setIsOpen(!enableAiFeature);
    try {
      setIsLoading(true);
      const description = await generateWorkDescription(workExperience);
      if (!description) return;
      setResumeData({
        ...resumeData,
        workExperiences: resumeData.workExperiences?.map((exp, i) =>
          index === i ? { ...exp, description: description } : exp,
        ),
      });
    } catch (error) {
      console.log("Error in handleGenerateDescription", error);
    } finally {
      setIsLoading(false);
    }
  };

  const experience = resumeData.workExperiences?.[index];
  return (
    <Button
      onClick={handleGenerate}
      disabled={
        isLoading ||
        !experience?.jobTitle ||
        !experience?.company ||
        !experience?.startDate ||
        !experience?.endDate
      }
    >
      {" "}
      {isLoading ? (
        <Loader width={15} height={15} className="animate-spin" />
      ) : (
        "Generate description"
      )}
    </Button>
  );
}

export default GenerateWorkDescription;
