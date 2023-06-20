import { forwardRef } from "react";
import { twMerge } from "tailwind-merge"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

        //  we basically add properties on top of original html input element. it just adds more properties. 


const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  type,
  disabled,
  ...props
}, ref) => {
  return (


    // input just has nice style. 
    <input
      type={type}

    //   I can change this later if i want. Just the styles for adding a song
      className={twMerge(
        `
        flex 
        w-full 
        rounded-md 
        bg-neutral-700
        border
        border-transparent
        px-3 
        py-3 
        text-sm 
        file:border-0 
        file:bg-transparent 
        file:text-sm 
        file:font-medium 
        file:cursor-pointer
        placeholder:text-neutral-400 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        focus:outline-none
      `,
        disabled && 'opacity-75',
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    />

    // classname allows us to always modify the input if we want to. Can start adding other fields if i want. 
  )
});

Input.displayName = "Input";

export default Input