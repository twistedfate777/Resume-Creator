import { EditorProps } from "@/lib/types"
import GeneralInfoForm from "./forms/GeneralInfoForm"
import PersonalInfoForm from "./forms/PersonalInfoForm"
import WorkExperienceForm from "./forms/WorkExperienceForm"
import EducationExperienceForm from "./forms/EducationExperienceForm"
import SkillsForm from "./forms/SkillsForm"
import SummaryForm from "./forms/SummaryForm"

export const steps :{
  title:string,
  component : React.ComponentType<EditorProps> /*we need to pass EditorProps to use this component */,
  key:string
}[] = [
  {title:"General info",component:GeneralInfoForm,key:"general-info"},
  {title:"Personal info",component:PersonalInfoForm,key:"personal-info"},
  {title:"Work experiences",component:WorkExperienceForm,key:"work-experience"},
  {title:"Education experiences",component:EducationExperienceForm,key:"education-experience"},
  {title:"Skills",component:SkillsForm,key:"skills"},
  {title:"Summary",component:SummaryForm,key:"summary"},
]