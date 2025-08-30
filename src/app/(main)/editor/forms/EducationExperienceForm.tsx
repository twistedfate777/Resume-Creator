import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorProps } from "@/lib/types";
import {
  educationExperienceSchema,
  EducationExperiencesValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

function EducationExperienceForm({ resumeData, setResumeData }: EditorProps) {
  const form = useForm<EducationExperiencesValues>({
    resolver: zodResolver(educationExperienceSchema),
    defaultValues: {
      educationExperiences: resumeData.educationExperiences || [],
    },
  });

  useEffect(() => {
    const {} = form.watch(async (value) => {
      const isValid = await form.trigger();
      if (isValid) {
        setResumeData({
          ...resumeData,
          educationExperiences:
            value.educationExperiences?.filter((exp) => exp != undefined) || [],
        });
      }
    });
  }, [resumeData, form, setResumeData]);

  const { fields, remove, append, update } = useFieldArray({
    control: form.control,
    name: "educationExperiences",
  });

  useEffect(() => {
    fields.forEach((field, index) => {
      if (field.startDate instanceof Date && field.endDate instanceof Date) {
        update(index, {
          ...field,
          startDate: field.startDate?.toISOString().split("T")[0],
          endDate: field.endDate?.toISOString().split("T")[0],
        });
      }
    });
  });
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add as many education experiences as you like!
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <EducationExperienceItem
              key={field.id}
              form={form}
              index={index}
              remove={remove}
              id={field.id}
            />
          ))}

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Add education experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EducationExperienceForm;

interface EducationExperienceItemProps {
  form: UseFormReturn<EducationExperiencesValues>;
  index: number;
  remove: (index: number) => void;
  id: string;
}
function EducationExperienceItem({
  form,
  index,
  remove,
  id,
}: EducationExperienceItemProps) {
  return (
    <div className={"space-y-3 rounded-md border bg-background p-3"}>
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Education experience {index + 1}</span>
        <GripHorizontal className="size-5 cursor-grab text-muted-foreground" />
      </div>
      <FormField
        control={form.control}
        name={`educationExperiences.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Degree..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name={`educationExperiences.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} placeholder="School..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <div className="grid grid-cols-2">
        <FormField
          control={form.control}
          name={`educationExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name={`educationExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </div>
      <div className="flex w-full justify-center py-2">
        <Button
          variant={"destructive"}
          type="button"
          onClick={() => remove(index)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
