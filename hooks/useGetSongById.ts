import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);

// loading false

  const [song, setSong] = useState<Song | undefined>(undefined);
  
//   set our song, undefined if nothing currently. its for our bottom player. 
  
  const { supabaseClient } = useSessionContext();



  useEffect(() => {
    if (!id) {
      return;
    }
    // if no id then do nothing further. 
    // we reload, do our effect whenever our song or our loading changes. 

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      
      setSong(data as Song);
      setIsLoading(false);
    }

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    song
  }), [isLoading, song]);
// automatically return the loading and song. 

};

export default useSongById;