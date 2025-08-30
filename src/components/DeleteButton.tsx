"use client";
import React from "react";
import { Button } from "./ui/button";
import { deleteResume } from "@/app/actions/resume.action";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function DeleteButton({ resumeId }: { resumeId: string }) {
  const { toast } = useToast();
  const handleDelete = async () => {
    await deleteResume(resumeId);
  };
  return (
    <Button
      onClick={() => {
        handleDelete();
        toast({
          title: "Deleted Successfully",
          description: "Resume is deleted from the database",
          action: (
            <ToastAction
              altText="resume deleted"
              className="bg-white text-black transition-all hover:bg-gray-100"
            >
              Ok
            </ToastAction>
          ),
        });
      }}
      className="bg-transparent text-white hover:bg-transparent"
    >
      Delete
    </Button>
  );
}

export default DeleteButton;
