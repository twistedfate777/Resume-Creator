"use server"
import React from 'react'
import ResumeEditorClient from '../ResumeEditor'
import { fetchResume } from '@/app/actions/resume.action'
import { ResumeValues } from '@/lib/validation';

async function resumePage({params}:{params:Promise<{resumeId:string}>}) {
  
  const {resumeId} = await params
  const resume = await fetchResume(resumeId)
  if(!resume) return <div>Resume not found</div>
  return (
    <ResumeEditorClient resume={resume} />
  )
}

export default resumePage