import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { steps } from "./steps";

interface BreadcrumpsProps {
  currentStep: string;
  setCurrentStep : (currentStep : string) =>void
}

function Breadcrumps({ currentStep,setCurrentStep }: BreadcrumpsProps) {
  return (
    <div className="flex justify-center">
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((step,index) => (
            <div key={step.key} className="flex items-center gap-2">
              <BreadcrumbItem>
                {step.key === currentStep ? (
                  <BreadcrumbPage>{step.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild >
                    <button onClick={()=>setCurrentStep(step.key)}>
                      {step.title}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className={`${index ===steps.length-1 && "hidden"}`} />
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default Breadcrumps;
