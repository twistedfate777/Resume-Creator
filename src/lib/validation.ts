import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal("")); //z.literal makes the type accept empty string

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

//export the schema type so we can use it later on
export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  imageUrl: optionalString,
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z.array(
    z.object({
      jobTitle: optionalString,
      company: optionalString ,
      startDate: z.any() ,
      endDate: z.any(),
      description: optionalString,
    }),
  ).optional()
});
export type workExperienceValues = z.infer<typeof workExperienceSchema>

export const workExperience = z.object({
      jobTitle: optionalString,
      company: optionalString,
      startDate: z.any(),
      endDate: z.any(),
      description: optionalString,
    })

export type workExperienceValue = z.infer<typeof workExperience>


export const educationExperienceSchema = z.object({
  educationExperiences : z.array(
    z.object({
      degree : optionalString,
      school : optionalString,
      startDate : z.any(),
      endDate : z.any()
    })
  ).optional()
})

export type EducationExperiencesValues = z.infer<typeof educationExperienceSchema>

export const skillsSchema = z.object({
  skills : z.array(z.string().trim()).optional()
})

export type SkillValues = z.infer<typeof skillsSchema>

export const summarySchema = z.object({
  summary: optionalString
})

export type SummaryValues = z.infer<typeof summarySchema>

export const resumeSchema = z.object({
  //combine those schema into one
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationExperienceSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  colorHex : optionalString,
  borderStyle : optionalString
});

//Omit remove a field from the schema (in this case we remove the image field from resumeSchema and replace it with image that we define below)
export type ResumeValues = z.infer<typeof resumeSchema> & {
  id?: string;
};

export function convertToResumeValues(data: any): ResumeValues {
  return {
    ...data,
    title: data.title ?? undefined,
    description: data.description ?? undefined,
    imageUrl: data.imageUrl ?? undefined,
    summary: data.summary ?? undefined,
    firstName: data.firstName ?? undefined,
    lastName: data.lastName ?? undefined,
    email: data.email ?? undefined,
    phone: data.phone ?? undefined,
    address: data.address ?? undefined,
    city: data.city ?? undefined,
    country: data.country ?? undefined,
  };
}
