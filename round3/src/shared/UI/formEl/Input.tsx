import React, { ChangeEvent, ReducerState, useEffect, useReducer } from 'react';
import { initialStateType } from '../../../hooks/useForm';
import { validate } from '../../../util/validator';
import { ValidatorTypes } from '../../../util/validator';




interface childProps {
  element: string;
  id: string;
  type: string;
  label: string;
  placeholder: string;
  errorText: string;
  validators: ValidatorTypes[];
  rows?: number;
  inputHandler: (id:string,value:string,isValid:boolean)=> void;
}


interface InputState {
  value: string;
  isBlur: boolean;
  isValid: boolean;
}


type Actions =
  | { type: 'CHANGE'; payload: string; validators: ValidatorTypes[] }
  | { type: 'BLUR'; validators: ValidatorTypes[] };




const inputReducer = (state: InputState, action: Actions): InputState => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };
    case 'BLUR':
      return {
        ...state,
        isBlur: true,
        isValid: validate(state.value, action.validators),
      };
    default:
      return state;
  }
};



const Input = ({
  label,
  element,
  type,
  id,
  placeholder,
  validators,
  errorText,
  rows,
  inputHandler,
}: childProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isBlur: false,
    isValid: false,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'CHANGE',
      payload: e.currentTarget.value,
      validators,
    });
  };
  const onBlur = () => {
    dispatch({
      type: 'BLUR',
      validators,
    });
  };

  // id, value,isValid가 바뀔때마다 inputHanlder를 통해 form 전체에 대한 Validation도 같이 진행된다.
  useEffect(() => {
    inputHandler(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, inputHandler]);

  const conditionalInput =
    element === 'input' ? (
      <input
        className="block w-64 border border-slate-200 py-1 px-2 grow"
        id={id}
        type={type}
        value={inputState.value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        value={inputState.value}
        onChange={onChange}
        onBlur={onBlur}
      />
    );

  return (
    <>
      <div className="gap-2">
        <label className="font-bold " htmlFor={id}>
          {label}
        </label>
        {conditionalInput}
      </div>
      {!inputState.isValid && inputState.isBlur && (
        <p className=" text-sm text-slate-600 border-b-2 border-b-red-500 p-0 m-0">
          {errorText}
        </p>
      )}
    </>
  );
};

export default Input;
