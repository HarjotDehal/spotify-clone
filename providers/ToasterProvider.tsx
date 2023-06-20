"use client";

import { Toaster } from "react-hot-toast";



// basically just makes it look how we want to. Mostly done already

const ToasterProvider = () => {
  return ( 

    // change style later for fun
    <Toaster 
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        }
      }}
    /> 
  );
}
 
export default ToasterProvider;