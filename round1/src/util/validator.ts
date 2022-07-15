
// 오타 방지용. Typescript를 통해 Enum으로 만들어줘도 무관.
const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH'
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH'
const VALIDATOR_TYPE_MIN = 'MIN'
const VALIDATOR_TYPE_MAX = 'MAX'
const VALIDATOR_TYPE_EMAIL = 'EMAIL'


// 검증할 목적이 다른 각각의 Validator.
export const VALIDATOR_REQUIRE = () => ({type: VALIDATOR_TYPE_REQUIRE})
export const VALIDATOR_MINLENGTH = (value:number) => ({type: VALIDATOR_TYPE_MINLENGTH,value:value})
export const VALIDATOR_MAXLENGTH = (value:number) => ({type: VALIDATOR_TYPE_MAXLENGTH,value:value})
export const VALIDATOR_MIN = (value:number) => ({type: VALIDATOR_TYPE_MIN,value:value})
export const VALIDATOR_MAX = (value:number) => ({type: VALIDATOR_TYPE_MAX,value:value})
export const VALIDATOR_EMAIL = () => ({type: VALIDATOR_TYPE_EMAIL})


// ValidatorTypes는 위 Validator의 type이다.
// value property는 optional하다.
export interface ValidatorTypes {
  type: string;
  value?: string | number
}


// validate 함수들을 배열로 받아 여러 검증을 진행하게 만들어주는 validate 함수.
export const validate = (value:string, validators:ValidatorTypes[]) => {
  // isValid는 최종 반환값이다. 먼저 true로 설정
  let isValid = true;

  // for ... of 문을 통해 배열로 받은 각각의 Validator를 실행한다.
  for (let validator of validators) {
    if(validator.type === VALIDATOR_TYPE_REQUIRE){
      isValid = isValid && value.trim().length > 0;
    }
    if(validator.type === VALIDATOR_TYPE_MINLENGTH && validator.value){
      isValid = isValid && value.trim().length > validator.value
    }
    if(validator.type === VALIDATOR_TYPE_MAXLENGTH && validator.value){
      isValid = isValid && value.trim().length < validator.value
    }
    if(validator.type === VALIDATOR_TYPE_MIN && validator.value){
      isValid = isValid && +value >= validator.value
    }
    if(validator.type === VALIDATOR_TYPE_MAX && validator.value){
      isValid = isValid && +value <= validator.value
    }
    if(validator.type === VALIDATOR_TYPE_EMAIL){
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }

    // 최종값 반환. 배열로 받은 여러 validator 중 하나라도 false라면 isValid는 false를 반환한다..
    return isValid
  }
}