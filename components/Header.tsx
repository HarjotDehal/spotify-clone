
"use client"
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
  }

  const Header: React.FC<HeaderProps> = ({
    children,
    className,
  }) => {


    const authModal = useAuthModal();
// this opens the same modal for login/sign up
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const player = usePlayer();

    // this is our useuser from hooks. we extract our user and later subscription
    const router = useRouter();
// need it to act different when logged in or out

    const handleLogout = async() =>{
        // lets us logout in future


        const { error } = await supabaseClient.auth.signOut();
        player.reset();
// when logged out it gets rid of player

// make account screen so user can delete subscription
        // reset any songs which are playing. it shuts it down
        router.refresh();
    
        if (error) {
          toast.error(error.message);
        }
        else{
          toast.success("Logged out!")
        }
        // nice toast


    }


    return ( 


        <div
      className={twMerge(`
        h-fit 
        bg-gradient-to-b 
        from-emerald-800 
        p-6
        `,
        className
      )}>
                {/* this puts the top green bar type thing on main side */}



      <div className="w-full mb-4 flex items-center justify-between">
      
      
        <div className="hidden md:flex gap-x-2 items-center">

                    {/*  */}

          <button 
            onClick={() => router.back()} 
            className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            {/* howver lets it change opacity */}
            <RxCaretLeft className="text-white" size={35} />

{/* back arrow essentially */}

          </button>
          <button 
            onClick={() => router.forward()} 
            className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >



            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">

            {/* this is for mobile view. only visible there */}
          <button 
            onClick={() => router.push('/')} 
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >

            {/* dont have the arrows on mobile.  */}
            <HiHome className="text-black" size={20} />
          </button>
          <button 
            onClick={() => router.push('/search')} 
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >

            {/* nice home button, has white background with black icon. I can change these later for sure. Easily */}
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">

          {/* this lets us check if its logged in or not.  */}
          {user ? (
            <div className="flex gap-x-4 items-center">
                  {/* logout if we log out */}
              <Button 
                onClick={handleLogout} 
                className="bg-white px-6 py-2"
              >
                Logout
              </Button>
              <Button 
                onClick={() => router.push('/account')} 

                // this doesnt work atm cuz we didnt create it. but it goes to our profile

                // logout goes back to our sing up/login
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (


            //  this is for when we are logged in or not 

            // it basically only shows a logout if we are signed in
            <>
              <div>
                <Button 
                // new button
                  onClick={authModal.onOpen} 
                  className="
                    bg-transparent 
                    text-neutral-300 
                    font-medium
                  "
                >

                    {/* lets us login */}
                  Sign up
                </Button>
              </div>
              <div>
                <Button 
                  onClick={authModal.onOpen} 
                  className="bg-white px-6 py-2"
                >
                  {/* the buttons now open our authentication easily */}

                    {/* this has a different classname and look. Can change it later so they are same but still looks fine.  */}
                  Log in
                </Button>
              </div>
            </>
          )}
          {/* )} */}
        </div>
      </div>

      {/* we have children here which are our songs. Nice */}
      {children}
    </div>
  );
}

export default Header;