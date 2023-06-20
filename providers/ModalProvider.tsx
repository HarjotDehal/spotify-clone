"use client";

import AuthModal from "@/components/AuthModal";
// import Modal from "@/components/Modal";
import { useEffect, useState } from "react";




// import AuthModal from "@/components/AuthModal";
import SubscribeModal from "@/components/SubscribeModal";
import UploadModal from "@/components/UploadModal";
// import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider
: React.FC<ModalProviderProps> 

= ({
  products
}) => {
  const [isMounted, setIsMounted] = useState(false);



  useEffect(() => {

// this will never render if we are in server side rendering. If it loads then we are in client and we can show it with true. 

    setIsMounted(true);
  }, []);

//   no value here makes it at start

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* <AuthModal />
      <SubscribeModal products={products} />
      <UploadModal /> */}


      {/* <Modal title="Test Modal" description="Test description" isOpen onChange={() =>{}}>Test Children</Modal> */}
<AuthModal/>

<UploadModal/>
<SubscribeModal products={products}/>
      {/* this shows stuff */}
    </>
  );
}

export default ModalProvider;