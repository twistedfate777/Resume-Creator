"use server";

import prisma from "@/lib/prisma";
import {
  ResumeValues,
  workExperienceValue,
  workExperienceValues,
} from "@/lib/validation";

export const syncResumeData = async (resumeData: ResumeValues) => {
  try {
    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeData.id,
      },
    });
    if (!resume) throw new Error("Resume not found");

    await prisma.resume.update({
      where: {
        id: resumeData.id,
      },
      data: {
        firstName: resumeData.firstName,
        lastName: resumeData.lastName,
        borderStyle: resumeData.borderStyle,
        colorHex: resumeData.colorHex,
        description: resumeData.description,
        email: resumeData.email,
        imageUrl: resumeData.imageUrl,
        jobTitle: resumeData.jobTitle,
        phone: resumeData.phone,
        title: resumeData.title,
        summary: resumeData.summary,
        skills: resumeData.skills
      },
    });


    await prisma.workExperience.deleteMany({
      where: {
        resumeId: resumeData.id,
      },
    });

    // we use for loop to execute create function so we dont mess with the order of workExperiences

    for (const exp of resumeData.workExperiences ?? []) {
      if (!resumeData.id) {
        throw new Error("resumeId missing");
      }

      await prisma.workExperience.create({
        data: {
          resumeId: resumeData.id,
          company: exp.company,
          jobTitle: exp.jobTitle,
          startDate: exp.startDate ? new Date(exp.startDate) : undefined,
          endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          description: exp.description,
        },
      });
    }

    await prisma.education.deleteMany({
      where: {
        resumeId: resumeData.id,
      },
    });

    for (const exp of resumeData.educationExperiences ?? []) {
      if (!resumeData.id) {
        throw new Error("resumeId missing");
      }

      await prisma.education.create({
        data: {
          resumeId: resumeData.id,
          startDate: exp.startDate ? new Date(exp.startDate) : undefined,
          endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          degree:exp.degree,
          school:exp.school
        },
      });
    }
  } catch (error) {
    console.log("Error in syncResumeData", error);
  }
};

