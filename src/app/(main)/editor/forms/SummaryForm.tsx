import GenerateSummary from "@/components/GenerateSummary";
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
import { summarySchema, SummaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function SummaryForm({ resumeData, setResumeData }: EditorProps) {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (value) => {
      const isValid = await form.trigger();
      if (isValid) {
        setResumeData({ ...resumeData, ...value });
      }
    });
  }, [form, resumeData, setResumeData]);
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Your summary</h2>
        <p className="text-sm text-muted-foreground">
          Write a short introduction for your resume or let the AI generete one
          from your entered data
        </p>
      </div>
      <Form {...form}>
        <FormField
          name="summary"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Summary..." value={resumeData.summary} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </Form>
      <GenerateSummary resume={resumeData} setResumeData={setResumeData}/>
    </div>
  );
}

export default SummaryForm;
