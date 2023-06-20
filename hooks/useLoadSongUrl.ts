import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();

// get the information from supabase client. simple.

// this is so anyone can see it, session for only authenticated. 

  if (!song) {
    return '';
  }

  const { data: songData } = supabaseClient
  .storage
  .from('songs')
  .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSongUrl;