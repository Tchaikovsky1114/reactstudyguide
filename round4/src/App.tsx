import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';

import { useForm } from './hooks/useForm';
import { ButtonTypes } from './shared/enum';
import Button from './shared/UI/formEl/Button';
import ImageUpload from './shared/UI/formEl/ImageUpload';
import Input from './shared/UI/formEl/Input';
import LoadingSpinner from './shared/UI/LoadingSpinner';
import { useAppDispatch, useUserSelector } from './store/store';
import { userSign } from './store/userSlice';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from './util/validator';
import Userlist from './user/Userlist';
function App() {
  const [loginMode, setLoginMode] = useState(true);
  const dispatch = useAppDispatch();
  const { userData, error, loading } = useUserSelector((state) => state.user);
  const { formState, inputHandler, setForm } = useForm(
    {
      email: {
        value: '',
        isValid: true,
      },
      password: {
        value: '',
        isValid: true,
      },
    },
    false
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      returnSecureToken: true,
    };
    
    if (!loginMode) {
      try {
        dispatch(
          userSign({
            url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7VQ4ssIKFX6hB9Df-5LLbyA80mEohXTI',
            userData:data,
            headers:{
              'Content-Type': 'application/json',
            }
          })
        );

      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        dispatch(userSign({
          url:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7VQ4ssIKFX6hB9Df-5LLbyA80mEohXTI',
          userData:data,
          headers:{
            'Content-Type': 'application/json',
          }
        }))
        
      } catch (err) {
        console.log(err);
      }
    }
  };

  const toggleSignInAndSignUp = () => {
    setLoginMode((prev) => !prev);
    if (!loginMode) {
      // 회원가입모드라면
      setForm(
        {
          ...formState.inputs,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      // 로그인 모드라면
      setForm(
        {
          ...formState.inputs,
        },
        false
      );
      
    }
  };

  return (
    <div className="w-full mx-auto my-0">
      <h2 className="text-center p-4">{loginMode ? '로그인' : '회원가입'}</h2>
      <form
        className="flex flex-col justify-center items-center gap-1"
        onSubmit={onSubmit}
      >
        <Button
          onClick={toggleSignInAndSignUp}
          inverse
          large
          type={ButtonTypes.BUTTON}
        >
          {loginMode ? '회원가입' : '로그인'}하러 가기
        </Button>
        <Input
          id="email"
          label="EMAIL"
          element="input"
          type="text"
          placeholder="이메일을 입력해주세요"
          errorText="이메일 형식이 올바르지 않습니다."
          validators={[VALIDATOR_EMAIL(), VALIDATOR_MINLENGTH(8)]}
          inputHandler={inputHandler}
        />
        <Input
          id="password"
          label="PASSWORD"
          element="input"
          type="password"
          placeholder="비밀번호는 8~20자 입니다."
          errorText="비밀번호는 8자 이상 20자이하로 입력해주세요"
          validators={[VALIDATOR_MAXLENGTH(20), VALIDATOR_MINLENGTH(8)]}
          inputHandler={inputHandler}
        />
        {!loginMode && (
          <Input
            id="nickname"
            label="NICKNAME"
            element="input"
            type="text"
            placeholder="닉네임을 설정해주세요"
            errorText="닉네임은 2글자 이상이어야 합니다."
            validators={[VALIDATOR_MINLENGTH(2)]}
            inputHandler={inputHandler}
          />
        )}
        {!loginMode && <ImageUpload id="image" inputHandler={inputHandler} />}
        <Button disabled={!formState.isFormValid} large defaultColor>
          {loginMode ? '로그인' : '회원가입'}{loading && <LoadingSpinner />}
        </Button>
      </form>
      <div>
        <Userlist userData={userData} />
      </div>
    </div>
  );
}

export default App;
