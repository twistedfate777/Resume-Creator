import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { EditorProps } from "@/lib/types";

function GeneralInfoForm({ resumeData, setResumeData }: EditorProps) {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
    },
  });
  useEffect(() => {
    //we get the value by default from the form.watch function
    const { unsubscribe } = form.watch(async (value) => {
      const isValid = await form.trigger();

      if (isValid) {
        setResumeData({ ...resumeData, ...value });
      }
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">General Info</h2>
        <p className="text-sm text-muted-foreground">
          This will not appear on your resume
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Title..." autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Description..." />
                </FormControl>
                <FormDescription>
                  Describe what this resume is for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </form>
      </Form>
    </div>
  );
}

export default GeneralInfoForm;
