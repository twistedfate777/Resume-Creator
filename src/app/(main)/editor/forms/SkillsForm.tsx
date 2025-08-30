import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorProps } from "@/lib/types";
import { skillsSchema, SkillValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

function SkillsForm({ resumeData, setResumeData }: EditorProps) {
  const form = useForm<SkillValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (value) => {
      const isValid = await form.trigger();
      if (isValid) {
        setResumeData({
          ...resumeData,
          skills: value.skills
            ?.filter((skill) => skill != undefined)
            .filter((skill) => skill != "")
            .filter((skill) => skill.trim()),
        });
      }
    });
    return unsubscribe;
  }, [resumeData, setResumeData, form]);

  
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Your skills</h2>
        <p className="text-sm text-muted-foreground">What are you good at?</p>
      </div>
      <Form {...form}>
        <FormField
          control={form.control}
          name={"skills"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seperate each skill by comma</FormLabel>
              <FormControl>
                {/* set the field value to an array of strings, by splitting each string after a comma */}
                <Textarea {...field} placeholder="Skill 1,Skill 2,..."  onChange={(e)=>{
                  const skills = e.target.value.split(",")
                  field.onChange(skills)
                }}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        ></FormField>
      </Form>
    </div>
  );
}

export default SkillsForm;
