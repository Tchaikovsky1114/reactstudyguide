import React, { ChangeEvent, ReducerState, useReducer } from 'react';
import { validate } from '../../../util/validator';
import { ValidatorTypes } from '../../../util/validator';


// input을 사용하는 곳에서 받아 올 props
interface ChildProps {
  element: string;
  id: string;
  type: string;
  label: string;
  placeholder: string;
  errorText: string;
  validators: ValidatorTypes[];
  rows?: number
}


// useReducer의 reducer함수에서 받는 initialState의 type definition
interface InputState {
  value: string;
  isBlur: boolean;
  isValid: boolean | undefined;
}

// reducer 함수에서 받는 action의 type definition,
// action.type === CHANGE일때에는, payload ,validators 2개의 추가 인자가 필수로 더 들어와야 하고
// validators는 ValidatorTypes를 갖는 이루어진 object Array이다.
type Actions =
  | { type: 'CHANGE'; payload: string; validators: ValidatorTypes[] }
  | { type: 'BLUR' };


  // useReducer의 reducer 함수.
  // reducer함수의 첫번째 매개변수는 항상 initialstate이며 2번째 매개변수 또한 항상 action이다.
  // action이란 state를 변형시키는 행동.
const inputReducer = (state: InputState, action: Actions): InputState => {

  switch (action.type) {
    // action.type === 'CHANGE'
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };


    // action.type === 'BLUR'
    case 'BLUR':
      return {
        ...state,
        isBlur: true,
      };




    default:
      return state;
  }
};

const Input = ({label,element,type,id,placeholder,validators,errorText,rows}: ChildProps) => {

  // reducer함수는 state,action 순으로 받는다면, useReducer에서의 인자는 reducer함수, state 순서로 받는다.
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isBlur: false,
    isValid: false,
  });

  // input에 change가 일어날 때마다 reducer함수에 action creator를 담아 dispatch한다.
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'CHANGE',
      payload: e.currentTarget.value,
      validators,
    });
  };

  // isBlur를 조작하기 위해 onBlur event도 입력한다.
  // validator에 error가 있다면. onBLur가 true일때 errortext를 랜더링한다. (119행 참조)
  const onBlur = () => {
    dispatch({
      type: 'BLUR',
    });
  };


  // 조건에 딸라지는 input의 형태.
  // 해당 컴포넌트는 사용하는 컴포넌트에서 어떤 props를 전달하느냐에 따라서 다른 형태의 element로 생성된다.
  const conditionalInput =
    element === 'input'
    ? <input
      className='block w-64 border border-slate-200 py-1 px-2 grow'
        id={id}
        type={type}
        value={inputState.value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    : <textarea
        id={id}
        rows={rows || 3}
        value={inputState.value}
        onChange={onChange}
        onBlur={onBlur}
      />;


  return (
    <>
    <div className="gap-2">
      <label className='font-bold ' htmlFor={id}>{label}</label>     
      {conditionalInput}  
    </div>
    {!inputState.isValid && inputState.isBlur && <p className=' text-sm text-slate-600 border-b-2 border-b-red-500 p-0 m-0'>{errorText}</p>}
    </>
  );
};

export default Input;
