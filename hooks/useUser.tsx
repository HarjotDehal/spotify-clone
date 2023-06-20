




// this is a hook to get a user from our database. 




import { useEffect, useState, createContext, useContext } from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User
} from '@supabase/auth-helpers-react';

import { UserDetails, Subscription } from '@/types';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};



export const UserContext = createContext<UserContextType | undefined>(
    undefined
    // it is undefined by default
);

export interface Props {
    [propName: string]: any;
  }
//   any props use name
  
  export const MyUserContextProvider = (props: Props) => {
   
   
    const {

        // since our supabase is already wrapped in our home file, we can use it now
      session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
        } = useSessionContext();

        // get user from supabase as long as its data details and subcription
        const user = useSupaUser();

        // we rename cuz we already have a useUser, it will mess up hooks
        const accessToken = session?.access_token ?? null;
        const [isLoadingData, setIsloadingData] = useState(false);
        const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
        const [subscription, setSubscription] = useState<Subscription | null>(null);
    // has default values of null, it holds the values when we give it
        const getUserDetails = () => supabase.from('users').select('*').single();

        // this goes to our users table, selects all the rows then picks one value. 

        // makes sense. This is sql code. * picks all from a row then it goes into deeper filtering. 
        const getSubscription = () =>
        supabase
            .from('subscriptions')
            .select('*, prices(*, products(*))')
            .in('status', ['trialing', 'active'])
            .single();
    
        useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsloadingData(true);

            // basically checks if its loading or not
            Promise.allSettled([getUserDetails(), getSubscription()]).then(
            (results) => {
                const userDetailsPromise = results[0];
                const subscriptionPromise = results[1];
    
                                        // since we get 2 values, we only have 2 things in array. Those items in allsettled get put into results. 

                if (userDetailsPromise.status === 'fulfilled')
                setUserDetails(userDetailsPromise.value.data as UserDetails);

                // if valid userdetails and returned then we set it as so. Same below
    
                if (subscriptionPromise.status === 'fulfilled')
                setSubscription(subscriptionPromise.value.data as Subscription);
    
                setIsloadingData(false);
            }
            );
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
            setSubscription(null);


            // if no user and not loading or data. then we set them to null and return and load page
        }
        }, [user, isLoadingUser]);
    
        const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
        };
                // value has all our important information essentially. it has props which we give below back to our usercontext

    
        return <UserContext.Provider value={value} {...props} />;

        
    };
    


    // this is our hook user. We use the above helper functions to do this. 

    // given context we use our context. If we try to use the hook outside our context then error.
    export const useUser = () => {
        const context = useContext(UserContext);
        if (context === undefined) {
        throw new Error(`useUser must be used within a MyUserContextProvider.`);
        }
        return context;
    };
