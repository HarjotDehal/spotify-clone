"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helpers";

const AccountContent = () => {


// lets us subscribe, 
    const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');

    //   restrict this so its only there for authenticated users. 
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {


    // this brings us back to the portal where user can get stripe stuff basically. 
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link'
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };

  return ( 
    <div className="mb-7 px-6">

        {/* this checks if there is a subcription. */}


        {/* it gives u a subscribe button.  */}
      {!subscription && (
        <div className="flex flex-col gap-y-4">
        <p>You have no active plan.</p>
        <Button 
          onClick={subscribeModal.onOpen}
          className="w-[300px]"
        >

            {/* can change this later if i want */}
          Subscribe
        </Button>
      </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4 text-xl">
          <p>You are currently on the 
            <b> {subscription?.prices?.products?.name} </b> 
            plan.

            {/* tells us the plan that we are on.  */}


            {/* can definitely change this stuff later if i want.  */}
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
}
 
export default AccountContent;