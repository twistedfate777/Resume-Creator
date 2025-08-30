"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumps from "./Breadcrumps";
import Footer from "./Footer";
import { ResumeValues } from "@/lib/validation";
import ResumePreview from "@/components/ResumePreview";
import ResumePreviewSection from "./ResumePreviewSection";
import { syncResumeData } from "@/app/actions/editor.action";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { usePremiumStore } from "@/hooks/usePremiumDialog";
import { useAuth, useUser } from "@clerk/nextjs";

function ResumeEditorClient({ resume }: { resume: ResumeValues }) {
  const searchParams = useSearchParams();
  const { fetchSubscribtionLevel, subscriptionLevel } = usePremiumStore();

  

  const [resumeData, setResumeData] = useState<ResumeValues>(resume);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );
  const [resumeValues2secondsAgo, setResumeValues2secondsAgo] = useState(
    structuredClone(resumeData),
  );
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasResumeValueChange, setHasResumeValueChange] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [unsaved, setUnsaved] = useState(false);

  //if we stop typing for 2 seconds, this useEffect will check if there is a difference in resumeValues2secondsAgo to resume value now, if there is a difference run the save function

  useEffect(() => {
    const save = async () => {
      try {
        if (isSaving) return;
        setIsSaving(true);
        await syncResumeData(resumeData);
        setLastSavedData(structuredClone(resumeData));
      } catch (error) {
        console.log("Error in useSave", error);
      } finally {
        setIsSaving(false);
      }
    };
     
     
    //stringify helps us compare object
    const setPastResumeValues = setTimeout(() => {
      if (
        JSON.stringify(resumeValues2secondsAgo) !== JSON.stringify(resumeData)
      ) {
        setResumeValues2secondsAgo(structuredClone(resumeData));
        setHasResumeValueChange(true);
      }
    }, 2000);

    if (hasResumeValueChange && !hasLoaded) {
      setHasLoaded(true);
      save();
    } else {
      setHasResumeValueChange(false);
      setHasLoaded(false);
    }

    setUnsaved(
      JSON.stringify(resumeData) != JSON.stringify(resumeValues2secondsAgo),
    );
    return () => clearTimeout(setPastResumeValues);
  }, [resumeData, resumeValues2secondsAgo]);

  useUnloadWarning(unsaved);
  //the first time we load the page the query will be empty, so we will display the general-info component (because we set the currentStep to steps[0].key if we dont have any query)

  const currentStep = searchParams.get("step") || steps[0].key; //get the step query value

  const setCurrentStep = (currentStep: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("step", currentStep);
    window.history.pushState(null, "", `?${newSearchParams}`);
  };

  //get current active step
  const currentStepData =
    steps.find((step) => {
      if (step.key === currentStep) return step;
    }) || steps[0];

  const CurrentComponent = currentStepData.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design Your Resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your progress will be
          saved automatically
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full overflow-y-auto p-3 md:w-1/2">
            <Breadcrumps
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <CurrentComponent
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        </div>
      </main>
      <Footer
        resumeData={resumeData}
        setResumeData={setResumeData}
        isSaving={isSaving}
      />
    </div>
  );
}

export default ResumeEditorClient;
