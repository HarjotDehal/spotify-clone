import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

// tw merge allows us to do more things, 

// this lets us put stuff in multiple lines, backticks

const Box: React.FC<BoxProps> = ({ 
  children,
  className
 }) => {
  return ( 
    <div 
      className={twMerge(
        `
        bg-neutral-900 
        rounded-lg 
        h-fit 
        w-full
        `, 
        className
      )}>
      {children}
    </div>
  );
}
 
export default Box;