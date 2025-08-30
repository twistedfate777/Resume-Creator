"use server";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare, Settings, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fetchAllResume, getTotalResumeCount } from "./actions/resume.action";
import CreateResume from "@/components/CreateResume";
import ResumePreview from "@/components/ResumePreview";
import { convertToResumeValues } from "@/lib/validation";
import prisma from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";
import ClientMainPage from "./(main)/ClientMainPage";


export default async function Home() {
  const resumes = await fetchAllResume();
  const resumesCount = await getTotalResumeCount() || 0
  
  return (
    <ClientMainPage resumes={resumes}  resumesCount={resumesCount} />
  );
}
