"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { PlusSquare } from "lucide-react";
import { createResume } from "@/app/actions/resume.action";
import { useRef, useState } from "react";
import { redirect } from "next/navigation";
import { usePremiumStore } from "@/hooks/usePremiumDialog";

interface CreateResumeProps {
  canCreate: boolean;
}

function CreateResume({ canCreate }: CreateResumeProps) {
  const { isOpen, setIsOpen } = usePremiumStore();
  const [hasCreated, setHasCreated] = useState(false);

  const handleCreate = async () => {
    if (hasCreated) return;
    const resumeId = await createResume();
    setHasCreated(true);
    redirect(`/editor/${resumeId}`);
  };
  if (canCreate) {
    return (
      <Button className="mx-auto flex w-fit gap-2" onClick={handleCreate}>
        <div className="flex items-center gap-2">
          <PlusSquare className="size-5" />
          New Resume
        </div>
      </Button>
    );
  }

  return (
    <Button onClick={() => setIsOpen(true)} className="mx-auto flex w-fit gap-2" >
      <div className="flex items-center gap-2">
        <PlusSquare className="size-5" />
        New Resume
      </div>
    </Button>
  );
}

export default CreateResume;
