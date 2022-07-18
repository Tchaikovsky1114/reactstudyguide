import React, { useCallback, useReducer } from 'react';




// formReducer의 initialState의 type definition.
// inputs는 inputHandler를 통해 쌓인 inputValue들의 모음이고,
// isFormValid는 전체 form에 대한 Validity이다. 
export interface initialStateType {
  inputs: {
   [key:string] : {
    value: string | File
    isValid: boolean
   }
  }
  isFormValid: boolean
}

// Action (dispatch 사용 시 입력되야 할 타입.)
enum ActionTypes {
  CHANGE = 'CHANGE',
  SETFORM = 'SETFORM'
}


// CHANGE TYPE을 사용했다면, inputId,value,isValid가 필수로 action creator에 담겨 있어야 하고
// SETFORM TYPE을 사용했다면, inputs,isFormValid가 action creator에 존재해야 한다.

// CHANGE는 input을 계속 누적해 쌓는 개념이고
// SETFORM은 form을 로그인/회원가입 모드에 맞는 input들로 재정립하는 것이다.
type Actions  = {
  type: ActionTypes.CHANGE
  inputId: string
  value: string | File
  isValid: boolean
} | {
  type : ActionTypes.SETFORM,
  inputs: InitialInputType
  isFormValid: boolean
}



// reducer 함수. state,action을 받으며, 최종적으로 initialStateType의 형태로 값을 반환한다고 명시.

const formReducer = (state:initialStateType,action:Actions):initialStateType => {
 switch(action.type) {

  // Change type
  case ActionTypes.CHANGE :

  // 개별적인 input의 valid가 아닌 Form 전체에 대한 하나의 validity를 나타내는 boolean값
    let formValid = true

    // 객체를 순회하는 for ... in문.
    // (((state)))의 inputs 객체에 inputId가 존재하지 않는다면  계속 진행
    // inputs 객체에 inputId가 존재하지 않는다는 것은 첫 inputs 객체의 상태와 새로운 inputs가 들어왔을 때를 의미한다.
    for(const inputId in state.inputs){
      if(!state.inputs[inputId]){
        continue
      }

      // state의 inputs 객체에 input과 action creator로 전달하는 input이 같은 것이라면
      if(inputId === action.inputId){
        // 전체 form의 유효성을 나타내는 formValid는 들어오는 input의 개별적인 isValid의 boolean값과 합성한다.
        formValid = formValid && action.isValid
      }else{
      // 같지 않다면 (새로운 값이 들어왔다면)
      // formValid를 새로운 input의 isValid 값으로 합성
        formValid = formValid && state.inputs[inputId].isValid
      }
    }

    // state가 최종적으로 갖는 형태
    return {
    // 기존 state를 유지하고
      ...state,
    // inputs 객체에는 새로운 input(값을 입력하는 input)을 쌓는다
      inputs: {
        ...state.inputs,
        [action.inputId]: {value: action.value, isValid: action.isValid}
      },
    // 위에서 연산한 boolean 값 가져오기
      isFormValid : formValid && action.isValid
    }


    // SETFORM으로 dispatch 한다면 ?
    case ActionTypes.SETFORM :
      return {
    //inputs는 SETFORM에 명시된걸로 전부 바뀌고 (로그인이면 email,password만, 회원가입이면 +nickname,+image)
        inputs: action.inputs,
        isFormValid: action.isFormValid
      }
  default: 
  return state;
 }
}


// useForm에 처음으로 들어오는 값을 명시
interface InitialInputType {
  [key:string] : {
    value: string | File
    isValid: boolean
  }
}

export const useForm = (initialInput:InitialInputType,initialFormValid:boolean) => {
  
  const [formState,dispatch] = useReducer(formReducer,{
    inputs:initialInput,
    isFormValid:initialFormValid
  })


  // inputHandler를 통해 Reducer함수: CHANGE TYPE을 실행한다. inputId를 통해 개별적인 input을 판별하여 각각의 값을 쌓는다
  const inputHandler = useCallback((id:string, value:string | File, isValid:boolean) => {
    dispatch({
      type:ActionTypes.CHANGE,
      value: value,
      inputId: id,
      isValid: isValid
    })
  },[])
  // setForm은 CHANGE처럼 각각의 input을 다시 쌓는 개념이 아닌, 이미 완성된 form을 회원가입/로그인에 맞게 변형시킨다.
  const setForm = (inputData:InitialInputType,formValidity:boolean) => {
  
    dispatch({
      type: ActionTypes.SETFORM,
      inputs: inputData,
      isFormValid: formValidity
    })
  }


  return {formState,inputHandler,setForm}
}


