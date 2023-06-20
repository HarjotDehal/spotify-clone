import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";




const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

//   same as getting a normal song but just have to check if user liked. 

// we need to fetch that entire song which we do with '*, songs(*)')

// the user id makes sure its only for currently logged in user. 
// dont really need to error check 

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase 
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false })

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs
  }))
// we arent spreading an array, we are spreading the relation of our songs. 

};

export default getLikedSongs;