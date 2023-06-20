
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import { toast } from "react-hot-toast";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
};

const LikedContent: React.FC<LikedContentProps> = ({
  songs
}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const onPlay = useOnPlay(songs);


// this useeffect redirects from this website if we arent logged in. It will bring us back to the main page. Only authenticated users can go to liked page. 
  useEffect(() => {
    if (!isLoading && !user) {

        // Maybe change this later
    toast.error("Please Login");
      router.replace('/');
    }
  }, [isLoading, user, router]);




  if (songs.length === 0) {

    // can do this before our main return. Just do this and leave the page. COOL
    return (
      <div 
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
      >
        No favorited songs. Favorite a song by tapping a song's heart on the search page or while a song is playing
      </div>

    //   only if no liked songs, then this wont work. Can change this tyle later but doesnt mattere
    // TODO
    )
  }
  return ( 



    // if there is content then do this
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song: any) => (
        <div 
          key={song.id} 
          className="flex items-center gap-x-4 w-full"
        >

            {/* adds our liked songs and gives ability to like if we want. */}

            {/* can change styles later, this shows list of songs */}

            
          <div className="flex-1">
            <MediaItem 
            onClick={(id) => onPlay(id)}
             data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}
 
export default LikedContent;