import {ICheckboxButton,} from "react-native-bouncy-checkbox-group";
import { objUseForm } from './prompInterfaces';

  export interface QuestionData{

    type:Questions[],
    
  }

  export  interface choices{
      choice1:string
      choice2:string
      choice3:string
      choice4:string
    
  }
  export type Questions = {

    type: questionType
    question:string,
    choices:ICheckboxButton[]
    field: keyof objUseForm;
  }

  export type questionType={ 
type: '1' | '2' | '3'|'4'|'5'|'6'|'7'|'8'
  }

  export interface QuestionCarousel {
    index:number;
    questions: questionType[];
}


  export type ruleType={
    type: '1' | '2' | '3'|'4'|'5'|'6'|'7'|'8'|'9'
  }

  export  interface ruleGold{

    type:ruleType
    text:string
    field: keyof objUseForm;
  }