import React, { useState } from 'react';
import Input from './shared/UI/formEl/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from './util/validator';

function App() {
  const [loginMode, setLoginMode] = useState(false);
  return (
    <div className="w-full mx-auto my-0">
      <h2 className="text-center p-4">{loginMode ? '로그인' : '회원가입'}</h2>
      <form className="flex flex-col justify-center items-center gap-1">
        <Input
          id="email"
          label="EMAIL"
          element="input"
          type="email"
          placeholder="이메일을 입력해주세요"
          errorText="이메일 형식이 올바르지 않습니다."
          validators={[VALIDATOR_EMAIL(), VALIDATOR_MINLENGTH(8)]}
        />
        <Input
          id="password"
          label="PASSWORD"
          element="input"
          type="password"
          placeholder="비밀번호는 8~20자 입니다."
          errorText="비밀번호는 8자 이상 20자이하로 입력해주세요"
          validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(20)]}
        />
        <Input
          id="nickname"
          label="NICKNAME"
          element="input"
          type="text"
          placeholder="닉네임을 설정해주세요"
          errorText='닉네임은 2글자 이상이어야 합니다.'
          validators={[VALIDATOR_REQUIRE()]}
        />
      </form>
    </div>
  );
}

export default App;
