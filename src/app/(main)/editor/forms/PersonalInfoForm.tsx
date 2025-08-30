"use client"
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
import { EditorProps } from "@/lib/types";
import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect} from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "../../../../lib/uploadthing";

function PersonalInfoForm({ resumeData, setResumeData }: EditorProps) {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      email: resumeData.email || "",
      jobTitle: resumeData.jobTitle || "",
      phone: resumeData.phone || "",
    },
  });

  useEffect(() => {
    /* watch function will trigger whenever anything inside our form changes */
    //we get the value by default from the form.watch function
    const { unsubscribe } = form.watch(async (value) => {
      //check if the form is valid
      const isValid = await form.trigger();

      if (isValid) {
        //update resume data
        setResumeData({ ...resumeData, ...value });
      }
    });
    //unsubscribe is used to clean up the function

    return unsubscribe;
  }, [form, resumeData, setResumeData]);


  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal Info</h2>
        <p className="text-sm text-muted-foreground"> Tell us about yourself</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {/* THIS IS HOW WE HANDLE FILE INPUT IN REACT HOOK FORM */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel className="flex justify-center">Image</FormLabel>
                <FormControl>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setResumeData({...resumeData,imageUrl:res?.[0].ufsUrl})
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                      console.log(error)
                    }}
                  />
                </FormControl>
                {resumeData.imageUrl && (
                  <div className="flex justify-center pt-2">
                    <Button
                    variant={"destructive"}
                    type="button"
                    onClick={() => {
                      setResumeData({ ...resumeData, imageUrl: "" });
                      
                    }}
                  >
                    Delete
                  </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          {/* THIS IS HOW WE HANDLE FILE INPUT IN REACT HOOK FORM */}

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input placeholder="Title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone..." {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </form>
      </Form>
    </div>
  );
}

export default PersonalInfoForm;
