import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";




const useLoadImage = (song: Song) => {

    // get a song, and make sure it has properties from where we defined the interface
  const supabaseClient = useSupabaseClient();
  
  if (!song) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;