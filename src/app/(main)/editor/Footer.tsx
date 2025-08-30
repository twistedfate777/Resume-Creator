"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { steps } from './steps'
import SmResumePreview from './SmResumePreview'
import { EditorProps } from '@/lib/types'
import { ResumeValues } from '@/lib/validation'
import { Loader, Loader2 } from 'lucide-react'

interface FooterProps {
  resumeData : ResumeValues,
  setResumeData : (data:ResumeValues) =>void
  isSaving:boolean
}

function Footer({resumeData,setResumeData,isSaving}:FooterProps) {
  const searchParams = useSearchParams()
  const currentStep = searchParams.get("step") || steps[0].key
  const currentIndex = steps.findIndex((step) => step.key === currentStep)

  const setPrevStep = ()=>{
    const newSearchParams = new URLSearchParams(searchParams)
    if(currentIndex > 0){
      newSearchParams.set("step",steps[currentIndex-1].key)
      window.history.pushState(null,"",`?${newSearchParams.toString()}`) //set the current path to the specific query
    }
  }

  const setNextStep = ()=>{
    const newSearchParams = new URLSearchParams(searchParams)

    if(currentIndex < steps.length-1){
      newSearchParams.set("step",steps[currentIndex+1].key)
      window.history.pushState(null,"",`?${newSearchParams}`)
    }
  }

  return (
    <footer className="w-full border-t px-3 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <div className="flex items-center gap-3">
            {currentIndex > 0 && <Button variant={"secondary"} onClick={setPrevStep}>Previous Step</Button>}
            <div className='flex md:hidden'><SmResumePreview resumeData={resumeData} setResumeData={setResumeData}/></div>
            {currentIndex < steps.length-1 && <Button onClick={setNextStep}>Next Step</Button>}
          </div>
          <div className="flex items-center gap-3">
            {isSaving && (
              <div className='flex items-center gap-2'>
                <Loader2 className='animate-spin' width={15} height={15}/>
                <p className="text-muted-foreground ">Saving...</p>
              </div>
            )}
            <Button variant={"secondary"} asChild>
              <Link href={"/"}>Close</Link>
            </Button>
            
          </div>
        </div>
      </footer>
  )
}

export default Footer