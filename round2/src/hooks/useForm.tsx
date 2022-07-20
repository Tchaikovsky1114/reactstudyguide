import React, { useCallback, useReducer } from 'react';
import { ValidatorTypes } from '../util/validator';


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
  CHANGE = 'CHANGE'
}

type Actions  = {
  type: ActionTypes.CHANGE
  inputId: string
  value: string
  isValid: boolean
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

  const inputHandler = useCallback((id:string,value:string,isValid:boolean) => {
    dispatch({
      type:ActionTypes.CHANGE,
      value: value,
      inputId: id,
      isValid: isValid
    })

  },[])

  return {formState,inputHandler}
}


