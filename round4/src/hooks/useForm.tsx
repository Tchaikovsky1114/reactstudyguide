import React, { useCallback, useReducer } from 'react';



export interface initialStateType {
  inputs: {
   [key:string] : {
    value: string
    isValid: boolean
   }
  }
  isFormValid: boolean
}

enum ActionTypes {
  CHANGE = 'CHANGE',
  SETFORM = 'SETFORM'
}

type Actions  = {
  type: ActionTypes.CHANGE
  inputId: string
  value: string
  isValid: boolean
} | {
  type : ActionTypes.SETFORM,
  inputs: InitialInputType
  isFormValid: boolean
}



const formReducer = (state:initialStateType,action:Actions):initialStateType => {
 switch(action.type) {
  case ActionTypes.CHANGE :
    let formValid = true
    for(const inputId in state.inputs){
      if(!state.inputs[inputId]){
        continue
      }
      if(inputId === action.inputId){
        formValid = formValid && action.isValid
      }else{
        formValid = formValid && state.inputs[inputId].isValid
      }
    }
    
    return {
      ...state,
      inputs: {
        ...state.inputs,
        [action.inputId]: {value: action.value, isValid: action.isValid}
      },
      isFormValid : formValid && action.isValid
    }  
    case ActionTypes.SETFORM :
      return {
        inputs: action.inputs,
        isFormValid: action.isFormValid
      }
  default: 
  return state;
 }
}


interface InitialInputType {
  [key:string] : {
    value: string
    isValid: boolean
  }
}

export const useForm = (initialInput:InitialInputType,initialFormValid:boolean) => {
  

  const [formState,dispatch] = useReducer(formReducer,{
    inputs:initialInput,
    isFormValid:initialFormValid
  })

  const inputHandler = useCallback((id:string, value:string, isValid:boolean) => {
    dispatch({
      type:ActionTypes.CHANGE,
      value: value,
      inputId: id,
      isValid: isValid
    })
  },[])

  const setForm = (inputData:InitialInputType,formValidity:boolean) => {
    dispatch({
      type: ActionTypes.SETFORM,
      inputs: inputData,
      isFormValid: formValidity
    })
  }


  return {formState,inputHandler,setForm}
}


