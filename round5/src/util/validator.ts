const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH'
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH'
const VALIDATOR_TYPE_MIN = 'MIN'
const VALIDATOR_TYPE_MAX = 'MAX'
const VALIDATOR_TYPE_EMAIL = 'EMAIL'


export const VALIDATOR_REQUIRE = () => ({type: VALIDATOR_TYPE_REQUIRE})
export const VALIDATOR_MINLENGTH = (value:number) => ({type: VALIDATOR_TYPE_MINLENGTH,value:value})
export const VALIDATOR_MAXLENGTH = (value:number) => ({type: VALIDATOR_TYPE_MAXLENGTH,value:value})
export const VALIDATOR_MIN = (value:number) => ({type: VALIDATOR_TYPE_MIN,value:value})
export const VALIDATOR_MAX = (value:number) => ({type: VALIDATOR_TYPE_MAX,value:value})
export const VALIDATOR_EMAIL = () => ({type: VALIDATOR_TYPE_EMAIL})

export interface ValidatorTypes {
  type: string;
  value?: string | number
}


export const validate = (value:string, validators:ValidatorTypes[]) => {
  let isValid = true;
  for (let validator of validators) {
    if(validator.type === VALIDATOR_TYPE_REQUIRE){
      isValid = isValid && value.trim().length > 0;
    }
    if(validator.type === VALIDATOR_TYPE_MINLENGTH && validator.value){
      isValid = isValid && value.trim().length >= validator.value
    }
    if(validator.type === VALIDATOR_TYPE_MAXLENGTH && validator.value){
      isValid = isValid && value.trim().length <= validator.value
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
  }
  return isValid
}