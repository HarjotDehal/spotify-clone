import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";


// our Button

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
// forward ref takes a componenet as a argument and returns a new component that passes the reference to the original component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = 'button',
  ...props
}, ref) => {

    // we extract these values from our button elements. The ref is our return statement. We forward all the ref instead of having to write more. Just extend button attribute. 

// Creates a button with a lot of options. Interesting

// basically whatever react gives us, or the part in our code. we then give back accordingly

  return (
    <button
      type={type}
    //   green sign up button can change later.
      className={twMerge(
        `
        w-full 
        rounded-full 
        bg-green-500
        border
        border-transparent
        px-3 
        py-3 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        text-black
        font-bold
        hover:opacity-75
        transition
      `,
        disabled && 'opacity-75 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

// 

export default Button;