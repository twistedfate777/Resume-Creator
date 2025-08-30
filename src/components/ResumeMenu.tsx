"use client";
import { fetchAllResume } from "@/app/actions/resume.action";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Printer, Settings, Trash2 } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";
import ResumePreview from "@/components/ResumePreview";
import { convertToResumeValues } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";

import React, { useRef } from "react";

type Resumes = Awaited<ReturnType<typeof fetchAllResume>>;
type Resume = Resumes[number];

function ResumeMenu({ resume }: { resume: Resume }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef,
    documentTitle: resume.title || "Untitled",
  });
  if (!resume) return;
  return (
    <div>
      <div key={resume.id} className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            {resume.title ? resume.title : "Untitled resume"}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Settings className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 w-[50px]" align="center">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <DeleteButton resumeId={resume.id} />
                  <DropdownMenuShortcut>
                    <Trash2 className="size-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Button
                    className="bg-transparent text-white hover:bg-transparent"
                    onClick={() => reactToPrintFn()}
                  >
                    Print
                  </Button>
                  <DropdownMenuShortcut>
                    <Printer className="size-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link style={{ aspectRatio: 1 }} href={`/editor/${resume.id}`}>
          <div className="flex flex-col gap-2">
            <ResumePreview
              resumeData={convertToResumeValues(resume)}
              className="w-[200px]"
              contentRef={contentRef}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ResumeMenu;
