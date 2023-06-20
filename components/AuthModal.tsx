"use client";





import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';



import { 
  useSessionContext, 
  useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useAuthModal from "@/hooks/useAuthModal";

import Modal from './Modal';

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  
//   need all this stuff to keep track
  
  const { onClose, isOpen } = useAuthModal();
  



  const supabaseClient = useSupabaseClient();
// from our react nice, 
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

//   this closes our little pop up when we want to. 

// if there is a sesson then refresh, then close. we basically go to a new good page. 

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }
    // takes a boolean to have it open
// 
  return (
    <Modal 
      title="Welcome back" 
      description="Login to your account. Demo Email-Address:harjotdehal@hotmail.com Password:password123 Create new account to view swipe integration or click on top right to go to our account page" 
      isOpen={isOpen}
      onChange={onChange} 
    >
        {/* create way to open modal from header component */}

      <Auth
        // theme='dark'
    //   this is for our auth form. The theme gives it a cool layout. We only have github enabled but we could have more if we want. More if we want
        supabaseClient={supabaseClient}
        providers={['github']}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
// we also have forget password functionality as its built in. Very nice from supabase
            //   these are colors which we can change too
            }
          }
        }}
        theme="dark"
      />
    </Modal>
  );
}

export default AuthModal;