"use client"

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database } from "@/types_db";

interface SupabaseProviderProps {
  children: React.ReactNode;
};

// has all the children and their properties

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children
}) => {
    const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );

//   this creates a component of our database and connects it to the rest of our application

  return ( 
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}
 
export default SupabaseProvider;