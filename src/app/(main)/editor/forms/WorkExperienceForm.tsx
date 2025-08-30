import GenerateWorkDescription from "@/components/GenerateWorkDescription";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorProps } from "@/lib/types";
import {
  ResumeValues,
  workExperienceSchema,
  workExperienceValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

function WorkExperienceForm({ resumeData, setResumeData }: EditorProps) {
  const form = useForm<workExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });
  useEffect(() => {
    //we get the value by default from the form.watch function
    const { unsubscribe } = form.watch(async (value) => {
      const isValid = await form.trigger();
      if (isValid) {
        //we use filter because work experience is an array
        setResumeData({
          ...resumeData,
          workExperiences:
            value.workExperiences?.filter(
              (workExperience) => workExperience != undefined,
            ) || [],
        });
      }
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  //we use this useFieldArray because we use an array as a data, so we need functions from useFieldArray to play with array data
  const { fields, append, remove, move, update } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });
  useEffect(() => {
    fields.forEach((field, index) => {
      if (field.startDate instanceof Date || field.endDate instanceof Date) {
        update(index, {
          ...field,
          startDate: field.startDate?.toISOString().split("T")[0],
          endDate: field.endDate?.toISOString().split("T")[0],
        });
      }
    });
  }, []);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work experiences</h2>
        <p className="text-sm text-muted-foreground">
          Add as many work experiences as you like!
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => {
            return (
              <WorkExperienceItem
                key={field.id}
                form={form}
                index={index}
                remove={remove}
                id={field.id}
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            );
          })}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => {
                append({
                  company: "",
                  description: "",
                  endDate: "",
                  jobTitle: "",
                  startDate: "",
                });
              }}
            >
              Add work experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default WorkExperienceForm;

interface WorkExperienceItemProps {
  form: UseFormReturn<workExperienceValues>;
  index: number;
  remove: (index: number) => void;
  id: string;
  resumeData: ResumeValues;
  setResumeData : (resumeData:ResumeValues) => void
}

function WorkExperienceItem({
  form,
  index,
  remove,
  id,
  resumeData,
  setResumeData
}: WorkExperienceItemProps) {
  return (
    <div className={`space-y-3 rounded-md border bg-background p-3`}>
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work experience {index + 1}</span>
        <GripHorizontal className="size-5 cursor-grab text-muted-foreground outline-none" />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.jobTitle`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input placeholder="Position..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input placeholder="Company..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <div className="grid grid-cols-2">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}

                  //TODO IN DATE FIELD
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </div>
      <FormDescription className="text-center">
        Leave <span className="font-bold">end date</span> empty if you are
        currently working here
      </FormDescription>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <Textarea {...field} placeholder="Description..." value={resumeData.workExperiences?.[index]?.description || ""} />
            <GenerateWorkDescription resumeData={resumeData} setResumeData={setResumeData} index={index}/>
            <FormDescription className="text-muted-foreground">Please fill in all other fields to generate</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <div className="flex w-full justify-center py-2">
        <Button
          type="button"
          onClick={() => remove(index)}
          variant={"destructive"}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
