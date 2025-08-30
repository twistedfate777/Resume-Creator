"use server";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { convertToResumeValues, ResumeValues } from "@/lib/validation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUserId } from "./auth.actions";

export const fetchAllResume = async () => {
  const userId = await getCurrentUserId()
  if(!userId) return
  try {
    const resumes = await prisma.resume.findMany({
      where:{
        userId : userId
      }
      ,include: {
        educationExperiences: true,
        workExperiences: true,
      },
    });

    return resumes;
  } catch (error) {
    console.log("Error in fetchAllResume");
    return [];
  }
};

export const fetchResume = async (resumeId: string) => {
  try {
    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
      include: {
        workExperiences: true,
        educationExperiences: true,
      },
    });
    return convertToResumeValues(resume);
  } catch (error) {
    console.log("Error in fetchResume", error);
  }
};

export const createResume = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) return;
  try {
    const subscriptionLevel = await getUserSubscriptionLevel(clerkId);
    const resumeCount = (await getTotalResumeCount()) || 0;

    if (subscriptionLevel === "free" && resumeCount > 0)
      throw new Error(
        "You are unable to create a new resume, please upgrade the subscription level",
      );
    if (subscriptionLevel === "pro" && resumeCount >= 3)
      throw new Error(
        "You are unable to create a new resume, please upgrade the subscription level",
      );

    const resume = await prisma.resume.create({
      data: {
        userId: clerkId,
      },
    });

    return resume.id;
  } catch (error) {
    console.log("Error in createResume", error);
  }
};

export const deleteResume = async (resumeId: string) => {
  const { userId: clerkId } = await auth();
  if (!clerkId) return;
  try {
    await prisma.resume.delete({
      where: {
        userId: clerkId,
        id: resumeId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log("Error in deleteResume", error);
  }
};

export const getTotalResumeCount = async () => {
  const { userId } = await auth();
  if (!userId) return;
  try {
    const resumes = await prisma.resume.findMany({
      where: {
        userId,
      },
    });

    const length = resumes.length;

    return length;
  } catch (error) {
    console.log("Error in get totalResumeCount", error);
  }
};
