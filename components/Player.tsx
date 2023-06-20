"use client"



import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";

import PlayerContent from "./PlayerContent";

const Player = () => {

    // we are using hooks while having a client component. 
    // we can fetch from client component by doing it thru supabase. This makes it more versatile. 
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
        // this gets our song from our hook if there is a song. 


  const songUrl = useLoadSongUrl(song!);
        // gets our song from reading the song path. Do this by another hook for url.
// the exclmaation point makes it work for undefined possibilities. 


  if (!song || !songUrl || !player.activeId) {
    return null;
  }
//   dont load player if these are not loaded. 

  return (
    <div 
      className="
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        h-[80px] 
        px-4
      "
    >
        {/* need another hook to use this.  */}
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
{/* this is given to make it look nice. */}
{/* the key is important,not even in array. whenever key changes, it destroys element. 
It basically destroys and loads next song cuz of key. Since we dont have dynamic rendering for this.  */}
    </div>
  );
}
export default Player;