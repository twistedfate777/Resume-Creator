"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { generateSummary } from '@/app/actions/ai.actions'
import { ResumeValues } from '@/lib/validation'
import { Loader } from 'lucide-react'
import { usePremiumStore } from '@/hooks/usePremiumDialog'

function GenerateSummary({resume,setResumeData}:{resume:ResumeValues, setResumeData : (resume:ResumeValues)=>void}) {
  const [isLoading,setIsLoading] = useState(false)
  const {setIsOpen,subscriptionLevel} = usePremiumStore()

  const enableAiFeature =
    subscriptionLevel !== null && subscriptionLevel !== "free";

  

  const handleGenerateSummary = async()=>{
    if(!enableAiFeature){
      setIsOpen(true)
    }else{
      try {
      setIsLoading(true)
      const summary = await generateSummary({resume})
      setResumeData({...resume,summary:summary})
    } catch (error) {
      console.log("Error in handleGenerateSummary",error) 
    }finally{
      setIsLoading(false)
    }
    }
  }
  return (
    <Button onClick={handleGenerateSummary}>{isLoading ? <Loader width={15} height={15} className='animate-spin'/> : "Generate summary with ai"}</Button>
  )
}

export default GenerateSummary