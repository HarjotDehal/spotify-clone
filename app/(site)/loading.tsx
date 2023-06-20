"use client";

import { BounceLoader } from "react-spinners";

import Box from "@/components/Box";

const Loading = () => {
  return ( 
    <Box className="h-full flex items-center justify-center">

    {/* this is our loading symbol. It just spins while we load.  */}

      <BounceLoader color="#22c55e" size={40} />
    </Box>
  );
}
 
export default Loading;