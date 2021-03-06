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
      // ????????????????????????
      setForm(
        {
          ...formState.inputs,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      // ????????? ????????????
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
      <h2 className="text-center p-4">{loginMode ? '?????????' : '????????????'}</h2>
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
          {loginMode ? '????????????' : '?????????'}?????? ??????
        </Button>
        <Input
          id="email"
          label="EMAIL"
          element="input"
          type="text"
          placeholder="???????????? ??????????????????"
          errorText="????????? ????????? ???????????? ????????????."
          validators={[VALIDATOR_EMAIL(), VALIDATOR_MINLENGTH(8)]}
          inputHandler={inputHandler}
        />
        <Input
          id="password"
          label="PASSWORD"
          element="input"
          type="password"
          placeholder="??????????????? 8~20??? ?????????."
          errorText="??????????????? 8??? ?????? 20???????????? ??????????????????"
          validators={[VALIDATOR_MAXLENGTH(20), VALIDATOR_MINLENGTH(8)]}
          inputHandler={inputHandler}
        />
        {!loginMode && (
          <Input
            id="nickname"
            label="NICKNAME"
            element="input"
            type="text"
            placeholder="???????????? ??????????????????"
            errorText="???????????? 2?????? ??????????????? ?????????."
            validators={[VALIDATOR_MINLENGTH(2)]}
            inputHandler={inputHandler}
          />
        )}
        {!loginMode && <ImageUpload id="image" inputHandler={inputHandler} />}
        <Button disabled={!formState.isFormValid} large defaultColor>
          {loginMode ? '?????????' : '????????????'}{loading && <LoadingSpinner />}
        </Button>
      </form>
      <div>
        <Userlist userData={userData} />
      </div>
    </div>
  );
}

export default App;
