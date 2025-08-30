"use server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { workExperience, workExperienceValue } from "./../../lib/validation";
import { ResumeValues } from "@/lib/validation";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@clerk/nextjs/server";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});
const {userId} = await auth()


const subscriptionLevel = await getUserSubscriptionLevel(userId || "")

 const enableAiFeature =
    subscriptionLevel !== null && subscriptionLevel !== "free";

export async function generateSummary({ resume }: { resume: ResumeValues }) {
  if(!enableAiFeature) return 
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a professional AI resume generator. Your task is to create a concise and compelling summary from the following resume data.
    Completely overwrite any existing summary and focus on highlighting the work experience, education, and key skills. Make it sound professional and make it a bit long Only return the summary and do not include any other information in the response

    Resume Data:
    - Work Experience: ${JSON.stringify(resume.workExperiences)}
    - Education: ${JSON.stringify(resume.educationExperiences)}
    - Skills: ${JSON.stringify(resume.skills)}`,
    config: {
      systemInstruction: "You are an ai resume summary generator",
    },
  });
  return response.text;
}

export async function generateWorkDescription({
  workExperience,
}: {
  workExperience: workExperienceValue;
}) {
  if(!enableAiFeature) return
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a professional AI resume generator. Your task is to create a concise and compelling description from the following workExperience data 
     Make it sound professional and make it a bit long Only return the description and do not include any other information in the response

    Resume Data:
    - Job: ${JSON.stringify(workExperience.jobTitle)}
    - Company: ${JSON.stringify(workExperience.company)}
    - Start date: ${JSON.stringify(workExperience.startDate)}
    - End date : ${JSON.stringify(workExperience.endDate)}
    `,

    config: {
      systemInstruction: "You are an ai resume summary generator",
    },
  });
  return response.text;
}
