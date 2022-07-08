import React from 'react';
import { ButtonTypes } from '../../enum';

interface ChildProps {
  href?: string
  children?:React.ReactNode
  large?: boolean
  small?: boolean
  danger?: boolean
  inverse?: boolean
  defaultColor?: boolean
  to?:string
  disabled?:boolean
  type?: ButtonTypes
  defaultSize?: string
  toggleSignInAndSignUp?:any
  
}


const Button = ({toggleSignInAndSignUp,defaultSize,type,disabled,to,href,children,large,small,danger,inverse,defaultColor}:ChildProps) => {

  if(href) {
    return (
      <a
      className={`
      disabled:opacity-60
      disabled: bg-slate-200
      ${large ? 'w-80': null}
      ${small && 'w-5'}
      ${danger && ''}
      ${inverse && ''}
      ${defaultColor && ''}
      
      `}
      href={href}>{children}</a>
    )
  }
  if(to) {
   // router 설치후 Link를 사용할 때 작성. 
  }
  return (
    <button
      className={`
      cursor-pointer inline-block py-2 px-6 border rounded-md m-2 disabled:opacity-75
      disabled: bg-slate-200 disabled:hover:bg-slate-200 disabled:hover:text-slate-900
      ${large ? 'w-64' : ''}
      ${small ? 'w-28 h-10 text-xs break-normal' : ''}
      ${danger ? 'bg-red-600 text-white' : ''}
      ${inverse ? 'text-emphasis bg-white' : ''}
      ${defaultColor ? 'hover:text-white hover:bg-slate-500' : ''}
      ${defaultSize ? '' : ''}
      `}
      type={type}
      disabled={disabled}
      onClick={toggleSignInAndSignUp}
    >
      {children}
    </button>
  );
};

export default Button;