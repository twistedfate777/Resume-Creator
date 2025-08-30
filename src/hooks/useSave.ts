"use client"
import { ResumeValues } from '@/lib/validation'
import React, { useEffect, useState } from 'react'
import useDebounce from './useDebounce'

function useSave(resume:ResumeValues) {
  //lastSavedData will only change when we set them
  const [lastSavedData,setLastSavedData] = useState(structuredClone(resume))
  const [resumeValues2secondsAgo,setResumeValues2secondsAgo] = useState(structuredClone(resume))
  
  const [isSaving,setIsSaving] = useState(false)

  useEffect(()=>{
    const save = async()=>{
      try {
        if(isSaving)return
        setIsSaving(true)
        await new Promise(resolve => setTimeout(resolve,1500))
        setLastSavedData(structuredClone(resume))
      } catch (error) {
        console.log("Error in useSave",error)
      }finally{
        setIsSaving(false)
      }
    }

    const setPastResumeValues = setTimeout(()=>setResumeValues2secondsAgo(structuredClone(resume)) ,2000)
    
    //stringify helps us compare object
    const hasResumeValueChange = JSON.stringify(resumeValues2secondsAgo) !== JSON.stringify(resume)

    if(!hasResumeValueChange){
      console.log("value change")
      save()
    }
    return ()=>clearTimeout(setPastResumeValues)
  },[resume])

  return isSaving
}


export default useSave