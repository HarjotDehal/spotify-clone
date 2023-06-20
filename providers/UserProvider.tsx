"use client"

import { MyUserContextProvider } from "@/hooks/useUser";



interface UserProviderProps{
    children : React.ReactNode;
};

// uses the hook, this is basically a middle man file


const UserProvider: React.FC<UserProviderProps> = ({
    children
  }) => {
    return ( 
      <MyUserContextProvider>
        {children}
      </MyUserContextProvider>
     );
  }
   
  export default UserProvider;